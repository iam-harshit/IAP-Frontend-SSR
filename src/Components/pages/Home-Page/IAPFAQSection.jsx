import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Faqs from '@/Constants/FAQ.js';
const IAPFAQSection = () => {
  const [faqData, setFaqData] = useState(Faqs);
  const [visibleCount, setVisibleCount] = useState(4);

  const toggleFaq = (index) => {
    setFaqData((prevData) =>
      prevData.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : false,
      }))
    );
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 2, faqData.length));
  };

  return (
    <div className=" flex flex-col items-center lg:flex-row lg:items-start lg:justify-between px-5 py-8 md:px-[30px] lg:px-[60px] 2xl:px-[200px] mt-5">
      <div className="w-full lg:w-[45%]  lg:mb-0 ">
        <h2 className="text-h2  sm:text-h1 lg:text-h2 xl:text-h1 mb-[20px] font-qurova text-[#6418C3]">
          Why Inspiration App?
        </h2>
        <p className="text-[#232B37] text-p lg:text-h5 leading-relaxed lg:pr-10 ">
          Inspiration App is an emerging platform designed to empower
          individuals on their journey of personal growth and career
          development. Built for aspiring students, professionals, and future
          leaders, Inspiration App provides practical tools, mentorship, and a
          supportive community to help individuals gain skills, build
          confidence, and achieve their goals faster.
        </p>
      </div>

      <div className=" w-full lg:w-[50%]">
        {faqData.slice(0, visibleCount).map((faq, index) => (
          <div
            key={index}
            className={`border-b border-gray-300 pb-6 pt-6 ${index == 0 ? 'lg:pt-3' : ''}`}
          >
            <div
              className="font-semibold cursor-pointer flex justify-between items-start text-h5 lg:text-[18px] text-[#34495e] transition-colors duration-300"
              onClick={() => toggleFaq(index)}
            >
              {faq.question}
              <span
                className={`text-h4 transition-transform duration-300 ${
                  faq.isOpen ? 'transform rotate-180' : ''
                }`}
              >
                {faq.isOpen ? '-' : '+'}
              </span>
            </div>
            {faq.isOpen && (
              <div className="pt-4 text-[#232B37]  lg:text-h5 leading-6  ">
                {faq.answer}
              </div>
            )}
          </div>
        ))}

        {visibleCount < faqData.length && (
          <div
            className="cursor-pointer text-center text-customColor text-link mt-5 hover:underline"
            onClick={loadMore}
          >
            Load More
          </div>
        )}

        <div className="mt-6 text-center text-gray-600 text-h6 xs:text-h5">
          If your query isn’t resolved, please visit our{' '}
          <Link
            to="/contact-us"
            className="text-customColor hover:underline text-h6"
          >
            Contact Page
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default IAPFAQSection;
