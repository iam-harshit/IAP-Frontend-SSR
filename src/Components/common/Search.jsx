import { useEffect, useState, useRef } from 'react';
import { MdCategory } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import FilterDropdown from '@/Components/common/Filter';
import { handleSearchMentors } from '@/services/Operations/MentorsOperation/MentorsApi';

const SearchComponent = ({
  categoryOpen,
  setCategoryOpen,
  isOpen,
  setIsOpen,
  setFilteredMentors,
  setError,
}) => {
  const categories = ['Technology', 'Spirituality', 'Wellbeing', 'Business'];
  const mentorsFromRedux = useSelector(
    (state) => state.mentor?.mentors?.users || []
  );

  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [query, setQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!query) {
      handleClose();
    }
  }, [query]);

  // useEffect(() => {
  //   if (selectedCategory === 'Category') {
  //     setFilteredMentors(mentorsFromRedux);
  //   } else {
  //     setFilteredMentors(
  //       mentorsFromRedux.filter(
  //         (mentor) => mentor.category === selectedCategory
  //       )
  //     );
  //   }
  // }, [selectedCategory, mentorsFromRedux]);

  const searchByInput = async () => {
    if (!query) {
      setFilteredMentors(mentorsFromRedux);
      return;
    }
    try {
      const response = await handleSearchMentors(selectedCategory, query);
      setFilteredMentors(response);
      setError(!response?.length);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') searchByInput();
  };

  const handleClose = () => {
    setQuery('');
    setSelectedCategory('Category');
    setFilteredMentors(mentorsFromRedux);
    setError(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center border-2 border-[#6f00ff] rounded-full w-full max-w-2xl">
      {/* Category Dropdown */}
      <div className="relative order-1" ref={dropdownRef}>
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex items-center bg-purple-100 px-3 sm:px-8 py-2.5 shadow-sm text-h6 rounded-l-full text-black font-medium"
        >
          <span className="hidden sm:inline">{selectedCategory}</span>
          <MdCategory className="ml-2 text-caption sm:text-lg" />
        </button>

        {categoryOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
            {categories.map((category) => (
              <button
                key={category}
                className="block w-full text-left text-caption px-4 py-2 hover:bg-purple-100"
                onClick={() => {
                  setSelectedCategory(category);
                  setCategoryOpen(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="flex-1 min-w-0 order-2 sm:order-2">
        <input
          type="text"
          placeholder="Find mentors by Name, Company, Skills"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="w-full px-2 sm:px-4 py-2 text-caption sm:text-h6 border-none outline-none focus:ring-0"
          onKeyDown={handleEnter}
        />
      </div>

      <div className="flex items-center order-2 sm:order-2 gap-1 sm:gap-2">
        <button onClick={handleClose} className="mr-2">
          <IoClose />
        </button>
        {/* Hide Search Button Below 400px */}
        <button
          onClick={searchByInput}
          className="bg-purple-100 px-3 py-1.5 mr-3 rounded-md text-[#6f00ff] font-medium text-caption hidden sm:block"
        >
          Search
        </button>
      </div>

      {/* Filter Button */}
      <div className="order-4">
        <FilterDropdown
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          setFilteredMentors={setFilteredMentors}
        />
      </div>
    </div>
  );
};

export default SearchComponent;
