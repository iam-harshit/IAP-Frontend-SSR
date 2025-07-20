/* eslint-disable react/no-unknown-property */
import React from 'react';
import { cards } from '../../../Constants/gurukul';

function CardForExploreGurukulSection() {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 p-4 sm:p-5 md:p-5 lg:p-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`w-full xs:w-[90%] sm:w-[60%] md:w-[48%] lg:w-[40%] xl:w-[405px] h-auto min-h-[305px`}
        >
          <div
            className={`group p-4 sm:p-4 md:p-5 lg:p-6 rounded-3xl flex flex-col h-full ${card.bgColor} transition-all duration-300 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] ${card.hoverColor} hover:shadow-[4px_4px_0px_0px_rgba(124,58,253,0.8)] hover:z-10`}
          >
            <h2
              className={`block sm:hidden md:block lg:block xl:block py-0 px-3 sm:px-3 md:px-4 md:py-0 rounded mb-3 sm:mb-3 md:mb-4 self-start text-h3 sm:text-xl md:text-xl lg:text-h2 ${card.headingColor} transition-colors duration-300 font-qurova`}
            >
              {card.title}
            </h2>
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 flex-grow flex-col md:flex-row">
              <div
                className={`w-[60%] xs:w-[55%] sm:w-[30%] md:w-[45%] lg:w-[50%] rounded-lg overflow-hidden shrink-0 transition-all duration-300 p-1`}
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className=" w-full md:w-[55%] lg:w-[50%] flex flex-col lg:flex-row justify-start items-start">
                <h2
                  className={`hidden sm:block md:hidden text-left lg:hidden xl:hidden py-1 px-3 sm:px-3 md:px-4 rounded mb-3 sm:mb-3 md:mb-4 self-start text-h1 sm:text-3xl md:text-xl lg:text-h2 ${card.headingColor} transition-colors duration-300 font-qurova`}
                >
                  {card.title}
                </h2>
                <p
                  className={`text-left text-sm sm:text-base md:text-sm text-[#838383] lg:text-h5 leading-relaxed  transition-colors duration-300`}
                >
                  {card.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardForExploreGurukulSection;
