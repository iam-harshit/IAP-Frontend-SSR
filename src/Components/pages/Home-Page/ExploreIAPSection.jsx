import React from 'react';
import { Link } from 'react-router-dom';
import FeaturesForExploreIAPSection from '@/Components/pages/Home-Page/FeaturesForExploreIAPSection.jsx';

const ExploreIAPSection = () => {
  return (
    <section className="relative pt-10 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-50">
      <div className="relative max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h1 className=" font-qurova mb-4 text-3xl sm:text-4xl md:text-5xl  font-medium tracking-tight">
          <span className="text-[#6418C3]">inspirationapp</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-md sm:max-w-xl mx-auto text-base sm:text-lg text-[#343437] font-normal leading-relaxed px-2 sm:px-0">
          Explore what sets IAP apart. A platform built to empower, connect, and
          elevate every learner.
        </p>

        {/* Buttons */}
        <div className="relative my-6 flex justify-center gap-3 sm:gap-4 flex-wrap">
          <Link
            to="/sign-in"
            className="group flex items-center justify-center ring-none rounded-md sm:rounded-lg shadow-md font-semibold py-2 px-3 sm:px-4 font-dm bg-violet-500 border-b-4 border-b-violet-700 text-white hover:border-0 active:border-0 hover:text-gray-100 active:bg-violet-800 active:text-gray-300 text-sm sm:text-base"
          >
            Join Now
          </Link>

          <a
            href="https://play.google.com/store/apps/details?id=com.cbs.inspirationapp"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center ring-none rounded-md sm:rounded-lg py-2 px-3 sm:px-4 font-dm text-violet-800 border border-violet-500 border-b-4 border-b-violet-400 bg-white hover:text-violet-900 hover:bg-gray-50 active:bg-gray-100 active:text-violet-600 text-sm sm:text-base"
          >
            <svg
              aria-hidden="true"
              className="h-3 w-3 flex-none fill-violet-600 group-active:fill-current"
            >
              <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
            </svg>
            <span className="ml-2 sm:ml-3">Download App</span>
          </a>
        </div>

        {/* Feature Cards */}
        <FeaturesForExploreIAPSection />
      </div>
    </section>
  );
};

export default ExploreIAPSection;
