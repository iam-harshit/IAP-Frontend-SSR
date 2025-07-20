import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { FaEye, FaSpinner } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import signupMentee from '@/assets/signupMentee.png';
import signupMentor from '@/assets/signupMentor.png';
import { useDispatch } from 'react-redux';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import {
  handleSignupApi,
  handleSendOtpApi,
  handleVerifyOtpApi,
} from '../services/Operations/AuthenticationOperation/AuthenticationApi';
import { signInSuccess } from '../Reducers/userSlice';
import OAuth from '../Components/core/OAuth';
import Otp from '../Components/pages/Forgot-Password-Page/Otp';
import { handleMyProfileApi } from '@/services/Operations/ProfileOperation/ProfilePageApi';
const Signup = ({ isMentor, category }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfrimPassword, setHideConfirmPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const formData = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      role: isMentor ? 'mentor' : 'mentee',
      phoneNumber: data.phoneNumber,
      mentorshipCategory: category,
    };

    try {
      setLoading(true);
      const loadingToast = toast.loading('Signing up...');

      const response = await handleSignupApi(formData, {
        withCredentials: true,
      });
      const status = response?.status;

      if (!response || status >= 400) throw response;

      toast.dismiss(loadingToast);
      toast.success('Signed up successfully');

      const profileRes = await handleMyProfileApi();
      const profileData = profileRes?.data.data;

      if (profileData) {
        dispatch(signInSuccess(profileData));
      }

      navigate('/dashboard');
    } catch (error) {
      toast.dismiss();

      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong during sign up';

      const errorList = error?.response?.data?.errors;
      if (Array.isArray(errorList)) {
        errorList.forEach((err) => toast.error(err.msg || 'Invalid input'));
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const sendEmailOtp = async (email) => {
    if (!email) {
      toast.error('Invalid email');
      return;
    }
    await handleSendOtpApi(email);
    setEmail(email);
    setOtpSent(true);
  };

  const verifyEmailOtp = async (otp, email) => {
    const result = await handleVerifyOtpApi(otp, email);
    // console.log(result)
    if (result.data.success) {
      setEmailVerified(true);
      toast.success('Email verified.');
    } else {
      toast.error('Incorrect OTP');
    }
  };

  // const sendPhoneOtp = (num) => {
  //   const regex = /^[6-9]\d{9}$/

  //   if (regex.test(num)) {
  //     toast.dismiss()
  //     toast.success('Otp sent on mobile number. Its 654321')
  //   } else {
  //     toast.dismiss()
  //     toast.error('Enter a valid phone number')
  //   }
  // }

  return (
    <section className="w-full h-screen flex">
      <div className="left hidden w-full md:w-1/2 h-full bg-[#eceaff] md:flex justify-center items-center">
        <div className="flex flex-col items-center">
          <img src={isMentor ? signupMentor : signupMentee} alt="" />
          <p className="text-2xl font-semibold text-center">
            Check in to the world of inspiration, <br /> to get inspired
          </p>
        </div>
      </div>

      <div className="right h-full w-full md:min-w-[500px] md:w-1/2 flex l-md:justify-center l-md:items-center">
        <div className="h-auto overflow-y-scroll w-full max-w-xl flex flex-col gap-2 p-4">
          <div className="flex flex-col gap-2 h-auto">
            <div className="flex justify-end">
              <Link
                className="text-black flex items-center text-base font-normal hover:underline hover:font-medium"
                to={'/'}
              >
                <MdKeyboardArrowLeft />
                Back to home
              </Link>
            </div>
            <div className="flex gap-2 relative">
              <span className="inline-block w-auto bg-white pr-6 text-3xl font-semibold text-[#5C3FD4]">
                Sign Up
              </span>
              <span className="h-[3px] w-[80%] bg-[#DAD2FF] z-[-1] absolute top-[50%] right-0"></span>
            </div>
            <div>
              <p className="font-[500] text-gray-400 text-lg">
                Already an user?
                <Link
                  to="/sign-in"
                  title=""
                  className="text-[#5C3FD4] hover:underline ml-2"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          <div className="flex justify-center flex-col mt-2">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative inline-flex w-auto items-center justify-center rounded-md border border-gray-400 bg-[#ffffff] px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <OAuth
                authText={'Sign-up with Google'}
                role={isMentor ? 'mentor' : 'mentee'}
                mentorshipCategory={category}
                isSignup={true}
              />
            </button>
            <div className="relative flex mt-3 w-full justify-center items-center">
              <span className="bg-white z-[1] px-2">OR</span>
              <span className="w-full bg-gray-400 h-[1px] opacity-35 absolute top-1/2 transform -translate-y-1/2"></span>
            </div>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="mb-2">
                <label className="block font-medium mb-2">Full Name</label>
                <input
                  {...register('fullName', {
                    required: 'Full Name is required',
                  })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter Full Name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label className="block font-medium mb-2">Email Address</label>
                <div className="relative w-full">
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email format',
                      },
                    })}
                    disabled={emailVerified}
                    className="w-full py-2 pl-2 border rounded pr-16 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter Email Address"
                  />
                  {!emailVerified ? (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 text-xs transform -translate-y-1/2 px-[10px] py-[3px] bg-[#ECEAFE] text-[#5C3FD4] font-semibold rounded-full"
                      onClick={() => sendEmailOtp(getValues('email'))}
                    >
                      Verify
                    </button>
                  ) : (
                    <div className="absolute right-2 top-1/2  transform -translate-y-1/2 p-1 rounded-full bg-green-500 ">
                      <TiTick />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 l-md:grid-cols-2 gap-3 mb-2">
                <div className="relative">
                  <label className="block font-medium mb-2">Phone Number</label>
                  <div className="relative w-full">
                    <input
                      {...register('phoneNumber', {
                        required: 'Phone number is required',
                        maxLength: {
                          value: 10,
                          message: 'Phone number cannot exceed 10 digits',
                        },
                      })}
                      maxLength={10}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter Phone Number"
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          e.key !== 'Backspace' &&
                          e.key !== 'Tab'
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 l-md:grid-cols-2 gap-3 mb-2">
                <div>
                  <label className="block font-medium mb-2">Password</label>
                  <div className="relative w-full">
                    <input
                      {...register('password', {
                        required: 'Password is required',
                        pattern: {
                          value:
                            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/,
                          message:
                            'Password must have at least 6 characters, one uppercase letter, one number, and one special character',
                        },
                      })}
                      type={hidePassword ? 'password' : 'text'}
                      className="w-full py-2 pl-2 pr-10 relative border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Create Password"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setHidePassword((prev) => !prev);
                      }}
                      type="button"
                      className="bg-white absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      {hidePassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative w-full">
                    <input
                      {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                      })}
                      type={hideConfrimPassword ? 'password' : 'text'}
                      className="w-full py-2 pl-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Re-Enter Password"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setHideConfirmPassword((prev) => !prev);
                      }}
                      type="button"
                      className="bg-white absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      {hideConfrimPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center flex-col mt-4">
                <button
                  type="submit"
                  className="w-auto px-3 py-2 flex justify-center bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 disabled:opacity-60 "
                  disabled={loading}
                  // disabled={!emailVerified && !phoneVerified}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <p>Creating account</p>
                      <FaSpinner className="animate-spin" />
                    </div>
                  ) : (
                    <p>Create Account →</p>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {otpSent && !emailVerified && (
        <div className="fixed z-10 h-screen w-screen flex justify-center items-center bg-opacity-60 bg-gray-500">
          <div className="w-full lg:w-[36rem] bg-white rounded-lg min-h-[250px] h-fit p-4 md:p-8">
            <Otp
              email={email}
              isReset={false}
              setIsOpen={setOtpSent}
              setEmailVerified={setEmailVerified}
              sendEmailOtp={sendEmailOtp}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Signup;
