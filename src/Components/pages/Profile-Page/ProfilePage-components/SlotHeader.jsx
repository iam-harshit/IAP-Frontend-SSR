import React from 'react';
import { SlPencil } from 'react-icons/sl';

const SlotHeader = ({ isMentor, isCurrentUser, handleNewSlot }) => (
  <div className={`flex ${!isCurrentUser? 'justify-center': 'justify-between'} items-start relative border-b-2 pb-2 mx-4`}>
    <p className={` ${!isCurrentUser? 'text-[24px] xs2:text-[26px] lg:text-[20px] llg:text-h3': 'xs2:text-[26px] text-h4 lg:text-h4 xl:text-h3'}  font-semibold  mt-3 text-gray-800`}>
      Explore Inspiring Sessions
    </p>
    {isMentor && isCurrentUser && (
      <button
        className="absolute right-[-15px] top-2 p-2 rounded-full hover:bg-customPurple my-auto ml-auto mr-2 md:mr-4 hover:text-white transition-all duration-300"
        onClick={handleNewSlot}
      >
        <SlPencil className="size-[20px]" />
      </button>
    )}
  </div>
);

export default SlotHeader;
