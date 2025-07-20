import React from 'react';
import communities from './community-data.js';
import inspiration_logo from '@/assets/inspiration_logo.png';

const StaticCommunityCard = () => {
  return (
    <div>
      {/* community card enhancement */}
      <div className="flex flex-wrap -m-4">
        {/* map function */}
        {communities.map((eachCommunity, index) => (
          // iteration
          <div
            key={index}
            className="flex-wrap xl:w-1/3 md:w-1/2 w-full p-4 bg-transparent"
          >
            {/* each card */}
            <div className=" p-6 rounded-lg h-full shadow-md hover:shadow-lg hover:shadow-[#6F00FF]">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-transparent text-indigo-500 mb-4">
                {/* image */}
                <img
                  src={inspiration_logo}
                  className="w-[40px] h-[40px] bg-[#fcfaff] rounded-full"
                />
              </div>

              {/* community title */}
              <h2 className="text-lg text-gray-900 font-bold title-font mb-2  ">
                {eachCommunity.title}
              </h2>

              {/* community description */}
              <p className="leading-relaxed text-base mb-2  ">
                {eachCommunity.description}
              </p>

              {/* <!-- Responsive Button --> */}
              {/* join link */}
              <a
                href={eachCommunity.join_now}
                className="relative inline-block px-4 py-2 font-medium group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#8800ff] group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-[#8800ff] group-hover:bg-[#8800ff] rounded-lg"></span>
                <span className="relative text-black group-hover:text-white flex items-center justify-center">
                  Join Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6 ml-2 transform rotate-90"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticCommunityCard;
