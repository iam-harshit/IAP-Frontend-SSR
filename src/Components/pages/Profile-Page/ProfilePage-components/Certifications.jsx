import React from 'react';
import { SlPencil } from 'react-icons/sl';
import certificateLogo from '@/assets/Profile-Page/certificateLogo.png';
const Certifications = ({ userData, isCurrentUser, changeSection }) => {
  return (
    <div className="w-full mt-3 md:px-6 pl-6 lg:pl-10 py-5 bg-white border rounded-xl shadow-md pb-10">
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-h3 text-gray-800 ">Certifications</h2>
        {isCurrentUser && (
          <button
            className="hover:bg-customPurple hover:text-white rounded-full p-2 mr-2 md:mr-0"
            onClick={(e) => {
              e.preventDefault();
              changeSection('about');
            }}
          >
            <SlPencil className="size-[20px]" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-4 pr-6 md:pr-0">
        {userData.certifications?.length > 0 &&
          userData.certifications.map((certificate, index) => {
            const formattedDate = new Date(
              certificate.issueDate
            ).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            });

            return (
              <div
                key={index}
                className={`w-full bg-white flex gap-4 items-start mt-2 md:mt-3 pb-4 ${
                  index !== userData.certifications.length - 1
                    ? 'border-b border-gray-300'
                    : ''
                }`}
              >
                {/* Logo */}
                <div className="w-8 h-8 flex-shrink-0">
                  <img
                    src={certificateLogo}
                    alt={`${certificate.title} Logo`}
                    className="w-full h-full object-contain "
                  />
                </div>

                {/* Certification details */}
                <div className="flex flex-col md:flex-row md:justify-between w-full  md:gap-1">
                  <div className="flex flex-col ">
                    <h4 className="text-lg font-semibold text-gray-700 max-w-[250px] xs2:max-w-[350px] sm:max-w-[400px]  lg:max-w-[400px] xl:max-w-[500px] whitespace-normal break-words">
                      {certificate.title}
                    </h4>
                    <p className="text-sm opacity-90 text-gray-900">
                      {certificate.institution}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-center md:flex-col-reverse gap-1 md:gap-0">
                    <p className="text-[12px] text-gray-500">
                      Issued {formattedDate}
                    </p>
                    {certificate.credentialsURL && (
                      <a
                        href={certificate.credentialsURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm text-blue-600 hover:underline hover:text-blue-500 font-medium"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Certifications;
