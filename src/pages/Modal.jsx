import React, { useEffect, useState } from 'react';
import { CiFileOn } from 'react-icons/ci';
import { MdOutlineFileUpload } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Modal = ({ isOpen, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 10);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  // Media queries for different screen sizes
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1023px)',
  });
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  // If the modal is not open, return null (don't render anything)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Modal content */}
      <div
        className={`relative bg-gray-100 rounded-2xl shadow-lg transform transition-transform duration-600 ease-out ${
          showModal ? 'scale-100' : 'scale-95'
        } ${
          isDesktop
            ? 'w-full max-w-screen-lg p-10'
            : 'w-full max-w-screen-sm md:max-w-screen-md p-3 md:p-8'
        }`}
        style={{ boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)' }}
      >
        {/* Modal header */}
        <h2
          className={`text-xl ${isTablet ? 'text-xl' : ''} ${
            isDesktop ? 'text-3xl' : ''
          } text-center  -800 mb-2`}
        >
          What would you like to do next?
        </h2>
        <p
          className={`text-base ${isTablet ? 'text-lg' : ''} ${
            isDesktop ? 'text-xl' : ''
          } text-center   mb-6`}
        >
          Boost your profile to attract employers!
        </p>

        {/* Modal options */}
        <div
          className={`flex flex-col ${
            isDesktop ? 'lg:flex-row lg:space-x-6 lg:space-y-0' : 'space-y-4'
          } justify-center items-center`}
        >
          {/* Card for create resume */}
          <Link
            to={'/resume_builder_home'}
            className={`relative inline-block text-center w-full md:w-60 lg:w-64 p-3 md:p-4 rounded-xl shadow-lg transition-transform transform hover:shadow-xl hover:bg-[#8800ff] hover:text-white hover:-translate-y-1 duration-300 ${
              isDesktop ? 'w-72' : ''
            }`}
          >
            <div className="flex flex-col items-center">
              <CiFileOn
                className={`text-3xl ${isDesktop ? 'text-5xl' : 'text-4xl'} mb-3 hover:text-white animate__animated animate__bounceIn animate__slower animate__infinite`}
              />
              <h3
                className={`text-sm ${isTablet ? 'text-base' : ''} ${isDesktop ? 'text-xl' : ''}  `}
              >
                Create Resume
              </h3>
              <p
                className={`text-xs ${isTablet ? 'text-sm' : ''} ${isDesktop ? 'text-base' : ''} mt-2 hover:text-white`}
              >
                Start with a blank template. <br /> We'll guide you step by
                step.
              </p>
            </div>
          </Link>

          {/* Card for upload resume */}
          <Link
            to="#"
            className={`relative inline-block text-center w-full md:w-60 lg:w-64 p-3 md:p-4 rounded-xl shadow-lg transition-transform transform hover:shadow-xl hover:bg-[#8800ff] hover:text-white hover:-translate-y-1 duration-300 ${
              isDesktop ? 'w-72' : ''
            }`}
          >
            <div className="flex flex-col items-center">
              <MdOutlineFileUpload
                className={`text-3xl ${isDesktop ? 'text-5xl' : 'text-4xl'} mb-3 animate__animated animate__bounceIn animate__slower animate__infinite`}
              />
              <h3
                className={`text-sm ${isTablet ? 'text-base' : ''} ${isDesktop ? 'text-xl' : ''}  `}
              >
                Upload Resume
              </h3>
              <p
                className={`text-xs ${isTablet ? 'text-sm' : ''} ${isDesktop ? 'text-base' : ''} mt-2`}
              >
                Upload your existing resume to improve it & make it more better.
              </p>
            </div>
          </Link>

          {/* Card for edit manually */}
          <Link
            to={'/profile/background-details'}
            className={`relative inline-block text-center w-full md:w-60 lg:w-64 p-3 md:p-4 rounded-xl shadow-lg transition-transform transform hover:shadow-xl hover:bg-[#8800ff] hover:text-white hover:-translate-y-1 duration-300 ${
              isDesktop ? 'w-72' : ''
            }`}
          >
            <div className="flex flex-col items-center">
              <FaRegEdit
                className={`text-3xl ${isDesktop ? 'text-5xl' : 'text-4xl'} mb-3 animate__animated animate__bounceIn animate__slower animate__infinite`}
              />
              <h3
                className={`text-sm ${isTablet ? 'text-base' : ''} ${isDesktop ? 'text-xl' : ''}  `}
              >
                Edit Manually
              </h3>
              <p
                className={`text-xs ${isTablet ? 'text-sm' : ''} ${isDesktop ? 'text-base' : ''} mt-2`}
              >
                Manually edit your profile information step by step.
              </p>
            </div>
          </Link>
        </div>

        <div className="flex justify-center mt-6">
          <div
            className="relative inline-flex items-center justify-center px-20 md:px-24 lg:px-28 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-lg shadow-md group"
            onClick={onClose}
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#6F00FF] group-hover:translate-x-0 ease">
              <span className="flex items-center">Enjoy Our Project </span>
              <svg
                className={`w-8 ${isTablet ? 'w-10' : ''} ${isDesktop ? 'w-12' : ''} h-6`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full font-bold text-[#6F00FF] transition-all duration-300 transform group-hover:translate-x-full ease">
              Skip for Now
            </span>
            <span className="relative invisible">Skipping</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
