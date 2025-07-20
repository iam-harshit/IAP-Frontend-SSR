import React from 'react';
import { Link } from 'react-router-dom';
import aiimage from '@/assets/aiimage.png';
import { IoCheckbox } from 'react-icons/io5';
import { HiSparkles } from 'react-icons/hi2';

function ExploreChaturAISection() {
  return (
    <div className="relative bg-white  px-4">
      {/* Heading */}
      <div className="w-full text-center pt-10">
        <h1 className="text-4xl sm:text-5xl font-semibold text-[#6418C3] font-qurova">
          Discover Chatur - Your AI Mentor
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mt-2">
          Enhance your learning experience with real-time assistance and
          personalized guidance.
        </p>
      </div>

      {/* Main Content */}
      <main className="grid w-full place-items-center relative bg-white min-h-[900px] sm:min-h-[700px] md:min-h-[700px]">
        {/* Bottom Rotated Card */}
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[90%] max-w-6xl -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-2xl bg-purple-300 "></div>

        {/* Top Card */}
        <div className="absolute left-1/2 top-1/2 w-[90%] max-w-6xl h-auto min-h-[20rem] sm:min-h-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#f2e9ff] p-4 sm:p-6 md:p-10 ">
          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center gap-8 h-full">
            {/* Left Image */}
            <div className="flex-shrink-0">
              <img
                src={"https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/homePage/askMentor/aiimage.webp"}
                alt="AI visual"
                className="h-48 sm:h-56 md:h-72 w-auto object-contain"
              />
            </div>

            {/* Right Content */}
            <div className="md:text-left space-y-4 w-full">
              <h2 className="text-2xl font-bold text-gray-800">
                Chatur — Your AI Companion
              </h2>
              <p className="text-gray-700 text-base pr-16 pb-5">
                Chatur is your smart AI assistant built with inspiration.
              </p>

              {/* Feature Points in 2 Columns */}
              <div className="pr-8 grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 text-gray-700 text-sm sm:text-base">
                <div className="flex items-start gap-2">
                  <IoCheckbox className="w-6 h-6 flex-shrink-0 text-customColor" />
                  <span className="text-sm sm:text-base font-bold">
                    Instant real-time answers to your questions
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <IoCheckbox className="w-6 h-6 flex-shrink-0 text-customColor" />
                  <span className="text-sm sm:text-base font-bold">
                    Personalized guidance based on your goals
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <IoCheckbox className="w-6 h-6 flex-shrink-0 text-customColor" />
                  <span className="text-sm sm:text-base font-bold">
                    Boost your productivity and clarity
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <IoCheckbox className="w-6 h-6 flex-shrink-0 text-customColor" />
                  <span className="text-sm sm:text-base font-bold">
                    24/7 availability to assist you{' '}
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/ask-chatur"
                  className="inline-flex items-center px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-customColor transition"
                >
                  Try Chatur Now <HiSparkles className="ml-2 text-xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ExploreChaturAISection;
