/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose, articles, setSearchResults, searchResultsRef }) => {
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate()
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(JSON.parse(localStorage.getItem('recentSearches')) || []);
  const [suggestions, setSuggestions] = useState([]);
  const [noResults, setNoResults] = useState(false);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
    // Reset search state when modal opens
    setNoResults(false);
  }, [isOpen]);

  // Key and click handlers
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef?.current && !modalRef?.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Real-time search suggestions and no results check
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      setNoResults(false);
      return;
    }
    const lowerQuery = query?.toLowerCase();
    const matched = articles?.filter((article) => {
      return (
        article?.title?.toLowerCase().includes(lowerQuery) ||
        article?.userId?.name?.toLowerCase().includes(lowerQuery) ||
        article?.tags?.some((t) => t?.toLowerCase().includes(lowerQuery))
      );
    });
    setSuggestions(matched?.slice(0, 5));
    setNoResults(matched?.length === 0);
  }, [query, articles]);

  const handleSearch = () => {
    if (query?.trim() === '') {
      setSearchResults([]);
      setNoResults(true);
      return;
    }
    const lowerQuery = query?.toLowerCase();
    const filtered = articles?.filter((article) => {
      return (
        article?.title?.toLowerCase().includes(lowerQuery) ||
        article?.userId?.name?.toLowerCase().includes(lowerQuery) ||
        article?.tags?.some((t) => t?.toLowerCase().includes(lowerQuery))
      );
    });
    setSearchResults(filtered);
    setNoResults(filtered.length === 0);

    // Scroll to results if there are any
    if (filtered?.length > 0) {
      setTimeout(() => {
        searchResultsRef?.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    // Save to recent searches
    const updatedSearches = [ query, ...recentSearches.filter((item) => item !== query)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
    setQuery('');
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-violet-200/50 backdrop-blur-sm flex justify-center items-start pt-28 px-4">
      <div
        ref={modalRef}
        className="bg-white text-black w-full max-w-xl rounded-lg p-6 shadow-lg border border-gray-200"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search blogs, author, any topic.."
              className="w-full bg-gray-100 text-black px-4 pr-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
            >
              <svg
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
            </button>
            {/* Suggestions Dropdown */}
            {suggestions?.length > 0 && (
              <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto shadow-lg z-10">
                {suggestions?.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center gap-4 px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm text-gray-700"
                    onClick={() => {
                      setQuery(item?.title);
                      handleSearch();
                    }}
                  >
                    <span className="truncate max-w-[70%]">{item?.title}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{item?.userId?.name || 'Unknown Author'}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button onClick={onClose} className="ml-4 px-2 text-sm text-gray-400 hover:text-gray-600"> esc </button>
        </div>
        {/* Show no results message as user types */}
        {noResults && query.trim() !== '' && (
          <div className="mb-4 p-4 bg-purple-50 rounded-lg text-center">
            <p className="text-purple-800 font-medium">No matching blogs found for &quot;{query}&quot; </p>
            <p className="text-sm text-purple-600 mt-1">Try different search terms </p>
          </div>
        )}
        {/* Only show recent searches when there's no query or results */}
        {!noResults && query.trim() === '' && (
          <div className="text-left">
            <p className="text-gray-400 text-sm mb-2">Recent</p>
            <ul className="space-y-1">
              {recentSearches?.length > 0 ? (
                recentSearches?.map((item, idx) => (
                  <li key={idx} className="hover:bg-purple-50 px-3 py-2 rounded-md cursor-pointer"
                    onClick={() => {
                      setQuery(item);
                      handleSearch();
                    }}>
                    {item}
                  </li>
                ))
              ) : (<li className="text-gray-400 px-3">No recent searches</li>)}
            </ul>
          </div>
        )}
        <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
          <button
            onClick={() => {
              localStorage.removeItem('recentSearches');
              setRecentSearches([]);
            }}
            className="hover:text-purple-600 transition-colors"
          >
            Clear history
          </button>
          <div className="text-right"> Search by{' '}<span className="font-semibold text-purple-600">Inspiration</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchModal;