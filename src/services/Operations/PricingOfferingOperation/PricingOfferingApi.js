import { apiConnector } from '../../ApiConnector';
import { bankDetailsEndPoints } from '../../BackendApis';

const { ADD_BANK_DETAILS, GET_BANK_DETAILS, UPDATE_BANK_DETAILS } =
  bankDetailsEndPoints;

export const handleAddBankDetails = async (formData) => {
  try {
    const response = await apiConnector(
      'POST',
      ADD_BANK_DETAILS,
      formData,
      null,
      null,
      true
    );
    // console.log('📌ADD BANK DETAILS API RESPONSE:', response);
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};
export const handleGetBankDetails = async () => {
  try {
    const response = await apiConnector(
      'GET',
      GET_BANK_DETAILS,
      null,
      null,
      null,
      true
    );
    // console.log('📌GET BANK DETAILS API RESPONSE:', response);
    return response.data.data;
  } catch (error) {
    // console.log(error);
  }
};
export const handleUpdateBankDetails = async (formData) => {
  try {
    const response = await apiConnector(
      'PUT',
      UPDATE_BANK_DETAILS,
      formData,
      null,
      null,
      true
    );
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
