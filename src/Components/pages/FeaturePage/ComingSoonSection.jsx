import React from 'react';

const comingSoonFeatures = [
  {
    img: 'https://cdn-icons-png.freepik.com/128/11921/11921258.png',
    title: 'Mentor Matching',
    description:
      "We'll connect you with mentors who understand your path and goals.",
  },
  {
    img: 'https://cdn-icons-png.freepik.com/128/7514/7514355.png',
    title: 'Learn and Earn',
    description:
      'Earn real rewards while growing your skills — learning has never felt this motivating.',
  },
  {
    img: 'https://cdn-icons-png.freepik.com/128/8855/8855547.png',
    title: 'Referral Program',
    description:
      'Let your skills open doors. Get referred to leading companies through us.',
  },
  {
    img: 'https://cdn-icons-png.freepik.com/128/14274/14274263.png',
    title: 'Webinars & Workshops',
    description:
      'Access exclusive sessions from top professionals across industries.',
  },
  {
    img: 'https://cdn-icons-png.freepik.com/128/11160/11160479.png',
    title: 'Startup Directory',
    description:
      'Explore a curated portal of startups, jobs, and rising opportunities.',
  },
];

function ComingSoonSection() {
  const Card = ({ img, title, description }) => (
    <div className="bg-white rounded-3xl p-6 text-gray-800 shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 w-full max-w-sm border-t-[6px] border-purple-300">
      <div className="flex justify-center mb-5">
        <img
          src={img}
          alt={title}
          className="w-16 h-16 object-contain drop-shadow-sm"
        />
      </div>
      <h3 className="text-xl font-semibold text-center mb-2 font-poppins text-purple-800">
        {title}
      </h3>
      <p className="text-[15px] text-center text-gray-600 font-poppins leading-relaxed tracking-wide">
        {description}
      </p>
    </div>
  );

  return (
    <div className="relative bg-[#e6defc] pb-20">
      {/* Top Curve */}
      <div className="absolute inset-x-0 top-0 rotate-180 overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 224 12"
          className="block w-full h-[30px] -mb-1"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 
               112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 
               224,0 L224,12.0441132 L0,12.0441132 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Heading */}
      <div className="text-center pt-20 pb-10 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-800 leading-tight">
          Coming Soon to Inspiration App
        </h2>
        <p className="mt-3 text-lg text-slate-700 font-poppins max-w-2xl mx-auto leading-relaxed">
          This is where vision meets execution — everything we're crafting is
          meant to move you forward, faster and stronger.
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Small Screen */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:hidden gap-8 justify-items-center">
          {comingSoonFeatures.map((feature, index) => (
            <Card key={index} {...feature} />
          ))}
        </div>

        {/* Medium Screen */}
        <div className="hidden md:grid lg:hidden gap-8 justify-items-center">
          <div className="grid grid-cols-2 gap-8">
            {comingSoonFeatures.slice(0, 4).map((feature, index) => (
              <Card key={index} {...feature} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Card {...comingSoonFeatures[4]} />
          </div>
        </div>

        {/* Large Screen */}
        <div className="hidden lg:grid gap-8 justify-items-center">
          <div className="grid grid-cols-3 gap-8">
            {comingSoonFeatures.slice(0, 3).map((feature, index) => (
              <Card key={index} {...feature} />
            ))}
          </div>
          <div className="grid grid-cols-2 justify-center gap-8 mt-4">
            {comingSoonFeatures.slice(3).map((feature, index) => (
              <Card key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonSection;
