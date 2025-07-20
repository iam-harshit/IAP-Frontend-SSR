import React, { useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import signupMentor from '@/assets/signupMentor.png';
import Email from '@/Components/pages/Forgot-Password-Page/Email';
import Otp from '@/Components/pages/Forgot-Password-Page/Otp';
import NewPassword from '@/Components/pages/Forgot-Password-Page/NewPassword';
import { handleSendResetOtpApi } from '@/services/Operations/AuthenticationOperation/AuthenticationApi';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(null); // Store token in parent
  const isReset = true;

  const sendEmail = async (email) => {
    // console.log('📌 Email before sending OTP:', email)

    if (!email) {
      toast.error("Email field can't be empty");
      return;
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      toast.error('Enter a valid email');
      return;
    }

    // Call API function
    const response = await handleSendResetOtpApi(email);

    // Handle response and UI updates
    if (response.data.success) {
      setStep(1);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <section className="w-full h-screen flex">
      <div className="left hidden w-full md:w-1/2 h-full bg-[#eceaff] md:flex justify-center items-center">
        <div className="flex flex-col items-center">
          <img src={signupMentor} alt="" />
          <p className="text-2xl font-semibold text-center">
            Check in to the world of inspiration, <br /> to get inspired
          </p>
        </div>
      </div>
      <div className="right h-full w-full md:min-w-[500px] md:w-1/2 flex l-md:justify-center l-md:items-center gap-2">
        <div className="h-full overflow-y-scroll w-full max-w-xl flex flex-col justify-between max-h-[750px] gap-2 p-4">
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
                Reset Password
              </span>
              <span className="h-[3px] w-[80%] bg-[#DAD2FF] z-[-1] absolute top-[50%] right-0"></span>
            </div>
          </div>

          <div>
            {step == 0 && (
              <Email
                setStep={setStep}
                email={email}
                setEmail={setEmail}
                sendEmail={sendEmail}
              />
            )}
            {step == 1 && (
              <Otp
                setStep={setStep}
                email={email}
                isReset={isReset}
                setToken={setToken}
                sendEmail={sendEmail}
              />
            )}
            {step == 2 && <NewPassword token={token} />}
          </div>

          <div className="w-full flex gap-4">
            <span
              className={`${step >= 0 ? 'bg-[#5C3FD4]' : 'bg-gray-300'} w-full h-2 rounded-full`}
            ></span>
            <span
              className={`${step >= 1 ? 'bg-[#5C3FD4]' : 'bg-gray-300'} w-full h-2 rounded-full`}
            ></span>
            <span
              className={`${step >= 2 ? 'bg-[#5C3FD4]' : 'bg-gray-300'} w-full h-2 rounded-full`}
            ></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
