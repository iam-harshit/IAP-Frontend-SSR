import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEventAvailable, MdSupportAgent, MdPeople } from 'react-icons/md';

const SideNavBar = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      icon: <MdEventAvailable size={24} />,
      label: 'Slots',
      path: '/profile#slots',
      type: 'internal',
    },
    {
      icon: <MdSupportAgent size={24} />,
      label: 'Support',
      path: 'https://wa.me/919353493539',
      type: 'external',
    },
    {
      icon: <MdPeople size={24} />,
      label: 'Community',
      path: 'https://community.curiousdevelopers.in/',
      type: 'external',
    },
  ];

  const handleClick = (item) => {
    if (item.type === 'external') {
      window.open(item.path, '_blank');
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="lg:hidden fixed bg-gray-800 w-8 z-50 top-[40%] right-0 h-[160px] rounded-l-xl flex flex-col items-center justify-around py-2 shadow-lg">
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(item)}
          className="text-white hover:scale-110 transition-transform duration-200"
          title={item.label}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default SideNavBar;
