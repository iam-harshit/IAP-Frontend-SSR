import React from 'react';

const UnfollowModal = ({ name, handleUnfollow, setShowUnfollowModal }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[1000]">
    <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-[300px] p-6 lg:max-w-[350px]">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 lg:text-xl">
        Unfollow {name}?
      </h2>
      <p className="text-sm text-gray-600 mb-4 lg:text-lg">
        You won't see their posts in your feed anymore. You can still visit their profile unless their account is private.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowUnfollowModal(false)}
          className="px-4 py-2 rounded-full border font-medium border-customPurple text-customPurple w-full"
        >
          Cancel
        </button>
        <button
          onClick={handleUnfollow}
          className="px-4 py-2 rounded-full text-white font-medium bg-customPurple w-full"
        >
          Unfollow
        </button>
      </div>
    </div>
  </div>
);

export default UnfollowModal;