import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import arrow from '@/assets/Home=Page/Arrow.png';
import steps from '@/Constants/SuccessSteps.js';
import StepCard from './StepCard.jsx';

const IAPOnboardingStepsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const handleMouseEnter = (index) => {
    if (window.innerWidth >= 1024) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setHoveredIndex(0);
    }
  };

  return (
    <section className="relative max-w-[1440px] mx-auto xl:px-[100px] lg:px-[50px] px-4 sm:px-6 overflow-hidden">
      <div className="flex items-center justify-center sm:justify-between sm:px-3 md:px-5 lg:px-0">
        <h2 className="text-h2 xs2:text-h1 sm:text-[40px] md:text-[45px] lg:text-[55px] text-center sm:text-left text-[#6418C3] font-qurova">
          Growth Steps 🏆
        </h2>
        <img
          src={arrow}
          loading="lazy"
          alt="arrow"
          className="hidden sm:block sm:w-[100px] md:w-[130px] lg:w-[150px]"
        />
      </div>

      <div className="flex lg:flex-nowrap flex-wrap justify-center gap-10 lg:gap-3 mt-9 pb-4 w-full mx-auto">
        {steps.map((step, index) => {
          const isActive = hoveredIndex === index;
          const Wrapper = step.link.startsWith('http') ? 'a' : Link;
          const linkProps = step.link.startsWith('http')
            ? { href: step.link, target: '_blank', rel: 'noopener noreferrer' }
            : { to: step.link };

          return (
            <div
              key={index}
              className={`
    transition-[flex-basis] duration-[1000ms] ease-in-out
    w-[350px]  sm:w-[45%] 
    ${isActive ? 'lg:basis-[60%]  ' : 'lg:basis-[30%] '}
    lg:flex-shrink lg:flex-grow
    group
  `}
              onMouseEnter={() => index !== 0 && handleMouseEnter(index)}
              onMouseLeave={() => index !== 0 && handleMouseLeave()}
            >
              <Wrapper {...linkProps} className="no-underline block h-full">
                <StepCard step={step} index={index} isActive={isActive} />
              </Wrapper>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default IAPOnboardingStepsSection;
