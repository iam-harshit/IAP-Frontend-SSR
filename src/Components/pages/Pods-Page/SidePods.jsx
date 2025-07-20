
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pods from '@/Constants/pods.js';

const SidePods = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const truncateLabel = (label) => {
    const maxLength =
      windowWidth >= 1280 ? 16 : windowWidth >= 1024 ? 12 : label.length;
    return label.length > maxLength ? label.slice(0, maxLength) + '...' : label;
  };

  const podsToShow = pods.slice(0, 4);

  const handleExploreMore = () => {
    navigate('/pods');
  };

  return (
    <aside className="mt-10 hidden lg:block w-[320px] xl:w-[360px]">
      <div className="space-y-6 xl:space-y-4">
        {podsToShow.map((pod) => (
          <div
            key={pod.key}
            onClick={() => navigate(`${pod.link}`)}
            className="cursor-pointer group bg-gradient-to-r from-[#F5F3FF] to-[#EDE9FE] border border-[#9273F8] rounded-2xl px-6 py-5 flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 scale-[1.01] hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(146,115,200,0.35)] hover:brightness-110 relative overflow-hidden"

          >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#9273F830] blur-sm pointer-events-none" />

            {pod.logo && (
              <img
                src={pod.logo}
                alt={`${pod.label} logo`}
                className="w-14 h-14 object-contain rounded-full border border-[#9273F8] bg-white p-1 z-10"
              />
            )}
            <span className="text-h4  text-[#2D2D2D] z-10">
              {truncateLabel(pod.label)}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={handleExploreMore}
        className="mt-6 w-full bg-[#9273F8] hover:bg-[#7d61f2] text-white text-h5 font-semibold py-3 rounded-xl shadow-md transition-all duration-300 tracking-wide"
      >
        + Explore All Pods
      </button>
    </aside>
  );
};

export default SidePods;
