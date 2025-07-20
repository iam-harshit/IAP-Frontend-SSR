import React, { useState, useRef, useEffect, useCallback } from 'react';
import { IoMenu } from 'react-icons/io5';
import { MdVerified } from 'react-icons/md';
import BgImage from '../../../../assets/DashboardAssets/Dashboard-bg.png';
import { IoCloseSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleLogoutApi } from '../../../../services/Operations/AuthenticationOperation/AuthenticationApi';
import { CustomIcons } from '../../../common/CustomIcons';
import { handleError } from '../../../../../utils/profileImageFallback';
import dashboard from '../../../../assets/dashboard.jpg';

const DashboardHeader = ({
  currentUser,
  isMentor,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown
  const [imgSrc, setImgSrc] = useState(currentUser.profilePicture);
  // console.log('Role:', isMentor);

  if (!imgSrc) {
    handleError(setImgSrc, currentUser?.name?.charAt(0));
  }
  const data = [
    {
      heading: 'Home',
      icon: 'IoHome',
      action: () => {
        navigate(`/`);
        setDropdownOpen(false);
      },
    },
    {
      heading: 'Profile',
      icon: 'FaUserCircle',
      action: () => {
        navigate(`/profile`);
        setDropdownOpen(false);
      },
    },
    {
      heading: 'Logout',
      icon: 'MdLogout',
      action: async () => {
        await handleLogoutApi(dispatch);
      },
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    function handleScroll() {
      setDropdownOpen(false); // Close dropdown on scroll
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dropdownOpen]);

  return (
    <div
      className="md:mx-2 lg:mx-2 h-fit md:mt-2  rounded-none md:rounded-[20px] relative z-[100]"
      style={{
        backgroundImage: `url(${dashboard})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="md:px-4 lg:px-4 py-3 px-3 flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 md:gap-0">
          <button
            className="md:hidden h-10 min-w-10 flex justify-center items-center text-purple-600 bg-white/60 backdrop-blur-sm rounded-full shadow-lg p-2 transition-transform duration-300 my-auto"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <IoCloseSharp size={20} /> : <IoMenu size={20} />}
          </button>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[20px] md:text-2xl font-semibold text-white self-start">
              {isMentor ? `Hello, Mentor 👋` : `Hello, Mentee 👋`}
            </h2>
            <p className="hidden xs:block text-sm md:text-xs lg:text-lg text-white">
              Take charge of your goals and maximise your productivity ^_^
            </p>
          </div>
        </div>
        <div
          className="relative flex w-fit min-w-9 flex-col justify-center items-center gap-1"
          ref={dropdownRef}
        >
          <span
            className="cursor-pointer w-auto"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={imgSrc}
              onError={() =>
                handleError(setImgSrc, currentUser?.name?.charAt(0))
              }
              alt="Profile"
              className="h-8 w-8 md:size-7 lg:size-9 rounded-full aspect-square object-cover shadow-inner- ring-2 ring-primary-500 hover:ring-opacity-50 transition-all
"
            />
          </span>
          <span className="hidden sm:flex flex-row justify-center items-center gap-1 md:gap-0 lg:gap-2">
            <p className="text-white font-semibold text-sm md:text-xs lg:text-sm">
              {isMentor ? 'Verified Mentor' : 'Verified Mentee'}
            </p>
            <MdVerified color="#FFFFFF" size={20} />
          </span>
          {dropdownOpen && (
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg py-2 w-40 z-50 ">
              {data.map((item, index) => (
                <button
                  key={index}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={item.action}
                >
                  <span className="flex gap-3">
                    <CustomIcons Icon={item.icon} />
                    <span className="text-base font-semibold">
                      {item.heading}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
