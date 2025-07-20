import React, { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const data = [
  {
    id: 1,
    title: 'Host 1:1, Group, or Workshop Sessions',
    description:
      'From focused 1-on-1 guidance to dynamic group workshops and live webinars — host any type of session across Technology, Spirituality, Fitness, or Business.',
    image: 'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/homePage/offerings/event.webp',
    bg: 'bg-[#DFD4F9]',
  },
  {
    id: 2,
    title: 'Intelligent Matching with LEFI',
    description:
      'Let mentees find you through our premium Learner Fidelity engine — a skill & intent-based smart matchmaking system designed for real alignment and learning impact.',
    image: 'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/homePage/offerings/lefi.webp',
    bg: 'bg-[#F0D4DF]',
  },
  {
    id: 3,
    title: 'Build & Sell Digital Assets',
    description:
      'Share or monetize notes, templates, guides, eBooks — directly through your mentor profile.',
    image: 'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/homePage/offerings/payment.webp',
    bg: 'bg-[#DAE6F7]',
  },
  {
    id: 4,
    title: 'Become a Community Mentor',
    description:
      'Teach. Inspire. Earn. Track your impact, clear our IAP certification, and unlock exclusive benefits as you grow.',
    image: 'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/homePage/offerings/mentor.webp',
    bg: 'bg-[#D3D5F9]',
  },
  {
    id: 5,
    title: 'Contribute to “Write for Cause”',
    description:
      'Share your experiences and lessons in our community blog to build credibility, inspire others, and grow your reach.',
    image: 'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/homePage/offerings/blog.webp',
    bg: 'bg-[#F3DDF7]',
  },
];

const OfferingsToggle = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? 0 : index));
  };

  useEffect(() => {
    if (activeIndex === null) {
      setActiveIndex(0);
    }
  }, [activeIndex]);

  return (
    <div className="w-full max-w-[1100px] mx-auto px-4 md:py-5 md:flex md:justify-center md:gap-14">
      {/* left image */}
      <div className="hidden md:flex w-1/2 lg:w-1/2 justify-center items-start">
        {data.map(
          (item, idx) =>
            activeIndex === idx && (
              <div
                key={item.id}
                className={`rounded-[50px] p-4 md:p-5 w-full md:max-w-[500px] ${item.bg}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="mx-auto max-w-full h-auto rounded-[30px]"
                />
              </div>
            )
        )}
      </div>
      {/* right dropdowns */}
      <div className="w-full md:w-1/2">
        {data.map((item, idx) => (
          <div key={item.id}>
            <div
              className="cursor-pointer py-5"
              onClick={() => toggleAccordion(idx)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <span className="text-purple-500 font-medium mr-3 md:mr-6 mt-0.5">
                    0{item.id}
                  </span>
                  <p className="text-lg md:text-xl xl:text-2xl font-semibold leading-snug">
                    {item.title}
                  </p>
                </div>

                <FiChevronDown
                  className={`text-xl transform transition-transform duration-300 ${activeIndex === idx ? 'rotate-180' : ''
                    }`}
                />
              </div>
            </div>

            {/* Mobile view */}
            {activeIndex === idx && (
              <div>
                <p className="text-gray-600 text-sm md:text-base mb-6 px-2 ml-5 md:ml-9 lg::ml-16">
                  {item.description}
                </p>
                <div className="md:hidden px-2 flex justify-center">
                  <div
                    className={`rounded-[50px] mb-3 p-6 w-full sm:max-w-[500px] ${item.bg}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="mx-auto max-w-full  h-auto rounded-[30px]"
                    />
                  </div>
                </div>
              </div>
            )}
            <hr className="border-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferingsToggle;
