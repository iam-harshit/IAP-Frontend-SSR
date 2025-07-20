import React from 'react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Hourly Mentorship',
      price: '₹0 / Hour',
      features: [
        'Access to recommendations.',
        'Basic in-app messaging.',
        'Explore career guidance topics.',
        'Connect with multiple mentors or mentees.',
      ],
      idealFor:
        'Beginners looking to explore mentorship opportunities at no cost.',
    },
    {
      name: 'Weekly Mentorship',
      price: '₹15 / Hour',
      features: [
        'All Free Plan features included.',
        'Advanced filters for better matches.',
        'Priority messaging and video calls.',
        'Personalized one-on-one sessions.',
        'Enhanced in-app communication',
      ],
      idealFor:
        'Those seeking a more tailored and in-depth mentorship experience.',
    },
    {
      name: 'Long Term Mentorship',
      price: '₹30 / Hour',
      features: [
        'All Pro Plan features included.',
        'Access to workshops and webinars.',
        'Personalized mentorship plans and resources.',
        'Early access to premium resources.',
      ],
      idealFor: 'Professionals and learners aiming for structured growth.',
    },
  ];

  return (
    <>
      <h1 className="text-center font-bold text-4xl mt-3">
        Mentorship Plans for Every Stage
      </h1>
      <h1 className="text-center mt-3 w-1/3 mx-auto">
        Choose from Free, Pro, or Premium plans to match your mentorship needs
        and start growing today!
      </h1>
      <div className="bg-gradient-to-tr py-16 px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {plans.map((plan, index) => (
            <div
              className={`${
                index === 1
                  ? 'scale-105 shadow-xl bg-gradient-to-tr from-purple-700 to-purple-500 text-white'
                  : 'bg-white shadow-xl'
              } transition-transform transform rounded-2xl p-6 w-80 text-center border-purple-700 border`}
              key={plan.name}
            >
              {/* Plan Title */}
              <h3
                className={`text-xl font-semibold uppercase ${
                  index === 1 ? 'text-white' : 'text-purple-700'
                }`}
              >
                {plan.name}
              </h3>

              {/* Plan Price */}
              <h2
                className={`text-4xl font-bold my-3 ${
                  index === 1 ? 'text-white' : 'text-purple-800'
                }`}
              >
                {plan.price}
              </h2>

              {/* Features */}
              <ul className="mt-6 mb-4 text-left space-y-3 text-sm">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start ${
                      index === 1 ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    <svg
                      className="w-4 h-4 mr-2 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Ideal For Section */}
              <p
                className={`italic text-sm ${
                  index === 1 ? 'text-white' : 'text-gray-600'
                } mb-6`}
              >
                <strong>Ideal for:</strong> {plan.idealFor}
              </p>

              {/* Select Plan Button */}
              <button
                className={`${
                  index === 1
                    ? 'bg-white text-purple-700 hover:bg-gray-100'
                    : 'bg-purple-700 text-white hover:bg-purple-800'
                } font-medium px-6 py-2 rounded-full transition-colors`}
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PricingSection;
