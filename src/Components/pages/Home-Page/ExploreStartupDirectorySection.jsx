import React from 'react';
import rocketImage from '../../../assets/rocket.svg';
import { Link } from 'react-router-dom';
import {
  card_buttons,
  Feature_Cards,
} from '@/Constants/Home-Constants/startup';

const ExploreStartupDirectorySection = () => {
  return (
    <section className="bg-white py-8 md:py-12 lg:py-16 px-4 relative overflow-x-hidden">
      {/* Left Rocket Image - Hidden on medium and small devices */}
      <img
        src={"https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/commonAssets/rocket.webp"}
        alt="Rocket"
        className="hidden lg:block absolute left-[5%] lg:left-0 lg:mt-0 xl:left-[12%] xl:mt-0  top-[27%] lg:top-[21%] xl:top-[27%] w-48 xl:w-[225px] transform rotate-90"
      />
      {/* Right Rocket Image - Hidden on medium and small devices */}
      <img
        src={"https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/commonAssets/rocket.webp"}
        alt="Rocket"
        className="hidden lg:block absolute right-[5%] lg:right-1 lg:mt-0 xl:mt-0 xl:right-[12%] top-[27%] lg:top-[21%] xl:top-[27%] w-48 xl:w-[225px] transform -rotate-360"
      />

      {/* Main Heading Section */}
      <div className="w-full md:w-[95%] lg:w-[85%] xl:w-[90%] mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-h2 xl:text-h1 text-center  mb-4 md:mb-6 font-semibold">
          <span className="text-[#6418C3] font-qurova">
            Your Startup Journey Begins Here
          </span>
        </h1>
        <div className="bg-gradient-to-r from-[#FAF7FF] to-[#F4ECFF] text-[#000000] font-bold w-full xs:w-[95%] sm:w-[85%] md:w-[95%] lg:w-[75%] xl:w-[50%] mx-auto border-2 rounded-3xl border-b-2 border-[#EDE0FF] mt-4 mb-8 md:mb-12 shadow-xl">
          <p className="text-h5 sm:text-xl md:text-2xl lg:text-2xl xl:text-h4 text-center mt-6 md:mt-8 leading-normal px-4 sm:px-6 pt-2 pb-2">
            &quot;Got a dream startup idea or a plan to change the{' '}
            <br className="hidden md:hidden lg:hidden xl:block" />
            world? Let&lsquo;s make it happen!&quot;
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mt-6 mb-6 px-4">
            {card_buttons?.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 text-h6 sm:text-h5 md:text-h6 rounded-[5px] transition duration-300 transform hover:scale-105 hover:shadow-lg shadow-lg"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="flex flex-wrap justify-start xl:justify-center gap-4 px-3 md:gap-6 lg:gap-6 xl:gap-8 w-full md:w-[99%] lg:w-[85%] xl:w-[100%] mx-auto">
        {Feature_Cards?.map((item, index) => (
          <div
            key={index}
            className="w-full min-[500px]:w-[45%] sm:w-[45%] md:w-[45%] lg:w-[48%] xl:w-[40%] xl:max-w-[350px] text-start py-4 bg-[#f6f5f7] hover:bg-gray-100 rounded-xl transition-all duration-300"
          >
            <div className="flex h-full">
              <div className="border-l-4 md:border-l-6 lg:border-l-8 border-[#6F00FF] py-4 md:py-6 pl-4 lg:pl-8 h-full flex flex-col justify-center">
                <h3 className="font-bold text-[#6418C3] text-h6 md:text-lg lg:text-xl">
                  {item.heading}
                </h3>
                <p className="text-h6 md:text-h4 lg:text-lg text-gray-500">
                  {item.para}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreStartupDirectorySection;
