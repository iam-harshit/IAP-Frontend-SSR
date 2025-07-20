import React from 'react';
import { IoCodeSharp, IoFitness } from 'react-icons/io5';
import { FaHandsPraying } from 'react-icons/fa6';
import { MdBusinessCenter } from 'react-icons/md';

// Icon text colors
const iconColors = {
  technology: 'text-blue-600',
  business: 'text-green-600',
  spirituality: 'text-pink-500',
  'health & fitness': 'text-teal-500',
};

// Border colors
const borderColors = {
  technology: 'border-blue-600',
  business: 'border-green-600',
  spirituality: 'border-pink-500',
  'health & fitness': 'border-teal-500',
};

// Pale background colors
const cardBgColors = {
  technology: 'bg-blue-50',
  business: 'bg-green-50',
  spirituality: 'bg-pink-50',
  'health & fitness': 'bg-teal-50',
};

// Icons
const iconComponents = {
  technology: IoCodeSharp,
  business: MdBusinessCenter,
  spirituality: FaHandsPraying,
  'health & fitness': IoFitness,
};

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const MentorShipCategories = ({ mentorDetails }) => {
  const { mentorshipCategory = [] } = mentorDetails || {};

  return (
    <div className="w-full mt-3 md:px-6 px-6 lg:px-10 py-5 bg-white border rounded-xl shadow-md pb-10">
      <div className="flex items-center justify-between ">
        <h2 className="text-[26px] font-semibold text-gray-800">
          Mentorship Categor{mentorshipCategory.length > 1 ? 'ies' : 'y'}
        </h2>
      </div>

      <div className="flex flex-wrap gap-4 mt-4  md:justify-start">
        {mentorshipCategory.map((category, index) => {
          const IconComponent = iconComponents[category] || IoCodeSharp;
          const iconColor = iconColors[category] || 'text-blue-600';
          const borderColor = borderColors[category] || 'border-blue-600';
          const bgColor = cardBgColors[category] || 'bg-blue-50';

          return (
            <div
              key={index}
              className={` md:w-auto flex items-center gap-3 ${bgColor} ${borderColor} border rounded-lg px-4 py-3 shadow-sm transition-all duration-300`}
            >
              <div className={`text-2xl ${iconColor}`}>
                <IconComponent />
              </div>
              <span className="text-purple-900 font-semibold text-h5 capitalize">
                {capitalize(category)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentorShipCategories;
