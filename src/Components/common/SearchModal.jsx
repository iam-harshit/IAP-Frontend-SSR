import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({
  isOpen,
  onClose,
  dataSources = [],
  searchResultsRef,
}) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem('globalSearchHistory')) || []
  );
  const [suggestions, setSuggestions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('Blog');

  const filters = ['Blog', 'PODS', 'People', 'Navigate'];

  // Navigate keyword to path map
  const navigationMap = {
    home: '/',
    blogs: '/blogs',
    blog: '/blogs',
    pods: '/pods',
    mentors: '/explore-mentors',
    people: '/explore-mentors',
    contact: '/contact-us',
    about: '/about-us',
    events: '/events',
    features: '/features',
    chatur: '/ask-chatur',
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const matched = [];

    if (selectedFilter === 'Blog') {
      const blogSource = dataSources.find((s) => s.type === 'Blog');
      const blogData = blogSource?.data || [];
      const results = blogData.filter(
        (article) =>
          article.title?.toLowerCase().includes(lowerQuery) ||
          article.userId?.name?.toLowerCase().includes(lowerQuery) ||
          article.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
      setSuggestions(results.map((item) => ({ ...item, type: 'Blog' })));
      return;
    }

    if (selectedFilter === 'Navigate') {
      const match = Object.entries(navigationMap).filter(([key]) =>
        key.includes(lowerQuery)
      );
      const navSuggestions = match.map(([label, path]) => ({
        label,
        path,
        type: 'Navigate',
      }));
      setSuggestions(navSuggestions);
      return;
    }

    // Fallback for future filters like People, PODS
    dataSources?.forEach(({ data = [], type, displayKey, secondaryKey }) => {
      if (!Array.isArray(data)) return;
      data.forEach((item) => {
        const mainText = displayKey
          ?.split('.')
          .reduce((obj, key) => obj?.[key], item)
          ?.toLowerCase();
        const secondaryText = Array.isArray(
          secondaryKey?.split('.').reduce((obj, key) => obj?.[key], item)
        )
          ? secondaryKey
              .split('.')
              .reduce((obj, key) => obj?.[key], item)
              ?.join(', ')
              .toLowerCase()
          : secondaryKey
              ?.split('.')
              .reduce((obj, key) => obj?.[key], item)
              ?.toLowerCase();

        if (
          mainText?.includes(lowerQuery) ||
          secondaryText?.includes(lowerQuery)
        ) {
          matched.push({ ...item, type });
        }
      });
    });

    setSuggestions(matched.slice(0, 6));
  }, [query, selectedFilter, dataSources]);

  const handleSelect = (item, source) => {
    const newQuery = query;
    setQuery('');
    onClose();

    const updated = [
      newQuery,
      ...recentSearches.filter((q) => q !== newQuery),
    ].slice(0, 6);

    localStorage.setItem('globalSearchHistory', JSON.stringify(updated));
    setRecentSearches(updated);

    if (item.type === 'Navigate') {
      navigate(item.path);
    } else {
      source?.onNavigate?.(item);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-[3px] w-full h-full flex justify-center items-start pt-28 px-4">
      <div
        ref={modalRef}
        className="bg-white text-black w-full max-w-xl rounded-lg p-6 shadow-lg border border-gray-200"
      >
        {/* Input */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anything..."
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                suggestions[0] &&
                handleSelect(
                  suggestions[0],
                  dataSources.find((s) => s.type === suggestions[0].type)
                )
              }
              className="w-full bg-gray-100 text-black px-4 pr-10 py-2 rounded-md focus:outline-none"
            />
            <svg
              onClick={() =>
                suggestions[0] &&
                handleSelect(
                  suggestions[0],
                  dataSources.find((s) => s.type === suggestions[0].type)
                )
              }
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111 3a7.5 7.5 0 015.65 13.65z"
              />
            </svg>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto shadow-lg z-10">
                {suggestions.map((item, idx) => {
                  if (item.type === 'Navigate') {
                    return (
                      <li
                        key={idx}
                        className="px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm flex justify-between"
                        onClick={() => handleSelect(item)}
                      >
                        <span>{item.label}</span>
                        <span className="text-xs text-gray-500">
                          {item.type}
                        </span>
                      </li>
                    );
                  }

                  const source = dataSources.find((s) => s.type === item.type);
                  const label = source?.displayKey
                    ?.split('.')
                    .reduce((obj, key) => obj?.[key], item);
                  return (
                    <li
                      key={idx}
                      className="flex justify-between items-center px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm"
                      onClick={() => handleSelect(item, source)}
                    >
                      <span className="truncate max-w-[65%]">{label}</span>
                      <span className="text-xs text-gray-400">{item.type}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <button
            onClick={onClose}
            className="ml-4 px-2 text-sm text-gray-400 hover:text-gray-600"
          >
            esc
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-3 mb-4 flex-wrap text-sm font-medium text-gray-700">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full border transition-all ${
                selectedFilter === filter
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-purple-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Recent Searches */}
        <div className="text-left">
          <p className="text-gray-400 text-sm mb-2">Recent</p>
          <ul className="space-y-1">
            {recentSearches.length > 0 ? (
              recentSearches.map((item, idx) => (
                <li
                  key={idx}
                  className="hover:bg-purple-50 px-3 py-2 rounded-md cursor-pointer"
                  onClick={() => setQuery(item)}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="text-gray-400 px-3">No recent searches</li>
            )}
          </ul>
        </div>

        <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
          <button
            onClick={() => {
              localStorage.removeItem('globalSearchHistory');
              setRecentSearches([]);
            }}
            className="hover:text-purple-600 transition-colors"
          >
            Clear
          </button>

          <span>
            Powered by{' '}
            <span className="font-semibold text-purple-600">IAP</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
