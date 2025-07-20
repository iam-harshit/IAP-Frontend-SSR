import React, { useState, useEffect } from 'react';
import { handleError } from '../../../../../utils/profileImageFallback';
import { FaStar } from 'react-icons/fa6';

const ProfileImage = ({ name, userData }) => {
  const { profilePicture, mentorDetails } = userData;
  const isTopMentor = mentorDetails?.isTopMentor;

  const [imgSrc, setImgSrc] = useState(profilePicture);

  useEffect(() => {
    if (!profilePicture) {
      setImgSrc(
        `https://api.dicebear.com/5.x/initials/svg?seed=${name?.trim().charAt(0)}`
      );
    } else {
      setImgSrc(profilePicture);
    }
  }, [profilePicture]);

  return (
    <div className="z-10 relative w-fit  ">
      {/* Profile Image */}
      <img
        src={
          imgSrc ??
          `https://api.dicebear.com/5.x/initials/svg?seed=${name?.trim().charAt(0)}`
        }
        alt="Profile"
        onError={() => handleError(setImgSrc, name?.charAt(0))}
        className="w-[100px] h-[100px] md:h-[150px] md:w-[150px] lg:h-[170px] lg:w-[170px] ml-[10px] border-4 border-white rounded-full object-cover mt-[-60px] md:mt-[-90px] md:ml-[20px]"
      />

      {/* Top Mentor Badge */}
      {isTopMentor && (
        <div className="absolute top-1 -right-1 md:top-[12px] lg:top-[30px] md:right-0 group">
          <div
            className="relative z-10 bg-white border border-yellow-400 rounded-full p-[6px] shadow-lg"
            
          >
            <FaStar className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div className="absolute w-[90px] bottom-full left-0 mb-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-md z-20">
            Top Mentor
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
