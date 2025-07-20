import React from 'react';
import BgImage from '@/assets/DashboardAssets/Dashboard-bg.png';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ExploreCommunitySection = () => {
  return (
    <>
      <div
        className="h-full flex flex-col p-2 justify-center items-center rounded-lg shadow"
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <a
          href="https://community.curiousdevelopers.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex flex-row gap-1 justify-center items-center flex-wrap">
            <h2 className="font-semibold md:text-xl text-base sm:text-lg text-white">
              Explore Our Engaging Community
            </h2>

            <FaExternalLinkAlt color="#FFFFFF" />
          </span>
        </a>
        <h4 className="text-base font-semibold text-black">
          #LetsGrowAllTogether
        </h4>
      </div>
    </>
  );
};

export default ExploreCommunitySection;
