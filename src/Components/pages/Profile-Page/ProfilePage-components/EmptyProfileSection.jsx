import { FaPlus } from 'react-icons/fa6';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyProfileSection = ({ title, desc }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (title === 'Languages' || title === 'About') {
      navigate('/dashboard/background-details');
    } else if (title === 'Certifications') {
      navigate('/dashboard/certification-details');
    } else if (title === 'Mentorship Offerings') {
      navigate('/dashboard/mentor-details');
    } else {
      navigate('/dashboard/professional-details');
    }
  };

  return (
    <div className="w-full flex justify-center mt-3 ">
      <div className="w-full bg-white border border-gray-200 shadow-md rounded-xl py-6 pl-5 pr-3 md:pr-6 lg:pl-10 md:p-6 md:pb-10 transition-all hover:shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-[26px]  font-semibold text-gray-800 pl-1 md:pl-0">
            {title}
          </h2>

          <button
            onClick={handleNavigation}
            className="bg-gradient-to-b from-[#6F00FF] to-[#4F46E5] text-white p-2 rounded-full
      transition-all duration-300 transform hover:scale-95
      shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.2)]"
            aria-label={`Add ${title}`}
          >
            <FaPlus className="text-[14px] lg:text-[20px]" />
          </button>
        </div>

        {/* Description */}
        <div className="mt-4 pl-1 md:pl-0">
          <p className=" text-h6 md:text-h5 text-gray-500 ">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyProfileSection;
