import React  from 'react';
import { SlPencil } from 'react-icons/sl';
import { getMonthAndYear } from '../../../../../utils/dateConverter';
import companyLogo from '@/assets/Profile-Page/fallbackCompanyLogo.png';

function WorkExpSection({ workData, isCurrentUser, changeSection }) {
 

  

  return (
    <div className="w-full mt-3 md:px-6 pl-6 lg:pl-10 py-5 bg-white border rounded-xl shadow-md">
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-[26px] font-semibold text-gray-800">Experience</h2>
        {isCurrentUser && (
          <button
            onClick={(e) => {
              e.preventDefault();
              changeSection('professional-details');
            }}
            className="p-2 rounded-full hover:bg-customPurple hover:text-white transition-all duration-300 mr-2 md:mr-0"
          >
            <SlPencil className="size-[20px]" />
          </button>
        )}
      </div>

      <div className="grid w-full">
        {[...workData]
          .sort((a, b) => {
            const getComparableDate = (item) =>
              item.endDate === 'Present' || !item.endDate
                ? new Date()
                : new Date(item.endDate);
            return getComparableDate(b) - getComparableDate(a);
          })
          .map((item, index) => {
            
            const logoUrl = item.companyWebsite
  ? `${item.companyWebsite.replace(/\/$/, '')}/favicon.ico`
  : companyLogo
              
console.log(item.companyWebsite)
            return (
              <div
                key={index}
                className="mt-1 md:mt-3 flex items-center justify-between rounded-lg relative"
              >
                <div className="flex items-start gap-4 w-full">
                  <div className="flex flex-col items-center">
                    <div
                      className={`timeline-dot ${index < workData.length - 1 ? 'with-line' : ''}`}
                    >
                      <div className="w-8 h-8 bg-white overflow-hidden z-10 mt-2">
                        <img
                          src={logoUrl}
                          alt={item?.company}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.target.src = companyLogo)}
                        />
                      </div>
                    </div>

                    {index < workData.length - 1 && (
                      <div className="w-[20px] h-20 bg-gray-900 flex-1 mt-1"></div>
                    )}
                  </div>

                  <div
                    className={`mr-4 md:mr-0 flex flex-col md:flex-row md:justify-between items-start w-full pb-4 ${
                      index < workData.length - 1 ? 'border-b border-gray-300' : ''
                    }`}
                  >
                    <div className="flex flex-col mt-2">
                      <h4 className="text-lg font-semibold text-gray-700 max-w-[250px] sm:max-w-[400px] lg:max-w-[400px] whitespace-normal break-words">
                        {item?.title}
                      </h4>

                      <p className="text-sm text-gray-900 opacity-90">
                        {item?.company}
                      </p>
                    </div>

                    <div className="text-[12px] text-gray-500 italic md:mt-2">
                      {getMonthAndYear(item.startDate)?.[0]}{' '}
                      {getMonthAndYear(item.startDate)?.[1]} -{' '}
                      {!item.endDate || item.endDate === 'Present'
                        ? 'Present'
                        : `${getMonthAndYear(item.endDate)?.[0]} ${getMonthAndYear(item.endDate)?.[1]}`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default WorkExpSection;
