import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlPencil } from 'react-icons/sl';
import '@/App.css';
import { FaGraduationCap } from "react-icons/fa";

function EducationSection({ eduData, isCurrentUser, changeSection }) {
  

  return (
    <div className="w-full mt-3 md:px-6 pl-6 lg:pl-10 py-5 bg-white border rounded-xl shadow-md">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-[26px]  font-semibold text-gray-800">Education</h2>
        {isCurrentUser && (
          <button
            onClick={(e) => {
              e.preventDefault();
              changeSection('professional-details');
            }}
            className="p-2 mr-2 md:mr-0 rounded-full hover:bg-customPurple hover:text-white transition-all duration-300"
          >
            <SlPencil className="size-[20px]" />
          </button>
        )}
      </div>

      <div className=" grid w-full">
        {[...eduData]
          .sort((a, b) => {
            const getComparableDate = (item) =>
              item.endYear === 'Present' || !item.endYear
                ? new Date()
                : new Date(item.endYear);

            return getComparableDate(b) - getComparableDate(a);
          })
          .map((item, index) => (
            <div
              key={index}
              className="mt-1 md:mt-3 flex items-center justify-between  rounded-lg relative"
            >
              <div className="flex items-start gap-4 w-full">
                {/* Institute Logo */}
                <div
                  className={`timeline-dot ${index < eduData.length - 1 ? 'with-line' : ''} `}
                >
                  <div className="w-8 h-8 bg-white overflow-hidden z-10 mt-2 ">
                    <FaGraduationCap  className="w-full h-full text-gray-700"/>
                  </div>
                </div>

                <div
                  className={`mr-4 md:mr-0 flex flex-col md:flex-row md:justify-between items-start w-full pb-4 ${index < eduData.length - 1 ? 'border-b border-gray-300' : ''}`}
                >
                  {/* Education Details */}
                  <div className="flex flex-col mt-2">
                    <h4 className="text-lg font-semibold text-gray-700 max-w-[250px] sm:max-w-[400px] lg:max-w-[400px] whitespace-normal break-words">
                      {item?.degree}
                    </h4>
                    <p className="text-sm text-gray-900 opacity-90">
                      {item?.institution}
                    </p>
                  </div>
                  {/* Duration */}
                  <div className="text-[12px] text-gray-500 italic md:mt-2">
                    {item.startYear} - {item.endYear}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default EducationSection;
