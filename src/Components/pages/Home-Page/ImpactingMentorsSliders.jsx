import React from 'react';

// 1. Import Swiper React components, modules, and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Your existing imports and ProfileCard component remain the same
import arrow from '@/assets/Home=Page/arrow.svg';
import CountUp from 'react-countup';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoIosStarOutline } from 'react-icons/io';
import { CiCalendar } from 'react-icons/ci';

// The ProfileCard component does not need any changes.
const ProfileCard = ({
  name,
  role,
  experience,
  rating,
  reviews,
  sessions,
  coverImage,
  profileImage,
  languages,
}) => {
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <div className="border border-[#E0E0E0] rounded-[16px] shadow-md bg-white m-[5px] overflow-hidden font-sans w-[300px] h-full">
        <div
          className="h-[90px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${coverImage})`,
          }}
        ></div>

        <div className="relative text-center mt-[-45px]">
          <div className="bg-white border-[3px] border-[#9B51E0] rounded-full overflow-hidden w-[100px] h-[100px] mx-auto shadow-lg">
            <img src={profileImage} alt="Profile" className="w-full h-full" />
          </div>
          <div className="absolute top-[-36px] left-[8px] text-white">
            <span className="flex justify-start items-center gap-1 p-1 ">
              <div className="border-[1px] border-[#8800ff] p-2 rounded-full shadow-1 shadow-[#8800ff] bg-slate-50">
                <FaCircleCheck className="text-[#8800ff] text-xs" />
              </div>
              <p className="font-sans text-xs font-bold">Verified Mentor</p>
            </span>
          </div>
        </div>

        <div className="text-center py-[2px] px-[15px]">
          <h3 className="text-[18px] text-[#333] font-semibold my-[8px] mb-[4px]">
            {name}
          </h3>
          <p className="text-[14px] text-[#666] my-[4px]">{role}</p>
          <p className="flex items-center justify-center gap-1 text-[12px] text-[#9B51E0] my-[4px]">
            <span>
              <CiCalendar className="text-lg" />
            </span>
            <span> {experience} years of Experience</span>
          </p>
        </div>

        <div className="flex justify-around py-[2px] ">
          <div className="text-center">
            <p className="flex items-center justify-center gap-1 text-[#9B51E0] text-[16px] font-semibold">
              <span>
                <IoIosStarOutline />
              </span>
              <span>{rating}</span>
            </p>
            <p className="text-[12px] text-[#666]">Rating</p>
          </div>
          <div className="text-center">
            <p className="text-[#9B51E0] text-[16px] font-semibold">
              <CountUp start={0} end={reviews} duration={7.5} />
            </p>
            <p className="text-[12px] text-[#666]">Reviews</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p className="text-[#9B51E0] text-[16px] font-semibold">
              <CountUp start={0} end={sessions} duration={7.5} />
            </p>
            <p className="text-[12px] text-[#666]">Sessions</p>
          </div>
        </div>

        <div className="flex justify-center py-[12px] bg-white">
          {languages.map((language, index) => (
            <span
              key={index}
              className="border bg-[#f4f4f4] text-[#4A4A4A] rounded-full lg:py-[4px] px-[7px] lg:px-2 m-[6px] text-[11px] font-medium transition-colors duration-300"
            >
              {language}
            </span>
          ))}
        </div>

        <div className="text-center pb-[10px]">
          <button className="bg-gradient-to-r from-[#5da8ff]/90 via-[#605dff] to-[#ad63f6]/80 bg-[length:100%_100%] transition-all duration-500 ease-in-out hover:bg-[length:150%_150%] py-[7px] px-[29px] border-0 rounded-[20px] cursor-pointer font-semibold text-white shadow-3-strong">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// Renamed the main component for clarity
const ImpactingMentorsSlider = () => {
  return (
    // Add `relative group` classes to the container for custom arrow positioning
    <div className="w-[100%] sm:w-[90%] md:w-[100%] xl:w-[90%] mx-auto relative group">
      <h2 className="text-center text-3xl sm:text-4xl mb-4 font-extrabold text-gray-800 mt-2 ">
        Impacting Mentors
      </h2>

      {/* 2. Implement the Swiper component */}
      <Swiper
        // Install the modules you need
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20} // Space between slides
        loop={true}
        speed={700}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        // Tell Swiper to use our custom buttons via their class names
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        // Swiper uses the 'breakpoints' object for responsiveness
        breakpoints={{
          500: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1350: { slidesPerView: 4 },
        }}
        className="pb-12" // Add padding-bottom for pagination dots
      >
        {/* 3. Wrap each item in a <SwiperSlide> component */}
        <SwiperSlide>
          <ProfileCard
            name="Ishita"
            role="Software Engineer at Google"
            experience="7+"
            rating="4.8"
            reviews={20}
            sessions={300}
            coverImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtkR7Lv-42JtJcdbo_-IUc7ZeHSPAamDTPVw&s"
            profileImage="https://xsgames.co/randomusers/assets/avatars/male/2.jpg"
            languages={['English', 'JavaScript', 'React']}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProfileCard
            name="John Doe"
            role="Senior Developer at Amazon"
            experience="5+"
            rating="3.2"
            reviews={50}
            sessions={200}
            coverImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtkR7Lv-42JtJcdbo_-IUc7ZeHSPAamDTPVw&s"
            profileImage="https://xsgames.co/randomusers/assets/avatars/male/2.jpg"
            languages={['English', 'Python', 'Django']}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProfileCard
            name="Jane Smith"
            role="Product Manager at Netflix"
            experience="6+"
            rating="4.9"
            reviews={70}
            sessions={250}
            coverImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtkR7Lv-42JtJcdbo_-IUc7ZeHSPAamDTPVw&s"
            profileImage="https://xsgames.co/randomusers/assets/avatars/male/2.jpg"
            languages={['English', 'Spanish']}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProfileCard
            name="Jane Smith"
            role="Product Manager at Netflix"
            experience="12+"
            rating="4.4"
            reviews={50}
            sessions={400}
            coverImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtkR7Lv-42JtJcdbo_-IUc7ZeHSPAamDTPVw&s"
            profileImage="https://xsgames.co/randomusers/assets/avatars/male/2.jpg"
            languages={['English', 'Spanish', 'Python']}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProfileCard
            name="Jane Smith"
            role="Product Manager at Netflix"
            experience="6+"
            rating="5"
            reviews={200}
            sessions={500}
            coverImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtkR7Lv-42JtJcdbo_-IUc7ZeHSPAamDTPVw&s"
            profileImage="https://xsgames.co/randomusers/assets/avatars/male/2.jpg"
            languages={['English', 'Spanish', 'Java']}
          />
        </SwiperSlide>
      </Swiper>

      {/* 4. Create your custom navigation buttons outside the Swiper component */}
      <div className="swiper-button-prev-custom absolute top-1/2 left-1 transform -translate-y-1/2 bg-white shadow-md rounded-full ml-0 xl:-ml-10 p-2 cursor-pointer z-10 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity">
        <img src={arrow} className="w-3 h-3 sm:w-5 sm:h-5" alt="Previous" />
      </div>
      <div className="swiper-button-next-custom absolute top-1/2 right-1 transform -translate-y-1/2 bg-white text-gray-800 shadow-md rounded-full mr-0 xl:-mr-10 p-2 cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <img src={arrow} className="w-3 h-3 sm:w-5 sm:h-5" alt="Next" />
      </div>
    </div>
  );
};

export default ImpactingMentorsSlider;
