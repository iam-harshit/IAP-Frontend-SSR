import { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

const FilterDropdown = ({ isOpen, setIsOpen, setFilteredMentors }) => {
  const mentorsFromRedux = useSelector(
    (state) => state.mentor?.mentors?.users || []
  );
  const [experience, setExperience] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handlePriceSelect = (price) => setSelectedPrice(price);

  const dropdownRef = useRef(null);

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilter = () => {
    setIsOpen(!isOpen);

    let minPrice = 0,
      maxPrice = Infinity;
    if (selectedPrice) {
      const [min, max] = selectedPrice.split('-');
      minPrice = parseInt(min, 10);
      maxPrice = max ? parseInt(max, 10) : Infinity;
    }

    const filteredByRange = mentorsFromRedux?.filter((mentor) => {
      const mentorPrice = mentor?.pricePerSession ?? 0;
      const mentorExperience = mentor?.totalExperience
        ? parseInt(mentor.totalExperience.match(/\d+/)?.[0] || '0', 10)
        : 0;

      const experienceMatch = experience
        ? mentorExperience === Number(experience)
        : true;
      const priceMatch = selectedPrice
        ? mentorPrice >= minPrice && mentorPrice <= maxPrice
        : true;

      return experienceMatch && priceMatch;
    });

    setFilteredMentors(filteredByRange);
  };

  const handleClear = () => {
    setIsOpen(!isOpen);
    setSelectedPrice(null);
    setExperience(0);
    setFilteredMentors(mentorsFromRedux);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter Button */}
      <button
        onClick={toggleDropdown}
        className="bg-[#6f00ff] text-white px-3 sm:px-8 py-2.5 rounded-r-full border-2 border-[#6f00ff] flex items-center"
      >
        <FaFilter size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl p-4 w-56 z-20">
          {/* Experience Slider */}
          <h3 className="text-gray-600 font-medium text-h6 mb-4">Experience</h3>
          <div className="relative w-full">
            {/* Value Above the Slider */}
            <div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-[#6f00ff] font-semibold px-2 rounded-md border border-[#6f00ff] shadow-md"
              style={{ left: `${(experience / 49) * 100}%` }}
            >
              {experience}
            </div>

            <input
              type="range"
              min="0"
              max="49"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              className="w-full appearance-none h-2 rounded-lg outline-none"
              style={{
                background: `linear-gradient(to right, #f4e5ff ${(experience / 49) * 100}%, #d9d9d9 ${(experience / 49) * 100}%)`,
              }}
            />
            <style>
              {`
                input[type="range"]::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 16px;
                  height: 16px;
                  background: white;
                  border: 2px solid #6f00ff;
                  border-radius: 50%;
                  cursor: pointer;
                }

                input[type="range"]::-moz-range-thumb {
                  width: 16px;
                  height: 16px;
                  background: white;
                  border: 2px solid #6f00ff;
                  border-radius: 50%;
                  cursor: pointer;
                }
              `}
            </style>
          </div>

          {/* Pricing Section */}
          <h3 className="text-gray-600 font-medium mt-3 mb-2 text-h6">
            Pricing
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {/* We can use Our Range Here */}
            {['1-300', '301-800', '801-1600', '1601-10000'].map((price) => (
              <button
                key={price}
                className={`py-1.5 rounded-full border-0 text-caption ${
                  selectedPrice === price
                    ? 'bg-[#8800ff] text-[#fff]'
                    : 'text-gray-600 border-gray-300 bg-[#f4e5ff]'
                }`}
                onClick={() => handlePriceSelect(price)}
              >
                {price}
              </button>
            ))}
          </div>
          <div className="flex gap-2 justify-end">
            <button
              className="bg-[#6f00ff] text-white mt-4 text-caption px-3 py-1 rounded-lg"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              className="bg-[#6f00ff] text-white mt-4 text-caption px-3 py-1 rounded-lg"
              onClick={handleFilter}
            >
              Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
