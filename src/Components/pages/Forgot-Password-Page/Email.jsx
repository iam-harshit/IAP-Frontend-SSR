import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';

const Email = ({ email, setEmail, sendEmail }) => {
  return (
    <div className="w-full h-auto flex flex-col gap-6">
      <div className="flex justify-center">
        <div className="rounded-md border p-2 border-black text-xl">
          <HiOutlineMail height={48} width={48} />
        </div>
      </div>
      <div className="flex flex-col gap-8 md:gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-center">
            Forgot Password?
          </h1>
          <p className="text-center text-lg">
            Dont worry we will send you reset instructions.
          </p>
        </div>

        <div className="flex flex-col gap-2 font-medium">
          <p>Email</p>
          <input
            // pattern='/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'
            className="w-full py-2 pl-2 border rounded pr-16 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button
            className="w-auto px-3 py-2 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700"
            onClick={() => sendEmail(email)}
          >
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Email;
