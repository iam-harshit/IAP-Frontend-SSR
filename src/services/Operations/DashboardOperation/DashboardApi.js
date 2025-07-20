import { apiConnector } from '@/services/ApiConnector';
import toast from 'react-hot-toast';
import { dashboardEndPoints } from '@/services/BackendApis';
const { PHONE_VISIBILITY, EMAIL_VISIBILITY, NEXT_SESSION } = dashboardEndPoints;

export const handlePhoneVisibility = async () => {
  try {
    const response = await apiConnector(
      'PUT',
      PHONE_VISIBILITY,
      null,
      null,
      null,
      true
    );
    // console.log('📌PHONE SETTING RESPONSE:', response)
    return response?.data?.success;
  } catch (error) {
    // console.log('📌PHONE SETTING ERROR:', error)
  }
};
export const handleEmailVisibility = async () => {
  try {
    const response = await apiConnector(
      'PUT',
      EMAIL_VISIBILITY,
      null,
      null,
      null,
      true
    );
    // console.log('📌EMAIL SETTING RESPONSE:', response)
    return response?.data?.success;
  } catch (error) {
    toast('Oops! Something went wrong in Email setting.');
  }
};
export const handleNextSession = async (userName) => {
  try {
    const response = await apiConnector(
      'GET',
      `${NEXT_SESSION.replace(':username', userName)}`,
      null,
      null,
      null,
      true
    );
    // console.log('📌NEXT SESSION RESPONSE:', response)
    return response?.data;
  } catch (error) {
    // console.log(error.message)
    toast('Oops! Something went wrong in getting next session.');
  }
};
