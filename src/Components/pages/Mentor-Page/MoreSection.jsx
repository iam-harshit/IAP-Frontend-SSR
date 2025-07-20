import { React, useState } from 'react';

const ReadMoreSection = ({ mentor }) => {
  const [readMore, setReadMore] = useState(false);
  const handleToggleReadMore = (event) => {
    event.preventDefault();
    setReadMore(!readMore);
  };
  return (
    <p
      className={`w-full text-md leading-[22px] text-black lg:min-h-[44px] lg:text-md ${!readMore && 'line-clamp-4'}`}
    >
      {readMore ? mentor?.description : mentor?.description?.slice(0, 200)}
      {mentor?.description?.length > 150 && (
        <button
          type="button"
          onClick={handleToggleReadMore}
          className="cursor-pointer px-1.5 text-md font-medium leading-[18px] text-decoration-none text-[#2563eb] underline hover:text-blue-700"
        >
          {readMore ? 'Read Less' : 'Read More'}
        </button>
      )}
    </p>
  );
};

const ShowMoreSection = ({ mentor }) => {
  const [showMore, setShowMore] = useState(false);
  const handleToggleMore = () => {
    event.preventDefault();
    setShowMore(!showMore);
  };
  return (
    <div className="line-clamp-1 flex max-h-[18px] items-start overflow-hidden lg:gap-2">
      <p className="whitespace-nowrap text-sm font-semibold leading-[18px] text-[#1d2939]">
        Targeting Domains:
      </p>
      <div className="line-clamp-1 flex flex-wrap items-center divide-x-[1.4px] divide-[#787979] pl-1 text-md font-normal leading-[18px]">
        {mentor?.targetAudience
          ?.slice(0, showMore ? mentor.targetAudience.length : 2)
          .map((domain, index) => (
            <p
              key={index}
              className="line-clamp-1 px-1 text-xs leading-[18px] lg:px-1"
            >
              <span>{domain}</span>
            </p>
          ))}
        {mentor?.targetAudience?.length > 2 && (
          <button
            type="button"
            onClick={handleToggleMore}
            className="cursor-pointer px-1.5 text-md font-medium leading-[18px] text-decoration-none text-[#2563eb] underline hover:text-blue-700"
          >
            {showMore ? 'Less' : 'More'}
          </button>
        )}
      </div>
    </div>
  );
};

export { ReadMoreSection, ShowMoreSection };
