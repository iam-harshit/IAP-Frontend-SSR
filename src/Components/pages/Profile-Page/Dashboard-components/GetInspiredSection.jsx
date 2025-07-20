import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Inspired from '@/assets/getInspired.svg';
import { addInspiredMentors } from '@/Reducers/mentorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { handleInspiredMentors } from '@/services/Operations/MentorsOperation/MentorsApi';
import mentorHelp from '@/assets/Profile-Page/mentoring.png';
import { handleError } from '../../../../../utils/profileImageFallback';

export default function GetInspiredSection() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith('/profile');

  const { inspiredMentors } = useSelector((state) => state.mentor);

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const response = await handleInspiredMentors();
        dispatch(addInspiredMentors(response));
      } catch (err) {
        setError(err.message || 'Failed to fetch mentors.');
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden ${
        isProfilePage
          ? currentUser?.role === 'mentee'
            ? 'mt-2 mb-24 lg:mb-0 lg:mt-0 bg-white max-w-[100%] md:max-w-[100%] lg:max-w-96 xl:max-w-[96%] 2xl:max-w-[100%]'
            : ' mb-24 lg:mb-0  bg-white max-w-[100%] md:max-w-[50%] lg:max-w-96 xl:max-w-[96%] 2xl:max-w-[100%]'
          : 'bg-[#ECEAFE] max-w-96'
      }`}
    >
      <div className=" rounded-lg w-full mx-auto overflow-hidden">
        <div className="relative flex flex-col items-center">
          {/* Calendar Icon in Top-Left */}
          <div className="absolute top-0 left-0 flex justify-center items-center rounded-br-2xl rounded-tl-2xl bg-customPurple w-12 h-12 md:w-14 md:h-14">
            <img
              className="h-6 md:h-8  invert"
              src={mentorHelp}
              alt="mentors"
            />
          </div>

          {/* Centered "Guided by" Text */}
          <h2 className="text-h3 font-semibold text-gray-800 text-center mt-3 mb-1">
            Our
          </h2>

          {/* "Our Mentors" Subtitle */}
          <h2 className="text-center text-h3 lg:mt-2 xl:mt-0 font-semibold  mb-3 md:mb-4 text-customPurple">
            Inspiring Mentors
          </h2>
        </div>

        <div className="space-y-3 px-3">
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <span className="text-customPurple font-semibold">
                Loading mentors...
              </span>
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          ) : inspiredMentors?.length > 0 ? (
            inspiredMentors?.map((mentor, index) => (
              <MentorList
                key={index}
                mentor={mentor}
                isProfilePage={isProfilePage}
              />
            ))
          ) : (
            <div className="w-full text-center py-4">
              <p className="text-gray-500 font-semibold">
                No mentors available at the moment.
              </p>
              <img src={Inspired} alt="Inspired" className="mx-auto mt-3" />
            </div>
          )}
        </div>

        <div className="text-end my-3 mr-3 ">
          <Link to="/explore-mentors">
            <button className="text-customPurple font-semibold hover:underline text-md">
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const MentorList = ({ mentor, isProfilePage }) => {
  const [imgSrc, setImgSrc] = useState(mentor?.profilePictureURL);

  if (!imgSrc) {
    handleError(setImgSrc, mentor?.fullName?.charAt(0));
  }

  useEffect(() => {
    if (!mentor?.profilePictureURL) {
      setImgSrc(
        `https://api.dicebear.com/5.x/initials/svg?seed=${mentor?.fullName.charAt(0)}`
      );
    } else {
      setImgSrc(mentor.profilePictureURL);
    }
  }, [mentor?.profilePictureURL]);

  return (
    <div
      className={`flex items-center bg-white rounded-xl md:px-3 md:py-2 px-2 py-2 w-full  ${isProfilePage ? 'border-2 border-[#D3B3FB]' : 'border-2 border-gray-300'} `}
    >
      <img
        src={
          imgSrc ??
          `https://api.dicebear.com/5.x/initials/svg?seed=${mentor?.fullName.charAt(0)}`
        }
        onError={() => handleError(setImgSrc, mentor?.fullName?.charAt(0))}
        alt="Profile"
        className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover mr-4"
      />
      <div>
        <Link to={`/profile/${mentor.userName}`}>
          <h2 className="text-gray-700 font-semibold text-[15px] md:text-[17px]">
            {mentor.fullName}
          </h2>
          <p className="text-[13px] md:text-[15px] text-gray-500">
            FullStack Developer | Mentor
          </p>
        </Link>
      </div>
    </div>
  );
};
