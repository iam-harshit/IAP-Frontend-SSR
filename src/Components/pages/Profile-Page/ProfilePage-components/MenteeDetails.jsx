import React, { useState } from 'react';
import { MdPeopleAlt } from 'react-icons/md';
import { SlPencil } from 'react-icons/sl';
import { FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';

const MenteeDetails = ({ userData, isCurrentUser, changeSection }) => {
  const { menteeDetails } = userData;
  const mentorshipNeeds = menteeDetails?.mentorshipNeeds || [];
  const preferredMentorCategory = menteeDetails?.preferredMentorCategory || [];
  const learningGoals = menteeDetails?.learningGoals || [];

  const tabs = [
    { key: 'needs', icon: <MdPeopleAlt />, label: 'Mentorship Needs' },
    {
      key: 'category',
      icon: <FaChalkboardTeacher />,
      label: 'Preferred Category',
    },
    { key: 'goals', icon: <FaGraduationCap />, label: 'Learning Goals' },
  ];

  const [activeTab, setActiveTab] = useState('needs');

  const renderList = (items, heading, description, showNumbers = true) => (
    <div className="pt-4">
      <div className="flex items-start sm:items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{heading}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        {isCurrentUser && (
          <button
            onClick={(e) => {
              e.preventDefault();
              changeSection('mentee-details');
            }}
            className="p-2 rounded-full hover:bg-purple-100 text-purple-700 transition-all duration-300"
            aria-label="Edit mentorship details"
          >
            <SlPencil className="size-[20px]" />
          </button>
        )}
      </div>

      {/* List Items */}
      <ul className="space-y-3 text-gray-800 text-[16px] leading-relaxed">
        {items.length === 0 ? (
          <p className="text-gray-500">No data added yet.</p>
        ) : (
          items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg"
            >
              {showNumbers && (
                <span className="min-w-8 min-h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-semibold">
                  {index + 1}
                </span>
              )}
              <span className="flex-1">{item}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );

  return (
    <div className="w-full mt-3 bg-white border rounded-xl shadow-md pb-10 mb-20 lg:mb-2">
      {/* Tabs */}
      <div className="flex gap-3 flex-wrap px-6 md:px-6 lg:px-10 pt-5 pb-3 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium border
            ${
              activeTab === tab.key
                ? 'bg-purple-600 text-white border-purple-700 shadow-inner translate-y-[1px]'
                : 'bg-purple-100 text-purple-700 border-transparent hover:bg-purple-200 hover:shadow-md'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="px-6 md:px-6 lg:px-10">
        {activeTab === 'needs' &&
          renderList(
            mentorshipNeeds,
            'Mentorship Needs',
            "Areas where I'm seeking guidance and support"
          )}
        {activeTab === 'category' &&
          renderList(
            preferredMentorCategory,
            'Preferred Mentor Category',
            'Types of mentors I prefer to connect with',
            false
          )}
        {activeTab === 'goals' &&
          renderList(
            learningGoals,
            'Learning Goals',
            'Objectives I aim to achieve through mentorship'
          )}
      </div>
    </div>
  );
};

export default MenteeDetails;
