import React from 'react';
import { SlPencil } from 'react-icons/sl';

const predefinedLabels = {
  oneOnOne: '1:1 Mentorship',
  groupSession: 'Group Sessions',
  webinar: 'Webinars',
  workshop: 'Workshops',
  resumeReview: 'Resume Review',
  mockInterview: 'Mock Interviews',
  phoneCall: 'Phone Calls',
  digitalMaterials: 'Digital Materials',
  directMessage: 'Direct Messaging',
  chatSupport: 'Chat Support',
};

const MentorshipOfferings = ({ isCurrentUser, changeSection, userData }) => {
  const offerings = userData?.mentorDetails?.offerings || {};
  const { predefined = {}, custom = [] } = offerings;

  // Extract predefined offerings that are marked true
  const activePredefined = Object.entries(predefined)
    .filter(([_, isActive]) => isActive)
    .map(([key]) => predefinedLabels[key] || key);

  // Extract custom offerings that are active
  const activeCustom = custom
    .filter((item) => item?.isActive)
    .map((item) => item?.customOffering);

  return (
    <div className="w-full mt-3 md:px-6 pl-6 lg:pl-10 py-5 bg-white border rounded-xl shadow-md pb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-[26px] font-semibold text-gray-800">
          Mentorship Offerings
        </h2>

        {isCurrentUser && (
          <button
            onClick={(e) => {
              e.preventDefault();
              changeSection('mentor-details');
            }}
            className="p-2 mr-2 md:mr-0 rounded-full hover:bg-customPurple hover:text-white transition-all duration-300"
            aria-label="Edit mentorship offerings"
          >
            <SlPencil className="size-[20px]" />
          </button>
        )}
      </div>

      {/* Offerings List */}
      <div className="flex flex-wrap gap-3 mt-3">
        {[...activePredefined, ...activeCustom].map((offering, index) => (
          <span
            key={index}
            className="rounded-lg px-3 py-1 text-h6 font-medium text-purple-700 border border-purple-300 
              transition-all duration-200 select-none bg-purple-100"
          >
            {offering}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MentorshipOfferings;
