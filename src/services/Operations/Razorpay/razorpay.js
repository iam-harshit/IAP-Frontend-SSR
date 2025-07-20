import { toast } from 'react-hot-toast';
import { apiConnector } from '../../ApiConnector';
import { availabilitySlotsEndPoints } from '../../BackendApis';
import iapLogo from '@/assets/inspiration_logo.png';
import { createOrder, verifyPaymentAndBookSlot } from '../PaymentOperation/PaymentApi';

const razorPayKey = import.meta.env.VITE_RAZORPAY_KEY;

const { BOOK_SLOTS, VERIFY_PAYMENT } = availabilitySlotsEndPoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}



const verifyPayment = async (response, formData, mentorName, navigate) => {
  const verifyRes = await fetch(`${VERIFY_PAYMENT}/${mentorName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      sessionDate: formData.sessionDate,
      sessionTime: formData.sessionTime,
    }),
    credentials: 'include',
  });

  const verifyData = await verifyRes.json();
  //   console.log("Res",verifyData);
  if (verifyData.success) {
    toast.success('Payment Verified Successfully!');
    navigate('/dashboard/manage-events');
  } else {
    toast.error('Payment Verification Failed!');
    throw Error;
  }
};

export async function createOrderAndBookSlot(slotId) {
  const toastId = toast.loading('Loading...');
  try {
    // Load the Razorpay script
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    if (!res) {
      toast.error('RazorPay SDK failed to load');
      return;
    }
    const response = await createOrder(slotId);
    if( !response?.data?.success ) {
      toast.error('Failed to create order');
      toast.dismiss(toastId);
      return;
    }

    toast.dismiss(toastId);

    const createPayment = new window.Razorpay({
      key: razorPayKey,
      order_id: response.data.data.id,
      ...response.data.data,
      handler : async (response) => {
        try {
          const reqOption = {
            paymentId : response.razorpay_payment_id,
            orderId : response.razorpay_order_id,
            signature : response.razorpay_signature,
            slotId : slotId
          };

          const res = await verifyPaymentAndBookSlot(
            reqOption.paymentId,
            reqOption.orderId,
            reqOption.signature,
            reqOption.slotId
          );
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          toast.success('Payment Verified');
        } catch (error) {
          toast.error(`Payment verification failed. Please try again. ${error.message}`);
        }
      }
    });
    createPayment.open();
  } catch (error) {
    console.error('Error creating order:', error);
    toast.error(`Failed to create order ${error}`);
  } finally {
    // toast.dismiss(toastId);
  }
}

export async function bookSlot(mentorName, formData, navigate) {
  const toastId = toast.loading('Loading...');

  try {
    //load the script    
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    // console.log("RAZORPAY SCRIPT RES.", res);
    if (!res) {
      toast.error('RazorPay SDK failed to load');
      return;
    }
    //initiate the order
    const orderResponse = await apiConnector(
      'POST',
      `${BOOK_SLOTS}/${mentorName}`,
      formData,
      {
        'Content-Type': 'application/json',
      },
      null,
      true
    );
    // console.log("--------ORDER RESPONSE--------");
    // console.log("4",orderResponse);
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    // console.log("PRINTING ORDER RESPONSE", orderResponse);

    //Create Options Object
    const options = {
      key: razorPayKey,
      currency: orderResponse.data.bookedSession.currency,
      amount: `${orderResponse.data.bookedSession.amount}`,
      order_id: orderResponse.data.bookedSession.order_id,
      name: 'Inspiration App',
      description: 'Thank You for Booking slot',
      image: iapLogo,
      // TODO: Needs To Be Reviewed
      prefill: {
        name: `Curious Learner`,
        email: 'curiousdevelopers.in@gmail.com',
      },

      methods: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
        emi: true,
      },
      handler: async function (response) {
        try {
          await verifyPayment(response, formData, mentorName, navigate);
        } catch (error) {
          toast.error('Payment verification failed. Please try again.');
        }
      },
    };
    //OPEN PAYMENT WINDOW
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on('payment.failed', async function (response) {
      await fetch(`/api/v1/session/cancelPayment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: response.error.metadata.order_id,
        }),
        credentials: 'include',
      });

      toast.error('Oops, Payment Failed.');
      // console.log("5",response.error);
      navigate('/dashboard/manage-events');
    });
  } catch (error) {
    // console.log("PAYMENT API ERROR.....", error);
    toast.error('Could not make Payment');
  }
  toast.dismiss(toastId);
}
