import React from 'react';

const Card = ({
  imgSrc,
  imgAlt,
  title,
  description,
  buttonText,
  buttonHref,
  buttonIcon,
}) => {
  return (
    <div className="bg-white bg-opacity-25 border border-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 flex items-center justify-center relative transform transition-transform hover:scale-[1.02] hover:bg-opacity-50">
      <div className="flex flex-col items-center justify-center w-full h-full relative max-w-xs">
        {/* Image - shown on all screens but positioned differently */}
        <img
          src={imgSrc}
          alt={imgAlt}
          className="py-3 w-60 h-56 hidden xl:block lg:h-80 xl:absolute xl:top-[-40%] xl:left-1/2 xl:transform xl:-translate-x-1/2"
        />

        {/* Content */}
        <div
          className={`text-center text-white ${imgSrc ? 'xl:mt-[40%]' : ''} p-1 w-full`}
        >
          <div
            style={{ minHeight: '50px' }}
            className="flex items-center justify-center"
          >
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 lg:mb-4">
              {title}
            </h3>
          </div>
          <div
            style={{ minHeight: '100px' }}
            className="flex items-center justify-center"
          >
            <p
              className="text-lg md:text-base overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </p>
          </div>

          <a
            href={buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full max-w-[180px] md:max-w-[200px] text-white bg-indigo-950 rounded-full h-12 md:h-14 mt-3 md:mt-4 mx-auto hover:bg-indigo-900 transition-colors"
          >
            {buttonIcon && <div className="mr-2 md:mr-3">{buttonIcon}</div>}
            <div>
              <div className="text-[11px] md:text-[10px] lg:text-[12px] mb-2">
                {buttonText?.split('\n')[0]}
              </div>
              {buttonText?.split('\n')[1] && (
                <div className="-mt-1 font-sans text-[10px] md:text-[9px] lg:text-[12px] font-semibold ">
                  {buttonText?.split('\n')[1]}
                </div>
              )}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
