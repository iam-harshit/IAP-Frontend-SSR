import { LuMoveLeft } from 'react-icons/lu';
import { CiSearch } from 'react-icons/ci';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileNotFound = () => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate('/');
  };
  return (
    <div className="h-[80vh] w-full grid place-items-center">
      <div className="flex flex-col w-full max-w-[700px] gap-4 items-center p-2">
        <div className="h-24 w-24 text-[#aa52ff] bg-[#f3e8ff] p-4 rounded-full">
          <CiSearch className="h-full w-full" />
        </div>
        <div className="font-bold text-4xl">User not found</div>
        <p className="text-[#898D9A] text-xl font-semibold text-center">
          We couldn't find the user you're looking for. They may have been
          removed or you might have mistyped the username.
        </p>
        <button
          className="flex gap-4 items-center border border-black py-2 px-4 rounded-lg"
          onClick={() => handleBackNavigation()}
        >
          <LuMoveLeft />
          <p className="text-lg text-[#5D5A5D] font-semibold">Back to home</p>
        </button>
      </div>
    </div>
  );
};

export default ProfileNotFound;
