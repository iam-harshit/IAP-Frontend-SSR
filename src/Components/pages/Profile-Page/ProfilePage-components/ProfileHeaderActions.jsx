import React, { useState, useRef, useEffect } from 'react';
import { SlPencil } from 'react-icons/sl';
import { FaCheck, FaFlag } from 'react-icons/fa6';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiShare2 } from 'react-icons/fi';
import toast from 'react-hot-toast';


const ProfileHeaderActions = ({
  isCurrentUser,
  isFollowing,
  handleFollow,
  setShowUnfollowModal,
  changeSection,
  userData,
  currentUser,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <>
      <div
        className={`absolute top-2  md:top-[18px]  flex items-center  ${isCurrentUser ? 'gap-2 right-2 md:right-6' : 'gap-0 right-2'}`}
      >
        {isCurrentUser ? (
          <button
            className="p-1.5 border-[2px] md:hidden rounded-full text-customPurple font-medium hover:bg-customPurple hover:text-white transition-all duration-300"
            onClick={() => changeSection('background-details')}
          >
            <SlPencil className="size-[18px]" />
          </button>
        ) : (
          <div
            key={isFollowing ? 'following' : 'follow'}
            className="transition-all duration-300 ease-in-out transform"
          >
            {currentUser?._id !== userData?._id && (
              <div
                key={isFollowing ? 'following' : 'follow'}
                className="transition-all duration-300 ease-in-out transform"
              >
                {!isFollowing ? (
                  <button
                    className="px-3 py-[4px] md:px-4 md:py-[6px] border-[2px] text-h6 md:text-h5 border-customPurple rounded-full text-customPurple font-medium bg-customPurple text-white shadow-sm hover:opacity-90 transition-all duration-300"
                    onClick={handleFollow}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    className="px-2 py-[4px] md:px-3 md:py-[6px] border-[2px] text-h6 md:text-h5 border-customPurple rounded-full font-medium bg-customPurple text-white shadow-sm hover:opacity-90 transition-all duration-300"
                    onClick={() => setShowUnfollowModal(true)}
                  >
                    <FaCheck className="inline-block mr-2 text-h6 md:text-[20px]" />
                    Following
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Menu */}
        <div className="relative" ref={dropdownRef}>
          <BsThreeDotsVertical
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-2xl text-gray-600 cursor-pointer"
          />

          {dropdownOpen && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 shadow-lg rounded-md w-40 z-10">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  setDropdownOpen(false);

                  const profileURL = `${window.location.origin}/profile/${userData?.username || userData?._id}`;

                  if (navigator.share) {
                    navigator
                      .share({
                        title: 'Check out this profile on Inspiration!',
                        text: 'Explore this inspiring profile!',
                        url: profileURL,
                      })
                      .catch(() => {
                        navigator.clipboard.writeText(profileURL);
                        toast.success('Profile link copied to clipboard!');
                      });
                  } else {
                    navigator.clipboard.writeText(profileURL);
                    toast.success('Profile link copied to clipboard!');
                  }
                }}
              >
                <FiShare2 className="text-lg text-gray-900" />
                Share Profile
              </button>

              <button
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  setDropdownOpen(false);
                  alert('Report clicked');
                }}
              >
                <FaFlag className="text-base text-gray-900" />
                Report
              </button>
            </div>
          )}
        </div>
      </div>

      {isCurrentUser && (
        <div className="mt-3 hidden md:flex flex-col items-end justify-start sm:pl-20 md:pl-0 sm:pr-24 md:pr-12 lg:pr-[55px] w-fit max-w-[300px] ml-auto">
          <button
            className="text-customPurple py-[6px] font-medium px-4 border-[2px] border-customPurple rounded-full transition-all duration-300 hover:bg-customPurple hover:text-white"
            onClick={() => changeSection('background-details')}
          >
            Edit Profile
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileHeaderActions;
