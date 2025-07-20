import React from 'react';
import { useNavigate } from 'react-router-dom';
// import AppImage from '@/assets/feature-page/App1.png';

const AppImage =
  'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/featuresPage/FeatureMainCP.png';

const TopSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#e6defc] overflow-hidden">
      {/* Curve*/}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden leading-none z-10 bg-[#e6defc]">
        <svg
          viewBox="0 0 224 12"
          className="block w-full h-[32px] mb-[-1px]"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 
               112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 
               224,0 L224,12.0441132 L0,12.0441132 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Content Section */}
      <div className="mx-auto px-4 py-12 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-16">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* Text Block */}
          <div className="max-w-xl text-left text-slate-700 pl-4 sm:pl-6">
            <p className="text-lg font-medium text-purple-800 mb-2">
              ✨ Built For Dreamers
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-purple-800">
              Shape Your Future With a Mentor Who Gets You
            </h2>

            <p className="text-md md:text-lg text-slate-700 mb-8">
              Unlock your potential with personalized guidance, deep
              conversations, and a vibrant network. You’re not just joining a
              platform — you’re joining a movement.
            </p>

            {/* Button */}
            <div>
              <button
                onClick={() => navigate('/')}
                className="relative px-6 py-3 bg-gradient-to-r from-[#a78bfa] to-[#6d28d9] text-white font-semibold rounded-2xl 
             shadow-[0_4px_0_0_#4c1d95] hover:shadow-[0_2px_0_0_#4c1d95] active:translate-y-[2px] active:shadow-[0_1px_0_0_#4c1d95] 
             transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Explore Now
              </button>
            </div>
          </div>

          {/* Image Block */}
          <div className="relative w-full max-w-2xl flex justify-center px-4 sm:px-0">
            <img
              src={AppImage}
              alt="App Illustration"
              className="w-full h-auto max-h-[500px] rounded-xl object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
