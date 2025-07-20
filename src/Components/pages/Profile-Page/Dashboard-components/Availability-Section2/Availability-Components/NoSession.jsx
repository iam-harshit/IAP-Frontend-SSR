import React from 'react';
import noSession from '@/assets/nosession.png';

const NoSession = () => {
  return (
    <div className="w-full h-full min-h-72 flex justify-center my-8">
      <div className="w-full max-w-[900px] flex flex-col l-md:flex-row items-center rounded-md border border-black">
        <div className="hidden  w-1/2 l-md:flex justify-center items-center">
          <img className="h-full max-h-52" src={noSession} alt="" />
        </div>

        <div className="msg w-full l-md:w-1/2 h-full">
          <div className="h-full flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold text-gray-600">Oops!!</h1>
            <h2 className="text-2xl font-semibold text-gray-400 mt-4">
              No session found
            </h2>
            <h1 className="text-2xl font-semibold text-gray-400">
              Schedule new sessions
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoSession;
