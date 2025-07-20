import React, { useEffect, useRef, useState } from 'react';


const awards = [
  {
    icon: 'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/homePage/achievements/Startup_India.webp',
    label: 'Startup India',
    title: 'Education Industry & Education Technology',
    year: '2025',
  },
  {
    icon: 'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/homePage/achievements/MSME_M.webp',
    label: 'MSME',
    title: 'Micro, Small, and Medium Enterprises',
    year: '2025',
  },
  {
    icon: 'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/homePage/achievements/National_Emblem.webp',
    label: 'MCA',
    title: 'Ministry Of Corporate Affairs Government Of India',
    year: '2025',
  },
  {
    icon: 'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/homePage/achievements/dpii.webp',
    label: 'DPIIT Approved',
    title: 'Department for Promotion of Industry and Internal Trade',
    year: '2025',
  },
];


const AchievementsSection = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto scroll on mobile only
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isMobile = window.innerWidth < 640;
    if (!isMobile) return;

    const interval = setInterval(() => {
      const next = (currentIndex + 1) % awards.length;
      scrollToIndex(next);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    const card = container.children[index];
    const cardOffset =
      card.offsetLeft - (container.offsetWidth / 2 - card.offsetWidth / 2);
    container.scrollTo({ left: cardOffset, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  return (
    <section className="py-2 pb-10 bg-[#dcd1fb] bg-[radial-gradient(rgba(0,0,0,0.18)_1px,transparent_1px)] bg-[size:20px_20px] text-center px-4">
      <p className="text-[25px] font-normal text-black mb-2 font-futuru flex justify-center items-center">
        Approved By G O I
        <span>
          <img
            // src={National_Emblem}
            src="https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/homePage/achievements/National_Emblem.png"
            alt=""
            className="ml-2 w-[30px] h-[40px]"
          />
        </span>
      </p>
      <h1 className="text-[32px] font-bold font-qurova mb-4 text-[#6418C3]">
        Achievements
      </h1>
      <p className="text-black max-w-3xl mx-auto mb-10 text-sm md:px-[20px] sm:text-base ">
        We are recognized by <strong>Government Of India</strong> for
        <span className="block sm:inline ml-1">
          “Education Technology & Education Industry”
        </span>
      </p>

      {/* Mobile Carousel */}
      <div className="block sm:hidden">
        <div
          ref={containerRef}
          className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory gap-6 px-4 no-scrollbar"
        >
          {awards.map((award, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={index}
                className={`snap-center flex-shrink-0 bg-white rounded-xl w-[270px] p-4 text-left shadow-md transition-all duration-500 ${
                  isActive
                    ? 'scale-100 blur-0 opacity-100 z-10'
                    : 'scale-95 blur-sm opacity-70'
                }`}
              >
                <div className="mb-3">
                  <img
                    loading="lazy"
                    src={award.icon}
                    alt={award.label}
                    className="w-20 h-20 object-contain rounded-md"
                  />
                </div>
                <p className="text-xs font-bold text-purple-600 uppercase mb-1">
                  {award.label}
                </p>
                <h3 className="text-sm font-semibold leading-snug text-black">
                  {award.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2">{award.year}</p>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {awards.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                currentIndex === index ? 'bg-white' : 'bg-gray-500 opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tablet & Desktop Grid */}
      <div className="hidden sm:flex justify-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 text-left shadow-md hover:shadow-lg transition max-w-[260px]"
            >
              <div className="mb-3">
                <img
                  src={award.icon}
                  alt={award.label}
                  className="w-22 h-20 object-contain rounded-md"
                />
              </div>
              <p className="text-xs font-bold text-purple-600 uppercase mb-1">
                {award.label}
              </p>
              <h3 className="text-sm font-semibold leading-snug text-black">
                {award.title}
              </h3>
              <p className="text-xs text-gray-500 mt-2">{award.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
