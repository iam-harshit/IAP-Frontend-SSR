import React, { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleError } from '../../../../../../utils/profileImageFallback';

const ProfileNavigation = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log('📌CURRENT USER IN PROFILE NAVIGATION:', currentUser);
  const [imgSrc, setImgSrc] = useState(currentUser.profilePicture);

  if (!imgSrc) {
    handleError(setImgSrc, currentUser?.name?.charAt(0));
  }
  return (
    <>
      <div className="flex items-center justify-between flex-row border-[0.5px] border-[#680AFF] rounded-xl bg-white py-3 px-3 sm:px-2">
        <div className="flex justify-center items-center gap-2">
          <img
            src={imgSrc}
            alt="Profile Pic"
            onError={() =>
              handleError(setImgSrc, currentUser?.name?.charAt(0))
            }
            className="size-10 xs:size-12 sm:size-14 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h2 className="flex justify-center items-center gap-1 text-gray-700 text-base xs:text-xl sm:text-2xl font-semibold self-start">
              {currentUser.name}
              <MdVerified color="#680aff" size={20} />
            </h2>
            <p className="text-gray-500 text-xs">
              {currentUser.country
                ? currentUser.country
                : currentUser.designation}
            </p>
          </div>
        </div>
        <Link to="/profile" rel="noopener noreferrer">
          <button className="group hover:bg-[#680AFF] hover:text-white text-[#0011FF] sm:text-sm text-xs xs:text-base rounded-full px-3 sm:px-3 py-2 shadow font-medium bg-[#D9DEFF] text-center flex justify-center items-center gap-2">
            View Profile
            <FaExternalLinkAlt
              size={15}
              className="text-[#0011FF] group-hover:text-white transition-colors"
            />
          </button>
        </Link>
      </div>
    </>
  );
};

export default ProfileNavigation;
