import React from 'react';

function AboutDesc({ aboutDescription}) {
  
  const [readmore, setReadmore] = React.useState(false);
  return (
    <div>
      <p className="break-words leading-[22px] font-medium text-gray-700 md:pr-10 lg:pr-20">
        {readmore ? aboutDescription : aboutDescription?.substring(0, 300)}
        {!readmore && aboutDescription?.length >= 300 ? '...' : ''}
      </p>

      {aboutDescription?.length > 300 && (
        <button
          className="text-[#9273F8] hover:underline font-medium focus:outline-none"
          onClick={() => setReadmore(!readmore)}
        >
          {readmore ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

export default AboutDesc;
