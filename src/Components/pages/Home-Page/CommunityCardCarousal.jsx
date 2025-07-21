import React from 'react';
import PropTypes from 'prop-types';
import inspiration_logo from '@/assets/inspiration_logo.png';

// 1. Import Swiper components, modules, and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function CommunityCarousel({ communities }) {
  return (
    <div
      className="community-carousel-container overflow-hidden md:mx-auto"
      style={{ maxWidth: '1400px' }}
    >
      {/* 2. Implement the Swiper component */}
      <Swiper
        // Install the modules you need
        modules={[Pagination, Autoplay]}
        spaceBetween={30} // Creates the space between slides
        loop={true}
        speed={1200}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        // The `responsive` array is replaced by the `breakpoints` object
        breakpoints={{
          // when window width is >= 600px
          600: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 1400px (or your default)
          1400: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="pb-12" // Add padding-bottom to make space for the pagination dots
      >
        {/* 3. Wrap each item in a SwiperSlide */}
        {communities.map((eachCommunity, index) => (
          <SwiperSlide key={index}>
            {/* The original card structure can remain, but remove the outer padding div */}
            <div className="p-6 rounded-2xl h-[350px] border flex flex-row flex-wrap shadow-xl shadow-purple-700 hover:shadow-lg hover:shadow-[#6F00FF]">
              <div className="w-10 inline-flex items-center justify-center rounded-full bg-transparent text-indigo-500 mb-4">
                <img
                  src={inspiration_logo}
                  className="w-[40px] h-[40px] bg-[#fcfaff] rounded-full"
                  style={{ transition: 'transform 0.3s ease-in-out' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'rotate(180deg)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'rotate(0deg)')
                  }
                  alt="Community Logo"
                />
              </div>
              <div>
                <h2 className="text-lg text-gray-900 font-bold title-font mb-2">
                  {eachCommunity.title}
                </h2>
                <p className="leading-relaxed text-base mb-2">
                  {eachCommunity.description}
                </p>
              </div>
              <div>
                <a
                  href={eachCommunity.join_now}
                  className="relative inline-block px-4 py-2 font-medium group w-[150px]"
                >
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#8800ff] group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-[#8800ff] group-hover:bg-[#8800ff] rounded-lg"></span>
                  <span className="relative text-black group-hover:text-white flex items-center justify-center">
                    Join Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-6 h-6 ml-2 transform rotate-90"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

CommunityCarousel.propTypes = {
  communities: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      join_now: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CommunityCarousel;
