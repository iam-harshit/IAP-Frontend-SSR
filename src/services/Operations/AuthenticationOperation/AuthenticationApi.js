import { apiConnector } from '@/services/ApiConnector';
import { logoutUser, signInSuccess } from '@/Reducers/userSlice';
import { authEndpoints } from '@/services/BackendApis';
import toast from 'react-hot-toast';

const {
  SIGNUP_INTENT_API,
  LOGOUT_API,
  SIGNUP_API,
  SIGNIN_API,
  SEND_OTP_API,
  VERIFY_OTP_API,
  SEND_RESET_OTP_API,
  VERIFY_RESET_OTP_API,
  RESET_PASSWORD_API,
  GOOGLE_CALLBACK_API,
} = authEndpoints;

// LOGOUT API OPERATIONS
export const handleLogoutApi = async (dispatch) => {
  try {
    const response = await apiConnector(
      'POST',
      `${LOGOUT_API}?${Date.now()}`,
      null,
      null,
      null,
      true
    );
     console.log('LOGOUT RESPONSE:', response)
    if (response.status !== 200) {
      console.log("hello inside error")
      throw new Error(`Logout failed with status: ${response.status}`);
    }
    // console.log('LOGOUT RESPONSE:', response)
    if (response.statusText && response.statusText === 'OK') {
      console.log("inside  sucess")
      dispatch(logoutUser());
 
   
      dispatch(signInSuccess(null));
    
      toast.success('Logged out successfully');
    }
  } catch (error) {
    console.error('Failed to log out:', error);
    // Client-side logout fallback
    dispatch(logoutUser());
  
   
    dispatch(signInSuccess(null));
  
  }
};
// LOGIN API OPERATIONS
export const handleLoginApi = async (formData) => {
  try {
    const response = await apiConnector(
      'POST',
      SIGNIN_API,
      formData,
      { 'Content-Type': 'application/json' },
      null,
      true
    );

    // console.log('📌SIGNIN API RESPONSE:', response)
    // console.log('📌SIGNIN API RESPONSE:', response?.data?.data?.users)

    return response;
  } catch (error) {
    toast.dismiss();
    // console.log("error is: ",error)
    return error?.response;
  }
};
// SIGNUP API OPERATIONS
export const handleSignupApi = async (formData) => {
  try {
    const data = await apiConnector(
      'POST',
      SIGNUP_API,
      formData,
      { 'Content-Type': 'application/json' },
      null,
      true
    );
    console.log('📌SIGNUP API RESPONSE:', data)

    return data;
  } catch (error) {
    // console.log(error)
    // toast.dismiss()
    // if (error.message) {
    //   toast.error(error.message)
    // } else {
    //   toast.error('Could not signup')
    // }
    return error?.response;
  }
};
// SEND OTP API OPERATIONS
export const handleSendOtpApi = async (email) => {
  try {
    const emailOTP = await apiConnector(
      'POST',
      SEND_OTP_API,
      { email },
      null,
      null,
      false
    );

    if (emailOTP.data.success) {
      toast.success(`otp sent successfully.`);
    }
  } catch (error) {
    toast.dismiss();
    toast.error(error?.response?.data?.message);
  }
};
export const handleVerifyOtpApi = async (otp, email) => {
  try {
    const response = await apiConnector(
      'POST',
      VERIFY_OTP_API,
      { otp: Number(otp), email: email },
      null,
      null,
      false
    );
    // console.log(response)
    return response;
  } catch (error) {
    toast.dismiss();
    toast.error(error?.response?.data?.message);
  }
};

// SEND RESET OTP API OPERATIONS
export const handleSendResetOtpApi = async (email) => {
  try {
    const resetOTP = await apiConnector(
      'POST',
      SEND_RESET_OTP_API,
      { email },
      null,
      null,
      false
    );
    // console.log('📌 API Response:', resetOTP)

    if (resetOTP?.data?.success) {
      toast.success(`OTP sent successfully`);
    }
    return resetOTP; // Ensure the function returns the response
  } catch (error) {
    toast.dismiss();
    toast.error(error?.response?.data?.message);
    return null; //  Return null to prevent undefined errors
  }
};

// VERIFY RESET OTP API OPERATIONS
export const handleVerifyResetOtpApi = async (otp, email) => {
  try {
    const response = await apiConnector(
      'POST',
      VERIFY_RESET_OTP_API,
      { otp: Number(otp), email: email },
      null,
      null,
      false
    );
    return response;
  } catch (error) {
    toast.dismiss();
    toast.error(error?.response?.data?.message);
  }
};

// RESET PASSWORD API OPERATIONS
export const handleResetPasswordApi = async (token, password) => {
  try {
    const response = await apiConnector(
      'PUT',
      RESET_PASSWORD_API,
      { token: token, password: password },
      null,
      null,
      false
    );
    return response;
  } catch (error) {
    toast.dismiss();
    toast.error(error?.response?.data?.message);
  }
};

// GOOGLE SIGNUP
export const handleGoogleSignUp = async (signupData) => {
  try {
    toast.loading('Signing Up...');

    const response = await apiConnector(
      'POST',
      GOOGLE_CALLBACK_API,
      signupData,
      { 'Content-Type': 'application/json' },
      null,
      true
    );

    // const data = await response.json()

    //dispatch(setToken(data.token))
    return response;
  } catch (error) {
    toast.dismiss();
    toast.error('Something went wrong');
  }
};

// SIGNUP INTENT API OPERATIONS
export const handleSignupIntentApi = async (formData) => {
  try{
    const response = await apiConnector(
      'POST',
      SIGNUP_INTENT_API,
      formData,
      { 'Content-Type': 'application/json' },
      null,
      false
    );
    // console.log('📌SIGNUP INTENT API RESPONSE:', response)
    const token = response.data.token;
    return token;
  }catch(error){
    toast.dismiss();
    toast.error(error?.response?.data?.message);
  }
}