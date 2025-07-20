import React from 'react';
import { MdPauseCircleOutline } from 'react-icons/md';
function ProfileOnHold() {
  return (
    <div className="rounded-md my-6 mx-auto p-3 md:p-4 flex flex-col gap-3 max-w-[600px]  bg-[#F4FCFF] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] ">
      <div className="flex flex-col gap-2 md:flex-row justify-between">
        <h2 className="text-2xl font-semibold flex flex-row gap-2 items-center">
          {' '}
          <span>Profile on Hold</span>
          <MdPauseCircleOutline />
        </h2>
        <button className="bg-gray-900 w-fit px-3 py-2 text-white rounded-lg">
          Contact Support
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[16px] font-semibold text-gray-800">
          We will be waitlisting your profile for now and will be reaching you
          out very soon whenever we’re ready to list you on platform
        </p>
        <p className="text-[15px]  text-gray-700">
          Please reach out to Support Team if you would like to get further
          clarification
        </p>
      </div>
    </div>
  );
}

export default ProfileOnHold;
