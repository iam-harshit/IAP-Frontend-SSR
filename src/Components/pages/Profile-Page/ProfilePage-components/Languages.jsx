import React from 'react';
import { SlPencil } from 'react-icons/sl';
function Languages({ userData, isCurrentUser, changeSection }) {
  return (
    <div className="w-full mt-3 md:px-6 pl-6 lg:pl-10 py-5 bg-white border rounded-xl shadow-md pb-10">
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-h3 text-gray-800 mb-3">Languages</h2>
        {isCurrentUser && (
          <button
            className="hover:bg-customPurple hover:text-white rounded-full p-2 mr-2 md:mr-0"
            onClick={(e) => {
              e.preventDefault();
              changeSection('about');
            }}
          >
            <SlPencil className="size-[20px]" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-[10px] pr-6">
        {userData.language?.length > 0 ? (
          userData.language?.map((item, index) => (
            <div
              key={index}
              className="rounded-lg px-3 py-1 text-h6 font-medium text-purple-700 border border-purple-300 
              transition-all duration-200 select-none bg-purple-100"
            >
              {item}
            </div>
          ))
        ) : (
          <div className="text-h6 font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-md text-center border border-purple-300 ">
            English
          </div>
        )}
      </div>
    </div>
  );
}

export default Languages;
