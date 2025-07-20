import React, { useState } from 'react';
import bg from '@/assets/Profile-Page/no-slot-png.png';
import Modal from '@/Components/common/Modal';
import { useNavigate } from 'react-router-dom';

const NoSlotSection = ({ isCurrentUser, isMentor, userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const handleRequestSlot = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleNewSlot = () => {
    navigate('/dashboard/create-event');
  };

  return (
    <>
      <div className="w-full h-full flex flex-col items-center gap-4 lg:p-2 xl:p-0">
        <div className="px-4">
          <img src={bg} alt="no-slots" className='w-60 mt-4' />
        </div>
        {isCurrentUser && isMentor ? (
          <p className="flex flex-col items-center">
            <span className="text-center text-[#505050] text-lg sm:text-xl font-bold">
              No slots? No problem
            </span>
            <span className="text-center text-[#505050] text-sm sm:text-lg">
              (Secret🤫: you can add some anytime)
            </span>
            <button
              className="mb-4 py-1 mt-2 max-w-48 px-4 rounded-lg border-2 border-[#6F00FF] text-[#6F00FF] bg-customPurple text-white font-medium shadow-sm hover:opacity-90 transition-all duration-300"
              onClick={() => handleNewSlot()}
            >
              Add new slot
            </button>
          </p>
        ) : (
          <p className="flex flex-col pb-4">
            <span className="text-center text-[#505050] text-lg sm:text-xl font-bold">
              All slots booked!
            </span>
            <span className="text-center text-[#505050] text-sm sm:text-lg">
             Stick around, new slots will be up shortly!
            </span>
            <div className="flex justify-center">
            <button
              className="mb-4 py-1 mt-2 max-w-48 px-4 rounded-lg font-medium bg-customPurple text-white shadow-sm hover:opacity-90 transition-all duration-300 "
              onClick={() => handleRequestSlot()}
            >
              Request Slot
            </button>
          </div>
          </p>
        )}
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          type="request"
          data={userData}
        />
      )}
    </>
  );
};

export default NoSlotSection;
