/* eslint-disable react/prop-types */
import start_icon from '@/assets/blogs/star_icon.svg';
import React from 'react'

const BlogHero = ({ setShowModal, setIsSearchOpen }) => {
  return (
    <section className="text-center mb-8 md:mb-12 bg-[#F7F0FD] w-full py-8 md:py-12 px-4 relative z-20">
      <div className="flex items-center justify-center -mt-4 -pt-2 gap-2 mb-5 md:mb-5">
        <img src={start_icon} alt="" className="w-4 h-4 md:w-5 md:h-5" />
        <p className="text-xs md:text-caption text-[#B06BEE] font-bold">FEATURED CONTENT</p>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-[57.3px] font-bold text-[#242A39] relative z-20 tracking-wider sm:tracking-normal">
        Explore Insightful
      </h1>
      <p className="text-4xl sm:text-5xl md:text-[57.3px] font-bold text-[#7e22ce] mb-6 md:mb-8 relative z-20">
        Blogs
      </p>
      <div className="flex justify-center">
        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto xs:mx-8 mb-3 md:mb-4 relative z-20">
          Read stories, insights, and ideas driving the next wave of web
          innovation. From web development to emerging trends — fuel the
          curiosity here.
        </p>
      </div>
      <div className="flex sm:flex-row justify-center items-center gap-4 sm:gap-5 py-3 md:py-5 relative z-20">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#9333EA] hover:bg-[#7e22ce] rounded-md text-white py-2 px-6 md:py-3 md:px-8 transition-colors flex items-center gap-2 text-sm md:text-base"
        >
          <span>Create Blog</span>
        </button>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="bg-white hover:bg-[#9333EA] hover:text-white text-[#9333EA] border border-[#9333EA] rounded-md py-2 px-6 md:py-3 md:px-8 transition-colors flex items-center gap-2 text-sm md:text-base"
        >
          <span>Search</span>
        </button>
      </div>
      <div className="mt-1 md:mt-8 pt-6 md:pt-8">
        <div className="flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 lg:gap-12 text-sm md:text-base">
            <li className="flex gap-2 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 text-[#9333EA]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg> Weekly Updates
            </li>
            <li className="flex gap-2 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 text-[#9333EA]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>Expert Authors
            </li>
            <li className="flex gap-2 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 text-[#9333EA]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>In-depth Analysis
            </li>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogHero