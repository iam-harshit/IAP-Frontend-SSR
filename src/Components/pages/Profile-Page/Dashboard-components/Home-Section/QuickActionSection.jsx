import React from 'react';
import { Link } from 'react-router-dom';

const QuickActionSection = ({ actions }) => {
  return (
    <div className="flex flex-col p-6 bg-white border-[0.5px] border-[#680AFF] rounded-xl shadow-sm h-full">
      <h1 className="text-h3 font-semibold text-gray-800 mb-6">
        Quick Actions
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {actions && actions?.map((action) => (
          <Link
            to={action?.path}
            key={action?.id}
            className='transition-transform hover:scale-[1.02] focus:scale-[1.02]'
          >
            <div className="w-full h-full flex items-center bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 p-2 sm:p-4 rounded-lg cursor-pointer gap-4 transition-colors">
              <span
                className={`flex-shrink-0 flex justify-center items-center ${action?.iconColor || 'bg-indigo-500'} text-white w-12 h-12 p-3 rounded-full`}
              >
                <action.icon className="w-6 h-6" />
              </span>
              <div className='flex flex-col'>
                <span className='text-gray-700 text-h5 font-semibold'>
                  {action?.title}
                </span>
                <span className='text-gray-500 text-h6'>
                  {action?.description}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-400 ml-auto md:hidden xl:block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActionSection;
