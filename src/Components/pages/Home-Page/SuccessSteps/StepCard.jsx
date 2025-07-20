import React, { useEffect, useState } from 'react';
import cardArrow from '../../../../assets/Home=Page/Card-Arrow.svg';

const StepCard = ({ step, index, isActive }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    let descTimeout, imageTimeout;

    if (isActive) {
      setShowDescription(false);
      setShowImage(false);

      descTimeout = setTimeout(() => {
        setShowDescription(true);
      }, 500);

      imageTimeout = setTimeout(() => {
        setShowImage(true);
      }, 600);
    } else {
      setShowDescription(true);
      setShowImage(false);
    }

    return () => {
      clearTimeout(descTimeout);
      clearTimeout(imageTimeout);
    };
  }, [isActive]);

  return (
    <div
      className={`group/card sm:h-[460px] md:h-[460px] bg-[#F1EAFF] lg:h-[380px] xl:h-[390px] flex flex-col relative transition-all duration-[1000ms] ${
        isActive ? 'lg:bg-white' : ''
      } border border-gray-300 rounded-2xl overflow-hidden`}
      style={{ boxShadow: `4px 4px 5px 1px  #C395FF` }}
    >
      {/* Step Number */}
      <div className="absolute top-0 left-0 bg-[#C79EFF] w-[130px] h-[70px] flex items-center justify-center rounded-tl-md rounded-br-md z-20">
        <span
          className="text-[#6F00FF] text-h2 font-extrabold"
          style={{
            fontFamily: '"Black Ops One", system-ui',
            fontWeight: 400,
            fontStyle: 'normal',
            textShadow: '2px 2px 4px white',
          }}
        >
          {`0${index + 1}`}
        </span>
      </div>

      {/* Content */}
      <div
        className={` flex flex-col justify-between lg:justify-center px-3 pt-[60px] 
      
    transition-all duration-[1000ms] ease-out ${
      isActive ? 'lg:justify-start lg:pt-[0px] lg:px-[30px]' : ''
    }`}
      >
        <p
          className={`description  text-h4 sm:text-[18px]   text-center mt-[40px] sm:mt-[30px] md:mt-[25px]  ${
            isActive
              ? 'lg:mt-2 xl:mt-1 lg:text-left lg:ml-[110px] xl:ml-[90px] xl:px-5'
              : 'lg:mt-[50px] xl:mt-[70px] xl:px-2'
          } font-semibold transition-opacity duration-1000 ease-in-out ${
            showDescription ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          {step.description}
        </p>

        {/* Image for small screens */}
        <div
          className={`overflow-hidden mt-2 mb-3 lg:hidden md:mx-auto ${
            index === 0
              ? 'h-[90%]  sm:w-[100%] sm:h-[100%] md:w-[90%] md:h-[90%]'
              : index === 3
                ? 'h-[90%] w-[100%] sm:w-[100%] sm:h-[100%] md:h-[80%] md:w-[80%]'
                : 'h-[90%] md:w-[70%] md:h-[70%]'
          }`}
        >
          <img
            src={step.image}
            alt={step.title}
            className="mx-auto object-cover rounded-md"
          />
        </div>

        {/* Image for large screens */}
        <div
          className={`hidden lg:block overflow-hidden relative  mx-auto
          ${
            index === 0
              ? 'w-[90%] h-[90%] llg:w-[80%] llg:h-[80%] xl:w-[75%] xl:h-[75%]'
              : index === 3
                ? 'w-[85%] h-[85%] llg:w-[70%] llg:h-[70%] '
                : 'w-[85%] h-[85%] llg:w-[70%] llg:h-[70%] '
          }
          `}
        >
          <img
            src={step.image}
            alt={step.title}
            className={`object-cover rounded-md transition-opacity duration-1000 ease-in-out ${
              showImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Button and arrow */}
        <div className="group flex items-center justify-between mt-20 pb-3 absolute bottom-0 right-6 transition-all duration-[1000ms] ease-out lg:right-10 lg:bottom-2">
          <button className="px-2 text-[#6F00FF] text-sm font-bold rounded duration-500 text-h4">
            {step.buttonText}
          </button>
          <img
            src={cardArrow}
            alt="card-arrow"
            className="w-[25px] transition-transform duration-500 ease-in-out group-hover:translate-x-2"
          />
        </div>
      </div>
    </div>
  );
};

export default StepCard;
