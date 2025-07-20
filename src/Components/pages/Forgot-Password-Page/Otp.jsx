import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineMailOpen } from 'react-icons/hi';
import {
  handleVerifyOtpApi,
  handleVerifyResetOtpApi,
} from '../../../services/Operations/AuthenticationOperation/AuthenticationApi';
import { RxCross2 } from 'react-icons/rx';

const Otp = ({
  setStep,
  email,
  isReset,
  setEmailVerified,
  sendEmailOtp,
  setToken,
  sendEmail,
  setIsOpen,
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Enter') {
      if (isReset) {
        verifyResetEmailOtp(otp.join(''), email);
      } else {
        validateOtp();
      }
    } else if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validateOtp = async () => {
    const otpVal = otp.join('');
    // console.log(otpVal)

    if (otpVal.length < 4) {
      toast.dismiss();
      toast.error('Invalid OTP.');
      return;
    }

    if (!isReset) {
      const result = await handleVerifyOtpApi(otpVal, email);
      // console.log(result)
      if (result.data.success) {
        setEmailVerified(true);
        toast.success('Email verified.');
      } else {
        toast.error('Incorrect OTP');
      }
      return;
    }

    // validate otp api
    toast.dismiss();
    toast.success('OTP verified.');
  };

  const verifyResetEmailOtp = async (otp, email) => {
    const result = await handleVerifyResetOtpApi(otp, email);
    // console.log(result)
    if (result.data.success) {
      toast.success('Email verified.');
      setToken(result.data.token); //  Store token in parent state
      setStep(2); // Move to NewPassword step
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text').trim();

    if (/^\d{4}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);

      // Move focus to the last input field
      inputRefs.current[3]?.focus();
    } else {
      toast.dismiss();
      toast.error('Invalid OTP format');
    }
  };

  const resendOtp = () => {
    const sendOtpFunction = isReset ? sendEmail : sendEmailOtp;

    sendOtpFunction(email);
  };

  return (
    <div className="w-full h-auto flex flex-col gap-6 relative">
      {!isReset && (
        <button
          className="absolute top-0 right-0 m-2"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <RxCross2 size={24} />
        </button>
      )}
      <div className="flex justify-center">
        <div className="rounded-md border p-2 border-black text-xl">
          <HiOutlineMailOpen height={48} width={48} />
        </div>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold text-center">
          {isReset ? 'Reset Password' : 'Verify Email'}
        </h1>
        <p className="text-center text-lg">
          We have sent a mail on{' '}
          <span className="text-gray-600 font-semibold">{email}</span>.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => el && (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                maxLength={1}
                onPaste={handlePaste}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-xl text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="w-auto px-3 py-2 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700"
            onClick={() =>
              isReset ? verifyResetEmailOtp(otp.join(''), email) : validateOtp()
            }
          >
            Verify
          </button>
        </div>

        <div>
          <p className="text-center">
            Didn't received the OTP?{' '}
            <button
              className="text-blue-500 underline cursor-pointer"
              onClick={() => resendOtp()}
            >
              click here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
