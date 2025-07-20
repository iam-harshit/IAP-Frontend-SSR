import { apiConnector } from '../../ApiConnector';
import { paymentEndPoints } from '../../BackendApis';

// Function to create an order for payment
export const createOrder = async (slotId) => {
    try {
        const response = await apiConnector('POST', paymentEndPoints.CREATE_ORDER, { slotId },
            { 'Content-Type': 'application/json' }, null, true);
        // console.log(response);
        return response;
    } catch (error) {
        return error;
    }
};

// Function to verify the payment
export const verifyPaymentAndBookSlot = async (paymentId, orderId, signature, slotId) => {
  try {
      const response = await apiConnector('POST', paymentEndPoints.VERIFY_PAYMENT, 
          { paymentId, orderId, signature, slotId },
          { 'Content-Type': 'application/json' }, null, true);
      // console.log(response);
      return response;
  } catch (error) {
      return error;
  }
};


// Function to handle mentees per month
export const handleMenteesperMonth = async () => {
  try {
    const response = await apiConnector(
      'GET',
      paymentEndPoints.MENTEES_PER_MONTH,
      null,
      null,
      null,
      true
    );

    // console.log("API Response:", response); // Check the actual response
    return response;
  } catch (error) {
    console.error('API Fetch Error:', error);
    return error;
  }
};

export const handleEarningperMonth = async () => {
  try {
    const response = await apiConnector(
      'GET',
      paymentEndPoints.EARNING_PER_MONTH,
      null,
      null,
      null,
      true
    );

    // console.log("API Response:", response); // Check the actual response
    return response;
  } catch (error) {
    console.error('API Fetch Error:', error);
    return error;
  }
};

export const handleSessionsperMonth = async () => {
  try {
    const response = await apiConnector(
      'GET',
      paymentEndPoints.SESSIONS_PER_MONTH,
      null,
      null,
      null,
      true
    );

    // console.log("API Response:", response); // Check the actual response
    return response;
  } catch (error) {
    console.error('API Fetch Error:', error);
    return error;
  }
};

export const handleTotalEarning = async () => {
  try {
    const response = await apiConnector(
      'GET',
      paymentEndPoints.TOTAL_EARNING,
      null,
      null,
      null,
      true
    );

    // console.log("API Response:", response); // Check the actual response
    return response;
  } catch (error) {
    // console.error("API Fetch Error:", error);
    return error;
  }
};

export const handleTotalMenteesAttended = async () => {
  try {
    const response = await apiConnector(
      'GET',
      paymentEndPoints.TOTAL_MENTEES_ATTENDED,
      null,
      null,
      null,
      true
    );

    // console.log("API Response:", response); // Check the actual response
    return response;
  } catch (error) {
    // console.error("API Fetch Error:", error);
    return error;
  }
};

export const handlePaymentHistoryMentee = async () => {
  try {
    const response = await apiConnector(
      'GET',
      paymentEndPoints.PAYMENT_HISTORY_MENTEE,
      null,
      null,
      null,
      true
    );

    // console.log("API Response:", response); // Check the actual response
    return response;
  } catch (error) {
    // console.error("API Fetch Error:", error);
    return error;
  }
};

export const handlePaymentHistoryMentor = async () => {
  try {
    const response = await apiConnector(
      'GET',
      paymentEndPoints.PAYMENT_HISTORY_MENTOR,
      null,
      null,
      null,
      true
    );

    // console.log("API Response:", response); // Check the actual response
    return response;
  } catch (error) {
    // console.error("API Fetch Error:", error);
    return error;
  }
};
