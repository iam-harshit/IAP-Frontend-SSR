import React, {useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { FaEye, FaSpinner } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import signupMentee from '@/assets/signupMentee.png';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginApi } from '@/services/Operations/AuthenticationOperation/AuthenticationApi';
import {
  signInFailure,
  signInSuccess,
} from '../Reducers/userSlice';
import OAuth from '../Components/core/OAuth';
import SEO from '@/Components/common/SEO';
import {
  handleGetProfileApi,
  handleMyProfileApi,
} from '@/services/Operations/ProfileOperation/ProfilePageApi';

const Signin = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = {
      email: data.email,
      password: data.password,
    };

    try {
      setLoading(true);
      const loadingToastId = toast.loading('Signing in...');
      dispatch(signInSuccess());
      const loginRes = await handleLoginApi(formData, {
        withCredentials: true,
      });
      const loginStatus = loginRes?.status;
      const loginSuccess = loginRes?.data?.success;
      const user = loginRes?.data?.data?.userInfo;

      if (loginStatus > 400 || !loginSuccess || !user) {
        toast.dismiss(loadingToastId);
        toast.error(loginRes?.data?.message || 'Login failed');
        dispatch(signInFailure(loginRes?.data));
        return;
      }

      const rolesRes = await handleMyProfileApi();
      const rolesStatus = rolesRes?.status;
      const profileResponseData = rolesRes?.data?.data;

      if (rolesStatus > 400 || !profileResponseData) {
        toast.dismiss(loadingToastId);
        toast.error('Failed to fetch user');
        dispatch(signInFailure(rolesRes?.data));
        return;
      }
      dispatch(signInSuccess(profileResponseData));
      toast.dismiss(loadingToastId);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Sign In"
        description="Sign in to InspirationApp and access your personalized dashboard, mentorship opportunities, events, and more. Stay connected and continue your journey in technology, health, spirituality, or business."
        canonical="https://inspirationapp.org/sign-in"
      />

      <section className="w-full h-screen flex">
        <div className="left hidden w-full md:w-1/2 h-full bg-[#eceaff] md:flex justify-center items-center">
          <div className="flex flex-col items-center">
            <img src={signupMentee} alt="" />
            <p className="text-2xl font-semibold text-center">
              Check in to the world of inspiration, <br /> to get inspired
            </p>
          </div>
        </div>

        <div className="right h-full w-full md:min-w-[500px] md:w-1/2 flex l-md:justify-center l-md:items-center">
          <div className="h-auto overflow-y-scroll w-full max-w-xl flex flex-col gap-8 p-4">
            <div className="flex flex-col gap-2 h-auto">
              <div className="flex justify-end">
                <Link
                  className="text-black flex items-center gap-1 text-base font-normal hover:underline hover:font-medium"
                  to={'/'}
                >
                  <MdKeyboardArrowLeft />
                  Back to home
                </Link>
              </div>
              <div className="flex gap-2 relative">
                <span className="inline-block w-auto bg-white pr-6 text-3xl font-semibold text-[#5C3FD4]">
                  Sign In
                </span>
                <span className="h-[3px] w-[80%] bg-[#DAD2FF] z-[-1] absolute top-[50%] right-0"></span>
              </div>
              <div>
                <p className="font-[500] text-gray-400 text-lg">
                  New here?
                  <Link
                    to="/sign-up"
                    title=""
                    className="text-[#5C3FD4] hover:underline mx-2"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>

            <div className="form-container">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="grid grid-cols-1 mb-3">
                  <div>
                    <label className="block font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative w-full">
                      <input
                        {...register('email', {
                          required: 'Email is required',
                        })}
                        type="email"
                        className="w-full py-2 pl-2 border rounded pr-16 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter Email Address"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 mb-3">
                  <div>
                    <label className=" font-medium mb-2 flex items-end justify-between">
                      Password
                      <Link
                        to="/forgot-password"
                        className="hover:underline hover:cursor-pointer text-xs"
                      >
                        Forgot password?
                      </Link>
                    </label>
                    <div className="relative w-full">
                      <input
                        {...register('password', {
                          required: 'Password is required',
                        })}
                        type={hidePassword ? 'password' : 'text'}
                        className="w-full py-2 pl-2 pr-10 relative border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter Password"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setHidePassword((prev) => !prev);
                        }}
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
                </div>

                <div className="flex justify-center mt-4 flex-col">
                  <button
                    type="submit"
                    className="w-auto px-3 py-2 flex justify-center bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 disabled:opacity-60 "
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <p>Sign In</p>
                        <FaSpinner className="animate-spin" />
                      </div>
                    ) : (
                      <p>Sign In →</p>
                    )}
                  </button>

                  <div className="relative flex my-2 w-full justify-center items-center">
                    <span className="bg-white z-[1] px-2">OR</span>
                    <span className="w-full bg-gray-400 h-[1px] opacity-35 absolute top-1/2 transform -translate-y-1/2"></span>
                  </div>

                  <button
                    type="button"
                    className="relative inline-flex w-auto items-center justify-center rounded-md border border-gray-400 bg-[#ffffff] px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                  >
                    <OAuth
                      authText={'Sign-in with Google'}
                      isSignup={false}
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
