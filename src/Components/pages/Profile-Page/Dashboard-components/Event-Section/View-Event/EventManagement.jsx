import { PenIcon } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const EventManagementSection = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  // Category data for mapping
  const categories = [
    { name: 'Technology', color: 'bg-[#ff9500]' },
    { name: 'Health & Fitness', color: 'bg-[#867aff]' },
    { name: 'Spiritual', color: 'bg-[#00c8c8]' },
    { name: 'Finance', color: 'bg-[#ff61ad]' },
  ];

  return (
    <div className="w-full py-3">
      <div className="flex flex-col space-y-4">
        {/* Header section with title and stats */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="font-['Poppins'] font-medium text-black text-[34.4px] leading-tight">
              Calendar
            </h1>
            <p className="font-['Poppins'] font-normal text-[14.3px] leading-relaxed mt-1">
              <span className="text-[#666666]">You have </span>
              <span className="font-medium text-[#867aff]">15 events</span>
              <span className="text-[#666666]"> this week and </span>
              <span className="font-medium text-[#867aff]">7 reminder</span>
              <span className="text-[#666666]"> today.</span>
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Switcher image */}
            {/* <img
              className="h-12 w-[107px] object-contain"
              alt="Switcher"
              src="/switcher.png"
            /> */}

            {/* New Event button */}
            <Button
              className="h-12 bg-[#a978fd] rounded-[23.89px] px-6 hover:bg-[#9560e9] flex-shrink-0"
              onClick={() => navigate('/dashboard/create-event')}
            >
              <PenIcon className="w-[15px] h-[15px] mr-2" color="white" />
              <span className="font-['Poppins'] font-medium text-white text-[16.1px] whitespace-nowrap">
                New Event
              </span>
            </Button>
          </div>
        </div>

        {/* Bottom section with filters and controls */}
        <div className="flex justify-between items-end">
          {/* Categories */}
          <div className="flex flex-col">
            <span className="font-['Poppins'] font-normal text-[#8a8a8f] text-[13px] mb-1">
              Category
            </span>
            <div className="flex gap-6">
              {categories.map((category) => (
                <div key={category.name} className="flex items-center">
                  <div
                    className={`w-2.5 h-2.5 ${category.color} rounded-[5px] flex-shrink-0`}
                  />
                  <span className="ml-[13px] font-['Poppins'] font-normal text-[#666666] text-[15px] whitespace-nowrap">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Toggle between Pending and Booking */}
          <div className="relative w-[187px] h-9 bg-[#a878fc] rounded-[18.06px] flex items-center flex-shrink-0">
            <span
              className={` pr-2 absolute left-[0px] w-[101px] h-[31px] top-[3px]
      flex items-center justify-center cursor-pointer
      transition-all duration-300 ease-in-out ${
        activeTab === 'Pending'
          ? 'font-medium text-black bg-white rounded-[15.35px] shadow-sm'
          : 'font-normal text-white'
      }`}
              onClick={() => setActiveTab('Pending')}
              style={{
                zIndex: activeTab === 'Pending' ? 2 : 1,
                transform:
                  activeTab === 'Pending' ? 'translateX(2px)' : 'translateX(0)',
              }}
            >
              Pending
            </span>
            <span
              className={`
      absolute right-[0px] w-[101px] h-[31px] top-[3px]
      flex items-center justify-center cursor-pointer
      transition-all duration-300 ease-in-out
      ${
        activeTab === 'Booked'
          ? 'font-medium text-black bg-white rounded-[15.35px] shadow-sm'
          : 'font-normal text-white'
      }
    `}
              onClick={() => setActiveTab('Booked')}
              style={{
                zIndex: activeTab === 'Booked' ? 2 : 1,
                transform:
                  activeTab === 'Booked' ? 'translateX(-2px)' : 'translateX(0)',
              }}
            >
              Booking
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
