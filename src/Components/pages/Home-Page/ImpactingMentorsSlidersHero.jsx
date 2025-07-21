import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { mentors } from '@/Constants/Home-Constants/heroSectionMentor';

// 1. Import Swiper components, modules, and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// The ProfileCard component itself does not need any changes
const ProfileCard = memo(
  ({ name, role, category, profileImage, languages, isActive }) => (
    <motion.div
      initial={{ opacity: 0.4, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.95 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="flex justify-center py-6"
    >
      <div className="w-80 rounded-2xl shadow-xl overflow-hidden font-sans">
        <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-white pt-10 pb-16 flex justify-center relative rounded-t-2xl">
          <div className="absolute top-full -translate-y-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
            <img
              src={profileImage}
              alt={name || 'User'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src =
                  'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/IAP-512-big-circle.png';
              }}
            />
          </div>
        </div>
        <div className="bg-white px-5 pt-14 pb-6 text-center rounded-b-2xl">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
          <p className="text-sm text-gray-600 mt-1">
            Inspire You In{' '}
            <span className="font-bold text-purple-600">{category}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {languages.map((lang, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-xs font-medium rounded-full px-3 py-1 "
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
);

ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  isActive: PropTypes.bool.isRequired,
};

const ImpactingMentorsHero = () => {
  // Swiper is 0-indexed, so we start with 0.
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full -z-10">
      {/* 2. Implement the Swiper component */}
      <Swiper
        // Install the modules you need
        modules={[Autoplay]}
        direction="vertical"
        slidesPerView={3}
        spaceBetween={0} // No space between vertical slides
        loop={true}
        speed={1200}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // Use onSlideChange to update the active index. Use `realIndex` for looped sliders.
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        // Vertical sliders require a fixed height on their container
        className="h-[650px] md:h-[700px]"
      >
        {/* 3. Wrap each card in a SwiperSlide */}
        {mentors.map((mentor, index) => (
          <SwiperSlide key={index}>
            <ProfileCard {...mentor} isActive={index === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImpactingMentorsHero;
