import React, { useState } from 'react';

const PostContent = ({ postText, media }) => {
  const [showFullText, setShowFullText] = useState(false);
  const TEXT_LIMIT = 200;
  const isTextLong = postText && postText.length > TEXT_LIMIT;

  const displayedText =
    isTextLong && !showFullText
      ? postText.substring(0, TEXT_LIMIT) + '...'
      : postText;

  return (
    <>
      <p className="mb-4 whitespace-pre-line text-[14px] md:text-body font-normal ml-[50px] lg:ml-[60px]">
        {displayedText}
        {isTextLong && (
          <button
            onClick={() => setShowFullText(!showFullText)}
            className="text-[#9273F8] hover:underline font-medium ml-1 focus:outline-none"
          >
            {showFullText ? 'Show Less' : 'Show More'}
          </button>
        )}
      </p>

      {media && media.length > 0 && (
        <div className="mb-4 grid grid-cols-1 gap-4 ml-[50px] lg:ml-[60px]">
          {media.map((item, index) =>
            item.type === 'image' ? (
              <img
                key={index}
                src={item.url}
                alt={`media-${index}`}
                className="rounded-md max-h-64 w-full object-cover"
              />
            ) : null
          )}
        </div>
      )}
    </>
  );
};

export default PostContent;
