import toast from 'react-hot-toast';
import { apiConnector } from '../../ApiConnector';
import { availabilitySlotsEndPoints } from '../../BackendApis';
import { pricingEndPoints } from '../../BackendApis';

const {
  CREATE_SLOTS,
  GET_SLOTS,
  TOGGLE_VISIBILITY,
  BOOK_SLOTS,
  GET_SLOTS_COUNT,
  GET_ALL_SLOTS,
  SUBMIT_SLOT_REQUEST,
} = availabilitySlotsEndPoints;
const { PRICE } = pricingEndPoints;

export const handleCreateSlots = async (formData) => {
  try {
    const data = await apiConnector(
      'POST',
      CREATE_SLOTS,
      formData,
      {
        'Content-Type': 'application/json',
      },
      null,
      true
    );
    // console.log('📌/CREATE SLOTS API RESPONSE:', data?.data)
    toast.dismiss();
    toast.success(data?.data?.message || 'Slot added successfully');
  } catch (error) {
    toast.dismiss();
    toast.error('Could not add slot');
  }
};

export const handleShowOnProfileToggleChange = async (formData, prev) => {
  try {
    const data = await apiConnector(
      'POST',
      TOGGLE_VISIBILITY,
      formData,
      {
        'Content-Type': 'application/json',
      },
      null,
      true
    );
    // console.log('📌TOGGLE SHOW ON PROFILE API RESPONSE:', data?.data)
    // console.log(formData["showOnProfile"]);

    toast.success(
      `Slots visibility ${formData['showOnProfile'] ? 'turned on' : 'turned off'}`
    );
  } catch (error) {
    toast.dismiss();
    toast.error('Show on profile toggle failed');
  }
};

export const handleFetchSlots = async (username) => {
  try {
    const data = await apiConnector(
      'GET',
      `${GET_SLOTS}/${username}`,
      null,
      null,
      null,
      true
    );
    // console.log('📌GET SLOTS API RESPONSE:', data?.data)
    return data?.data;
  } catch (error) {
    toast.dismiss();
    toast.error('Slots fetching failed');
    // console.log(error);
  }
};

export const handleBookSlots = async (username, formData) => {
  try {
    const data = await apiConnector(
      'POST',
      `${BOOK_SLOTS}/${username}`,
      formData,
      {
        'Content-Type': 'application/json',
      },
      null,
      true
    );

    // console.log('BOOK SLOTS API RESPONSE:', data)
  } catch (error) {
    toast.dismiss();
    toast.error('Failed to book session.');
    // console.log('Error booking session:', error);
  }
};

export const sendPricingData = async (formData) => {
  try {
    const response = await apiConnector(
      'POST',
      PRICE,
      formData,
      {
        'Content-Type': 'application/json',
      },
      null,
      true
    );

    // console.log('📌 PRICING API RESPONSE:', response);
    toast.success('Pricing updated successfully');
  } catch (error) {
    console.error('Error updating pricing:', error);
    toast.dismiss();
    toast.error('Could not update pricing');
  }
};

export const fetchPricingData = async (username) => {
  try {
    const response = await apiConnector(
      'GET',
      `${PRICE}/${username}`,
      null,
      null,
      null,
      true
    );
    // console.log("📌 FETCHED PRICING DATA:", response);
    return response.data;
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    toast.dismiss();
    toast.error('Could not fetch pricing data');
    return null;
  }
};

export const handleSubmitSlotRequest = async (requestData) => {
  try {
    const response = await apiConnector(
      'POST',
      SUBMIT_SLOT_REQUEST,
      requestData,
      {
        'Content-Type': 'application/json',
      },
      null,
      true
    );

    return response;
  } catch (error) {
    console.error('Error submitting slot request:', error);

    return null;
  }
};

export const fetchSlotsCount = async (username) => {
  try {
    const response = await apiConnector(
      'GET',
      `${GET_SLOTS_COUNT}?username=${encodeURIComponent(username)}`,
      null,
      null,
      null,
      true
    );
    return response?.data;
  } catch (error) {
    console.error('Error fetching slot count:', error);
    toast.dismiss();
    toast.error('Could not fetch slot count');
    return null;
  }
};

export const fetchAllSlots = async (username, date) => {
  try {
    const response = await apiConnector(
      'GET',
      `${GET_ALL_SLOTS}?username=${encodeURIComponent(username)}&date=${encodeURIComponent(date)}`,
      null,
      null,
      null,
      true
    );
    return response?.data;
  } catch (error) {
    console.error('Error fetching all slots:', error);
    toast.dismiss();
    toast.error('Could not fetch all slots');
    return null;
  }
};
