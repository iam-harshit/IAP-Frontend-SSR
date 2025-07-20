import Inspiration_APP from '@/assets/inspiration_logo.png';
import '@/App.css';
import { useEffect, useState, useRef } from 'react';
import { FaChevronDown, FaPlus } from 'react-icons/fa6';
import { LuMenu } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { menuItems } from '@/Constants/menus_payload';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { QuickBox } from '@/Components/common/Quickbox';
import { FaUserShield } from 'react-icons/fa';
import { handleLogoutApi } from '@/services/Operations/AuthenticationOperation/AuthenticationApi';
import { handleError } from '../../../utils/profileImageFallback';
import { FiSearch } from 'react-icons/fi';
import { IoLogoGooglePlaystore } from 'react-icons/io5';

export default function Header({ onSearchClick }) {
  const mainMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const joinDropdownRef = useRef(null);
  const mobileJoinDropdownRef = useRef(null);
  const profileToggleRef = useRef(null);
  const profileToggleRefMobile = useRef(null);

  // Extract the currently authenticated user from Redux state
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [showJoinDropdown, setShowJoinDropdown] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [imgSrc, setImgSrc] = useState(currentUser?.profilePicture);
  const [rotation, setRotation] = useState(0);
  const [direction, setDirection] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const searchResultsRef = useRef(null);

  // Rotates the logo when hovered by toggling the direction each time
  const handleHover = () => {
    setRotation((prev) => prev + (direction ? 360 : -360));
    setDirection(!direction);
  };

  if (!imgSrc) {
    handleError(setImgSrc, currentUser?.name?.charAt(0));
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (mainMenuRef.current && !mainMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setShow(false);
      }
      if (
        joinDropdownRef.current &&
        !joinDropdownRef.current.contains(event.target)
      ) {
        setShowJoinDropdown(false);
      }
      if (
        mobileJoinDropdownRef.current &&
        !mobileJoinDropdownRef.current.contains(event.target)
      ) {
        setShow(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!profileToggleRef.current ||
          !profileToggleRef.current.contains(event.target)) &&
        (!profileToggleRefMobile.current ||
          !profileToggleRefMobile.current.contains(event.target))
      ) {
        setShow(false);
      }
    }

    function handleScroll() {
      setShow(false);
      setShowJoinDropdown(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // This effect calculates and sets the scroll progress value used to update the scroll progress bar at the top
  useEffect(() => {
    const progressBarHandler = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScroll(scroll);
    };

    window.addEventListener('scroll', progressBarHandler);
    return () => window.removeEventListener('scroll', progressBarHandler);
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Menu options for logged-in users (Dashboard, Profile, Logout)
  const data = [
    {
      heading: 'Dashboard',
      icon: 'MdDashboardCustomize',
      action: () => navigate(`/dashboard`),
    },
    {
      heading: 'Logout',
      icon: 'MdLogout',
      action: async () => {
        await handleLogoutApi(dispatch);
        setShow(false);
      },
    },
  ];

  if (location.pathname !== '/profile') {
    data.splice(1, 0, {
      heading: 'Profile',
      icon: 'FaUserCircle',
      action: () => navigate(`/profile`),
    });
  }

  if (location.pathname === '/profile') {
    data.unshift({
      heading: 'Home',
      icon: 'IoHome',
      action: () => navigate(`/`),
    });
  }

  const authData = [
    {
      heading: 'Sign up',
      icon: 'FaUserGraduate',
      action: () => navigate('/sign-up'),
    },
    {
      heading: 'Sign in',
      icon: 'HiOutlineLogin',
      action: () => navigate('/sign-in'),
    },
  ];

  return (
    <div className="sticky top-0 z-[100] bg-white bg-opacity-100 border backdrop-blur-2xl w-full py-1 mx-auto shadow-2 rounded-xl">
      <div className="relative mx-auto flex max-w-[1480px] items-center justify-between px-2 py-2 sm:px-6 lg:px-8">
        {/* This section renders the rotating logo, which acts as a link back to the home page */}
        <div className="inline-flex items-center md:space-x-2">
          <span className="overflow-hidden">
            <Link to="/">
              <img
                src={Inspiration_APP}
                onMouseEnter={handleHover}
                style={{ transform: `rotate(${rotation}deg)` }}
                className="cursor-pointer w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] transition-transform duration-700"
                alt="Header logo"
              />
            </Link>
          </span>
          <Link to="/">
            {/* <span className="hover:text-[#8800ff] lg:text-[17px] xl:text-[19px] font-qurova font-[300] text-black text-base">
              inspirationapp
            </span> */}
            <h1 className="text-2xl font-qurova font-[500]">inspirationapp</h1>
          </Link>
        </div>

        {/* Desktop navigation menu */}
        <div className="hidden lg:block">
          <ul className="inline-flex lg:space-x-4 xl:space-x-8 font-medium">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="transition-colors duration-200 hover:text-[#8800ff] lg:text-[12px]  xl:text-[17px] font-[450] text-gray-800 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-[#8800ff] before:rounded-md before:transition-all before:duration-300 hover:before:w-full"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop profile or Join Now button */}
        <div className="hidden lg:flex gap-3">
          <button onClick={onSearchClick} className="mt-1">
            <FiSearch size="25" />
          </button>
          <a
            href="https://play.google.com/store/apps/details?id=com.cbs.inspirationapp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex text-[12px] xl:text-[15px] font-medium text-white gap-1 bg-gradient-to-r from-violet-500 to-purple-500 lg:px-2 xl:px-3 rounded-full py-1"
          >
            <div className="flex text-[12px] xl:text-[15px] font-medium text-white gap-1 bg-gradient-to-r from-violet-500 to-purple-500 lg:px-2 xl:px-3 rounded-full py-1">
              <button>Download App</button>
              <div className="flex justify-center items-center">
                <IoLogoGooglePlaystore />
              </div>
            </div>
          </a>
          <div className="flex gap-2 ">
            {currentUser ? (
              <div>
                <div
                  ref={profileToggleRefMobile}
                  className="relative w-full h-full flex justify-center items-center"
                >
                  <div
                    onClick={() => setShow(!show)}
                    className="cursor-pointer relative"
                  >
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt="profile"
                        className="h-8 w-8 rounded-full object-cover cursor-pointer inline-block"
                        onError={() =>
                          handleError(setImgSrc, currentUser?.name?.charAt(0))
                        }
                      />
                    ) : (
                      <FaUserShield className="h-8 w-8" />
                    )}
                    <FaChevronDown className="absolute bottom-[-8%] right-[-18%] bg-gray-200 h-3 w-4 rounded-full bg-opacity-60" />
                  </div>

                  {show && (
                    <div
                      ref={dropdownRef}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <QuickBox Options={data} side={'right'} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex" ref={joinDropdownRef}>
                <div
                  onClick={() => setShowJoinDropdown(!showJoinDropdown)}
                  className="relative  flex items-center justify-center  rounded-full px-3 lg:py-4 xl:py-5 cursor-pointer text-[12px] xl:text-[15px] h-8 font-medium text-white border-2 bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500 hover:bg-[length:150%_150%]"
                >
                  Join Now
                  <FaPlus className="ml-3 inline-block h-[17px] w-[17px] border-2 border-white rounded-full p-[1px]" />
                  {showJoinDropdown && (
                    <div onMouseDown={(e) => e.stopPropagation()}>
                      <QuickBox Options={authData} side={'left'} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* This block handles the mobile header view, including join/profile buttons and menu toggle */}
        <div className="lg:hidden flex gap-2 items-center">
          <button onClick={onSearchClick} className="mt-[1px]">
            <FiSearch size="22" />
          </button>
          {/* <div className="flex text-[12px] xl:text-[15px] font-medium text-white md:gap-1 bg-gradient-to-r from-violet-500 to-purple-500 px-1 py-[2px] md:px-2 md:py-2 rounded-full">
            <button>Download App</button>
            <div className="flex justify-center items-center text-base">
              <IoLogoGooglePlaystore />
            </div>
          </div> */}
          {!currentUser && (
            <div
              type="button"
              onClick={() => setShow(!show)}
              className="relative flex justify-center cursor-pointer items-center mr-1 rounded-lg px-2 py-1 text-[12px] h-8 font-normal border-2 border-black"
              ref={mobileJoinDropdownRef}
            >
              Join{' '}
              <FaPlus className="inline-block h-[14px] w-[14px] border-2 border-black rounded-full p-[1px] ml-1" />
              {show && (
                <div onMouseDown={(e) => e.stopPropagation()}>
                  <QuickBox Options={authData} side={'right'} />
                </div>
              )}
            </div>
          )}
          {currentUser && (
            <div
              ref={profileToggleRef}
              className="relative flex justify-center items-center gap-1"
            >
              <div
                onClick={() => setShow(!show)}
                className="cursor-pointer relative mr-1"
              >
                <img
                  src={imgSrc}
                  onError={() =>
                    handleError(setImgSrc, currentUser?.name?.charAt(0))
                  }
                  alt="profile"
                  className="h-6 w-6 rounded-full object-cover cursor-pointer inline-block"
                />
                <FaChevronDown className="absolute bottom-[-8%] right-[-18%] bg-gray-200 h-3 w-3 rounded-full bg-opacity-60" />
              </div>
              {show && (
                <div onMouseDown={(e) => e.stopPropagation()}>
                  <QuickBox Options={data} side={'right'} />
                </div>
              )}
            </div>
          )}
          {isMenuOpen ? (
            <RxCross2
              onClick={toggleMenu}
              className="h-6 w-6 cursor-pointer text-black mr-1"
            />
          ) : (
            <LuMenu
              onClick={toggleMenu}
              className="h-6 w-6 cursor-pointer text-black mr-1"
            />
          )}
        </div>

        {/* Mobile menu drawer */}
        {isMenuOpen && (
          <div
            ref={mainMenuRef}
            className="absolute mt-6 inset-x-0 top-10 z-[99999] origin-top-right transform p-2 transition lg:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-4">
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* This renders the scroll progress bar that updates based on how far the user has scrolled down */}
        {/* <div id="progressBarContainer" className="mt-2">
          <div
            id="progressBar"
            style={{
              transform: `scale(${scroll}, 1)`,
              opacity: `${scroll}`,
              background: `linear-gradient(50deg, blue 0%, blue ${scroll * 100}%, transparent ${scroll * 100}%, transparent 100%)`,
            }}
          />
        </div> */}
      </div>
    </div>
  );
}
