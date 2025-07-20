import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SlotDatesCarousel = ({
  slotCount,
  sliderRef,
  setSelectedDate,
  selectedDate,
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;

    const checkScroll = () => {
      if (!slider) return;
      setCanScrollLeft(slider.scrollLeft > 0);
      setCanScrollRight(
        Math.ceil(slider.scrollLeft + slider.clientWidth) < slider.scrollWidth
      );
    };

    checkScroll();

    slider?.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      slider?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [slotCount, sliderRef]);

  const handleScroll = (offset) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });

    setTimeout(() => {
      const slider = sliderRef.current;
      if (!slider) return;
      setCanScrollLeft(slider.scrollLeft > 0);
      setCanScrollRight(
        Math.ceil(slider.scrollLeft + slider.clientWidth) < slider.scrollWidth
      );
    }, 300);
  };

  return (
    <div className="px-4 py-3 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-700 font-semibold pb-2">Available Dates</h3>
        <div className="flex gap-2">
          {canScrollLeft && (
            <button
              className="cursor-pointer"
              onClick={() => handleScroll(-150)}
            >
              <ChevronLeft />
            </button>
          )}
          {canScrollRight && (
            <button
              className="cursor-pointer"
              onClick={() => handleScroll(150)}
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-3 mt-2 pb-3 h-auto overflow-x-auto scroll-smooth scrollable-horizontal"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {Object.entries(slotCount)
          .sort(([a], [b]) => new Date(a) - new Date(b))
          .map(([dateKey, count], index) => {
            const slotDate = new Date(dateKey);
            const weekday = slotDate
              .toLocaleDateString('en-US', {
                weekday: 'short',
              })
              .toUpperCase();
            const month = slotDate.toLocaleString('default', {
              month: 'short',
            });
            const day = slotDate.getDate();
            const isActive = dateKey === selectedDate;

            return (
              <div
                key={index}
                onClick={(e) => {
                  e.currentTarget.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest',
                  });
                  setSelectedDate(dateKey);
                }}
                className={`w-[100px] px-4 py-3 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer flex-shrink-0 border-2 scroll-snap-align-start
                  ${isActive ? 'bg-purple-100 border-purple-500' : 'bg-white border-gray-300'}
                `}
                title={`Date: ${dateKey}, ${count} slot${count > 1 ? 's' : ''}`}
              >
                <span className="text-caption font-medium">{weekday}</span>
                <div className="flex items-center gap-x-1">
                  <span className="text-h5 text-black font-bold">{day}</span>
                  <span className="text-h5 text-black font-bold">{month}</span>
                </div>
                <span className="text-[13px] mt-1 font-bold text-[#0FC00F]">
                  {count} Slot{count > 1 ? 's' : ''}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SlotDatesCarousel;
