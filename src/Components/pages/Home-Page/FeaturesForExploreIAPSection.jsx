import React from 'react';

const features = [
  {
    title: ['Community'],
    text: 'Connect with 1 Lakh+ Peers',
    bg: '#f3f3f3',
    badge: '#d8b4fe',
    textColor: 'text-black',
    img: 'https://img.freepik.com/free-vector/connected-world-concept-illustration_114360-3027.jpg?semt=ais_items_boosted&w=740',
  },
  {
    title: ['Inspired Mentors'],
    text: '300+ Mentors, 5000+ Queries Resolved ',
    bg: '#d8b4fe',
    badge: '#f3f3f3',
    textColor: 'text-black',
    img: 'https://img.freepik.com/premium-vector/business-idea-solution-offering-mentor-give-advice_1134986-9654.jpg?semt=ais_hybrid&w=740',
  },
  {
    title: ['Events'],
    text: 'We find you a Mentor',
    bg: '#f3f3f3',
    badge: '#d8b4fe',
    textColor: 'text-black',
    img: 'https://5.imimg.com/data5/SELLER/Default/2023/3/295133854/TJ/YR/WW/156624171/event-management-website-services-500x500.jpg',
  },
  {
    title: ['LeFi'],
    text: 'Connect, Grow and Inspire',
    bg: '#f3f3f3',
    badge: '#d8b4fe',
    textColor: 'text-black',
    img: 'https://st2.depositphotos.com/5197113/8936/v/450/depositphotos_89360690-stock-illustration-business-matching-connecting-puzzle-elements.jpg',
  },
  {
    title: ['Blogging'],
    text: 'Spread your Knowledge because each one counts',
    bg: '#d8b4fe',
    badge: '#f3f3f3',
    textColor: 'text-black',
    img: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg?semt=ais_hybrid&w=740',
  },
  {
    title: ['PODs'],
    text: 'Curated small instance of directory to discuss on topics',
    bg: '#f3f3f3',
    badge: '#d8b4fe',
    textColor: 'text-black',
    img: 'https://st.depositphotos.com/28286440/59480/v/450/depositphotos_594805096-stock-illustration-discussion-icon-vector-logotype.jpg',
  },
];

const Card = ({ feature, isLast }) => (
  <div
    className={`inline-flex w-[340px] items-center justify-between overflow-hidden rounded-[30px] p-5 shadow-[0px_4px_0px_0px_rgba(25,26,35,1.00)] outline outline-1 outline-offset-[-1px] outline-[#191a23] ${isLast ? '' : 'mb-6'
      }`}
    style={{ backgroundColor: feature.bg }}
  >
    <div className="inline-flex flex-col items-start justify-start gap-[24px]">
      <h2 className="flex flex-col items-start text-xl font-semibold text-black">
        {feature.title.map((line, j) => (
          <span
            key={j}
            className="rounded-lg px-2"
            style={{ backgroundColor: feature.badge }}
          >
            {line}
          </span>
        ))}
      </h2>
      <p
        className={`text-[13px] leading-5 font-normal ${feature.textColor} text-left`}
      >
        {feature.text}
      </p>
    </div>
    <img
      className="w-[100px] rounded-full border-4 border-gray-400"
      src={feature.img}
      loading="lazy"
      alt={feature.title[0]}
    />
  </div>
);

const FeaturesForExploreIAPSection = () => {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start justify-center">
        {/* Left Column */}
        <div className="flex flex-col items-center">
          {features.slice(0, 3).map((feature, i) => (
            <Card key={i} feature={feature} isLast={i === 2} />
          ))}
        </div>

        {/* Middle Column */}
        <div className="flex flex-col justify-center items-center gap-6 px-4 w-full">
          <h2 className="text-3xl font-bold text-[#6418C3] text-center w-full font-qurova">
            Why IAP?
          </h2>
          <div className="flex flex-col gap-4 w-[340px] max-w-full text-left">
            <div className="flex gap-3 items-start p-4 bg-purple-50 rounded-lg shadow-sm border border-purple-100">
              <span className="text-purple-700 font-semibold">01.</span>
              <p className="text-black text-sm font-semibold">
                Find genuine mentors and peers for impactful collaboration.
              </p>
            </div>
            <div className="flex gap-3 items-start p-4 bg-purple-50 rounded-lg shadow-sm border border-purple-100">
              <span className="text-purple-700 font-semibold">02.</span>
              <p className="text-black text-sm font-semibold">
                Personalized learning paths through LEFI’s intelligent matching.
              </p>
            </div>
            <div className="flex gap-3 items-start p-4 bg-purple-50 rounded-lg shadow-sm border border-purple-100">
              <span className="text-purple-700 font-semibold">03.</span>
              <p className="text-black text-sm font-semibold">
                Access live sessions, expert webinars, and real-world projects.
              </p>
            </div>
            <div className="flex gap-3 items-start p-4 bg-purple-50 rounded-lg shadow-sm border border-purple-100">
              <span className="text-purple-700 font-semibold">04.</span>
              <p className="text-black text-sm font-semibold">
                Track your career goals, earn certifications, and land
                internships.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center">
          {features.slice(3, 6).map((feature, i) => (
            <Card key={i + 3} feature={feature} isLast={i === 2} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesForExploreIAPSection;
