import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Inspiration_APP from '../../../../../assets/inspiration_logo.png';
import Socials from '../../../../../assets/socials.png';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6';
import { IoMenu } from 'react-icons/io5';
import { IoArrowBack } from 'react-icons/io5';
import { mentorNavLinks, menteeNavLinks } from './ProfileLeftSidebarData';

const ProfileLeftSidebar = ({ isSidebarOpen, setIsSidebarOpen, isMentor }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeItem, setActiveItem] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (section, id) => {
    setActiveItem(id);
    setIsSidebarOpen(false);
    if (section === 'home') {
      navigate('/dashboard');
    } else {
      navigate(`/dashboard/${section}`);
    }
  };

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const navLinks = isMentor ? mentorNavLinks : menteeNavLinks;

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const section = pathParts[pathParts.length - 1] || 'home';

    const sectionToItemId = {};
    let activeParentId = null;

    navLinks.forEach((item) => {
      if (item.section) {
        sectionToItemId[item.section] = item.id;
      }
      if (item.isDropdown && item.subItems) {
        item.subItems.forEach((subItem) => {
          sectionToItemId[subItem.section] = subItem.id;
          if (subItem.section === section) {
            activeParentId = item.id;
          }
        });
      }
    });

    setActiveItem(sectionToItemId[section] || 'home');
    if (activeParentId) {
      setOpenDropdown(activeParentId);
    } else {
      setOpenDropdown(null);
    }
  }, [location.search, navLinks]);

  return (
    <div>
      <div
        className={`fixed inset-y-0 left-0 z-40 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative w-64 bg-[#ECEAFE] overflow-y-auto`}
      >
        <div className="w-full h-screen pt-4 px-4 flex flex-col">
          <div className="flex  md:ml-0 items-center gap-2 mb-6 md:mb-4 ">
            <div>
              <button
                className={`block md:hidden text-purple-600 bg-white/60 backdrop-blur-sm rounded-full shadow-lg p-2  transition-transform duration-300 `}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? (
                  <IoArrowBack size={15} />
                ) : (
                  <IoMenu size={15} />
                )}
              </button>
            </div>

            <Link to="/">
              <img
                src={Inspiration_APP}
                alt="App Logo"
                className="w-8 h-8 hover:rotate-180 duration-200"
              />
            </Link>
            <Link to="/">
              <span className="text-gray-800 text-xl font-qurova font-medium  whitespace-nowrap">
                inspirationapp
              </span>
            </Link>
          </div>

          <div className="space-y-3 md:space-y-2 flex-grow">
            {navLinks.map((item) => (
              <div key={item.id}>
                <div
                  className={`flex items-center h-10 px-4 mb-[5px] mt-1 ${
                    location.pathname === '/dashboard/create-event' &&
                    activeItem === item.id &&
                    !item.isDropdown
                      ? 'bg-[#FFFFFF] cursor-pointer justify-start border-[1px] border-[#6956E5] rounded-3xl shadow-md shadow-[#b3b3b3] text-[#6956E5] font-medium'
                      : 'hover:bg-purple-200 text-gray-800 group rounded-xl cursor-pointer'
                  }`}
                  onClick={
                    item.isDropdown
                      ? () => handleDropdownToggle(item.id)
                      : () => handleNavigation(item.section, item.id)
                  }
                >
                  <span
                    className={`mr-3 ${
                      activeItem === item.id && !item.isDropdown
                        ? 'text-[#6956E5]'
                        : 'text-gray-600 group-hover:text-[#6956E5]'
                    }`}
                  >
                    <item.icon size={18} />
                  </span>
                  <div className="flex items-center justify-between  w-full">
                    <span
                      className={`text-md whitespace-nowrap ${
                        activeItem === item.id && !item.isDropdown
                          ? 'text-[#6956E5]'
                          : 'text-gray-600 group-hover:text-[#6956E5]'
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.premiumIcon && (
                      <img src={item.premiumIcon} className="w-[15px] " />
                    )}
                  </div>
                  {item.isDropdown && (
                    <span className="ml-auto text-gray-600">
                      {openDropdown === item.id ? (
                        <FaChevronDown size={13} />
                      ) : (
                        <FaChevronRight size={13} />
                      )}
                    </span>
                  )}
                </div>

                {item.isDropdown && openDropdown === item.id && (
                  <div className="ml-6">
                    {item.subItems.map((subItem) => (
                      <div
                        key={subItem.id}
                        className={`pl-4 h-10 flex items-center cursor-pointer ${
                          activeItem === subItem.id
                            ? 'bg-[#FFFFFF] cursor-pointer justify-start border-[1px] border-[#6956E5] rounded-3xl shadow-md shadow-[#b3b3b3] text-[#6956E5] font-medium'
                            : 'hover:text-purple-600 text-gray-600'
                        }`}
                        onClick={() =>
                          handleNavigation(subItem.section, subItem.id)
                        }
                      >
                        {subItem.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white w-full h-[90px] mb-7 flex items-center justify-center pb-2.5 rounded-lg mt-auto">
            <img src={Socials} className="w-[160px] h-[100px]" alt="Socials" />
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ProfileLeftSidebar;
