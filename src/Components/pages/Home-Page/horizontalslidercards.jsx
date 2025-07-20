import React from 'react';
import { mentors } from '@/Constants/Home-Constants/heroSectionMentor';

const Card = ({ person }) => (
  <div className="w-64 shrink-0 rounded-2xl shadow-lg mx-4 bg-white overflow-hidden min-h-[280px]">
    <div className="bg-gradient-to-r from-gray-300 via-gray-200 to-white h-24 relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden">
        <img
          src={
            person.profileImage ||
            'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/IAP-512-big-circle.png'
          }
          alt={person.name || 'User'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src =
              'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/IAP-512-big-circle.png';
          }}
        />
      </div>
    </div>
    <div className="pt-16 pb-6 px-4 text-center">
      <h2 className="text-md font-semibold text-gray-800 mt-1">
        {person.name}
      </h2>
      <p className="text-sm text-gray-600">{person.role}</p>
      <p className="text-sm mt-1">
        Inspire You In{' '}
        <span className="text-purple-600 font-semibold">{person.category}</span>
      </p>
      <div className="mt-5 flex flex-wrap gap-2 justify-center">
        {person.languages.map((lang, idx) => (
          <button
            key={idx}
            className="bg-gray-200 text-sm px-3 py-1 rounded-full"
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const CardSlider = () => {
  return (
    <div className="overflow-hidden relative w-full py-10">
      <div
        className="flex animate-horizontal-scroll whitespace-nowrap"
        style={{ minWidth: `${mentors.length * 16}rem` }}
      >
        {mentors.map((person, index) => (
          <Card key={index} person={person} />
        ))}
        {/* Duplicate cards for seamless scroll */}
        {mentors.map((person, index) => (
          <Card key={`copy-${index}`} person={person} />
        ))}
      </div>

      <style>{`
        @keyframes horizontal-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Only scroll through half (original + copy) */
        }

        .animate-horizontal-scroll {
          animation: horizontal-scroll 50s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CardSlider;
