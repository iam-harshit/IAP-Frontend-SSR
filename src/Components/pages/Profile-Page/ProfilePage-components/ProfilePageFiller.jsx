import React from 'react';
import { Link } from 'react-router-dom';

import mentors from '@/assets/ExploreMentorIcon.png';
import events from '@/assets/EventsIcon.png';
import blogs from '@/assets/blogIcon.png';
import pods from '@/assets/podsIcon.png';

const ProfilePageFiller = ({ isMentor }) => {
  const cardData = [
    {
      name: 'Explore Mentors',
      description: 'Discover experienced mentors across various domains.',
      image: mentors,
      link: '/explore-mentors',
    },
    {
      name: 'Blogs',
      description: 'Read, write, and share insightful blogs with the community.',
      image: blogs,
      link: '/blogs',
    },
    {
      name: 'Pods',
      description: 'Join pods to collaborate and grow together.',
      image: pods,
      link: '/pods',
    },
    {
      name: 'Events',
      description: 'Participate in upcoming events or manage your own.',
      image: events,
      link: isMentor
        ? '/dashboard/create-event'
        : '/events',
    },
  ];

  const bgColors = ['#A021FD', '#FE821C', '#09B24D', '#FE2437'];

  return (
    <div className="hidden lg:block lg:space-y-5 lg:w-full">
      {cardData.map((item, index) => (
        <Link to={item.link} key={index} className="block group">
          <div className="relative w-[95%] mx-auto transition-transform duration-300 group-hover:-translate-y-1">
            {/* Back layer for 3D depth */}
            <div
              className="absolute inset-0 translate-x-[-2px] translate-y-[2px] rounded-xl z-0 transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[4px]"
              style={{ backgroundColor: bgColors[index % bgColors.length] }}
            />

            {/* Foreground card */}
            <div
              className="relative z-10 bg-white rounded-xl border border-[#dad9ff] px-5 py-4 transition-all duration-300 transform-gpu group-hover:shadow-xl"
              style={{
                transform: 'perspective(1000px) rotateX(1deg) rotateY(-1deg)',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-contain mb-2"
              />
              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-sm text-gray-700">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfilePageFiller;
