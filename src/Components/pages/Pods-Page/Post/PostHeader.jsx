import React, { useState } from 'react';

const PostHeader = ({ profilePicture, userName, postedOn, formatDate }) => {
  const [showMenu, setShowMenu] = useState(false);
  const formattedDate = formatDate(postedOn);

  return (
    <div className="flex items-start justify-between mb-1 relative">
      <div className="flex items-start gap-3">
        <img
          src={profilePicture}
          alt={`${userName} profile`}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-[18px] font-semibold md:text-h4">{userName}</h3>
          <p className="text-gray-500 text-sm">{formattedDate}.</p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 text-gray-600 hover:text-black focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-5 h-5"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>

        {showMenu && (
          <div className="absolute right-0 top-6 mt-0 w-36 bg-white border rounded shadow-md z-50">
            <button
              onClick={() => {
                setShowMenu(false);
                alert('Post Reported!');
              }}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
                className="w-4 h-4 text-gray-600"
              >
                <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32L0 64 0 368 0 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-247.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48l0-16z" />
              </svg>
              Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHeader;