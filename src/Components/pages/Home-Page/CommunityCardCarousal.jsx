// import React from 'react'
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import inspiration_logo from '@/assets/inspiration_logo.png';

function CommunityCarousel({ communities }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 1000, // Set autoplay speed (in milliseconds)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className="community-carousel-container overflow-hidden md:mx-auto"
      style={{ maxWidth: '1400px' }}
    >
      <Slider {...settings}>
        {communities.map((eachCommunity, index) => (
          <div key={index} className="p-5 ">
            {/* entire community card  */}
            <div className="p-6 rounded-2xl h-[350px] border flex flex-row flex-wrap shadow-xl shadow-purple-700 hover:shadow-lg hover:shadow-[#6F00FF]">
              {/* header image */}
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

              {/* title */}
              <div>
                <h2 className="text-lg text-gray-900  font-bold title-font mb-2  ">
                  {eachCommunity.title}
                </h2>

                {/* description */}
                <p className="leading-relaxed text-base mb-2  ">
                  {eachCommunity.description}
                </p>
              </div>

              {/* button */}
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
          </div>
        ))}
      </Slider>
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
