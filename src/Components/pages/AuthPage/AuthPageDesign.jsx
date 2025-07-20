import React from 'react';

const AuthPageDesign = () => {
  return (
    <div className="hidden relative h-full md:flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
      <div className="absolute inset-0 h-full">
        <img
          className="h-full w-full rounded-md object-cover object-top"
          src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2lnbnVwfGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
          alt=""
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e] to-transparent"></div>
      <div className="relative">
        <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
          <h3 className="text-4xl font-bold text-white">
            Check In to the world of Inspiration, either to inspire or get
            inspired
          </h3>
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <li className="flex items-center space-x-3">
              <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#8800ff]">
                <svg
                  className="h-3.5 w-3.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <span className="text-lg font-medium text-white"> Learning </span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#8800ff]">
                <svg
                  className="h-3.5 w-3.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <span className="text-lg font-medium text-white">
                {' '}
                Supporting{' '}
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#8800ff]">
                <svg
                  className="h-3.5 w-3.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <span className="text-lg font-medium text-white"> Growing </span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#8800ff]">
                <svg
                  className="h-3.5 w-3.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <span className="text-lg font-medium text-white"> Earning </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthPageDesign;
