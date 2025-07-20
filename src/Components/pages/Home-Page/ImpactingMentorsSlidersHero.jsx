import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import { mentors } from '@/Constants/Home-Constants/heroSectionMentor';

// eslint-disable-next-line react/display-name
const ProfileCard = memo(
  ({ name, role, category, profileImage, languages, isActive }) => (
    <motion.div
      initial={{ opacity: 0.4, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.95 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="flex justify-center py-6"
    >
      <div className="w-80 rounded-2xl shadow-xl overflow-hidden font-sans">
        {/* Top Section with Soft Gradient */}
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

        {/* Bottom Section with Details */}
        <div className="bg-white px-5 pt-14 pb-6 text-center rounded-b-2xl">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
          <p className="text-sm text-gray-600 mt-1">
            Inspire You In{' '}
            <span className="font-bold text-purple-600">{category}</span>
          </p>

          {/* Language Tags with Purple Border */}
          {/* Language Tags with Neutral Style */}
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
  const [activeIndex, setActiveIndex] = useState(1);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1200,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    vertical: true,
    verticalSwiping: true,
    beforeChange: (current, next) => {
      setActiveIndex(next);
    },
  };

  return (
    <div className="w-full -z-10">
      <Slider {...settings}>
        {mentors.map((mentor, index) => (
          <ProfileCard
            key={index}
            {...mentor}
            isActive={index === activeIndex}
          />
        ))}
      </Slider>
    </div>
  );
};

export default ImpactingMentorsHero;
