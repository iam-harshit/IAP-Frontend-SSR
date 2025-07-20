import React from 'react';
import { SlPencil } from 'react-icons/sl';

function Skills({ userData, isCurrentUser, changeSection }) {
 
  return (
   
     <div className="w-full mt-3 md:px-6 pl-6 lg:pl-10 py-5 bg-white border rounded-xl shadow-md pb-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-h3 text-gray-800">Skills</h2>
        {isCurrentUser && (
          <button
            className="hover:bg-customPurple hover:text-white rounded-full p-2 mr-2 md:mr-0"
            onClick={(e) => {
              e.preventDefault();
              changeSection('professional-details');
            }}
          >
            <SlPencil className="size-[20px]" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-[10px] pr-6">
        {userData.skills?.length > 0 ? (
          userData.skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-lg px-3 py-1 text-h6 font-medium text-purple-700 border border-purple-300 
              transition-all duration-200 select-none bg-purple-100"
            >
              {skill.trim()}
            </span>
          ))
        ) : (
          <div className="text-h6 md:text-h5 text-gray-500">
            Skills are one of the first things recruiters look for.
          </div>
        )}
      </div>
    </div>
   
  );
}

export default Skills;
