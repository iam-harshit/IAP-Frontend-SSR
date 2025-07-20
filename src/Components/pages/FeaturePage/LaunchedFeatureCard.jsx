import React from 'react';

const launchedFeatureData = [
  {
    title: 'Skilled Mentor Support',
    description: 'Connect with expert mentors tailored to your goals.',
    img: 'https://cdn-icons-png.freepik.com/128/11647/11647121.png',
  },
  {
    title: 'Customised 1 on 1 Sessions',
    description: 'Receive personalized guidance and focus on your goals.',
    img: 'https://cdn-icons-png.freepik.com/128/7566/7566632.png',
  },
  {
    title: 'Active Community Support',
    description:
      'Share ideas and solve doubts with a network of like-minded people.',
    img: 'https://cdn-icons-png.freepik.com/128/12236/12236994.png',
  },
  {
    title: 'Wide Range of Mentors',
    description: 'Choose from a diverse range of mentors to suit your needs.',
    img: 'https://cdn-icons-png.freepik.com/128/6788/6788450.png',
  },
];

const LaunchedFeature = () => {
  return (
    <section className="text-gray-700 body-font">
      <div className="text-center mt-12 mb-6 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-800 leading-tight">
          What Sets Inspiration App Apart
        </h2>
        <p className="mt-3 text-lg md:text-xl text-gray-700 font-poppins max-w-2xl mx-auto leading-relaxed tracking-wide">
          We’re not just a mentorship platform — we’re a space for clarity,
          confidence, and connection. Let your growth journey begin here.
        </p>
      </div>

      <div className="container px-5 py-12 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center items-start">
          {launchedFeatureData.map((feature) => (
            <div
              key={feature.title}
              className="hover:scale-105 transition duration-300 ease-in-out"
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="mx-auto w-28 h-28 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-base text-gray-700 max-w-xs mx-auto font-poppins leading-relaxed tracking-wide">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaunchedFeature;
