import React from 'react';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { IoCheckboxOutline } from 'react-icons/io5';
import SpeakerImg from '../../../../assets/Profile-Page/speaker.png';

function FeaturedComponent() {
  return (
    <div className="rounded-md my-6 mx-auto max-w-[600px]  bg-[#F2F6ED] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] ">
      <div className="rounded-md  relative p-3 md:px-4 py-2 flex flex-row  md:gap-4 items-center justify-center md:justify-around ">
        <div className="pl-2">
          <h2 className="text-[17px] text-gray-700 font-bold">
            Get 5 bookings
          </h2>
          <p className="text-[14px] text-gray-700">
            Get featured on our socials.
          </p>
        </div>
        <div>
          <div className="flex flex-row gap-1 items-center justify-between">
            <IoCheckboxOutline />
            <IoCheckboxOutline />
            <IoCheckboxOutline />
            <IoCheckboxOutline />
            <MdCheckBoxOutlineBlank />
          </div>
        </div>
        <div className="hidden md:block absolute left-1 bottom-0">
          <img className="w-[60px]" src={SpeakerImg} />
        </div>
      </div>
      {/* <div></div> */}
    </div>
  );
}

export default FeaturedComponent;
