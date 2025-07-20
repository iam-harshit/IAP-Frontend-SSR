import React, { useState, useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

const EventFilters = ({
  events,
  setFilteredEvents,
  originalEvents,
  isOpen,
  onClose,
}) => {
  const sessionTypes = [...new Set(originalEvents.map((event) => event.sessionType))];
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [filterDate, setFilterDate] = useState('');

  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const normalizeDate = (dateStr) => {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const applyFilters = () => {
    let filtered = [...originalEvents];

    if (selectedType) {
      filtered = filtered.filter((event) => event.sessionType === selectedType);
    }

    if (filterDate) {
      const filterD = normalizeDate(filterDate);

      filtered = filtered.filter((event) => {
        const eventStart = event.startDate ? normalizeDate(event.startDate) : null;
        const eventEnd = event.endDate ? normalizeDate(event.endDate) : null;

        if (eventStart && eventEnd) {
          return filterD >= eventStart && filterD <= eventEnd;
        } else if (eventStart) {
          return filterD.getTime() === eventStart.getTime();
        } else {
          return false;
        }
      });
    }

    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter((event) => {
        const eventPrice = typeof event.slotPrice === 'string'
          ? parseFloat(event.slotPrice.replace(/[^0-9.-]+/g, ''))
          : Number(event.slotPrice);
        if (isNaN(eventPrice)) return false;

        const min = priceRange.min ? Number(priceRange.min) : -Infinity;
        const max = priceRange.max ? Number(priceRange.max) : Infinity;

        return eventPrice >= min && eventPrice <= max;
      });
    }

    setFilteredEvents(filtered);
    onClose();
  };

  const clearAllFilters = () => {
    setSelectedType('');
    setPriceRange({ min: '', max: '' });
    setFilterDate('');
  };

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute top-10 left-2 md:left-20 z-50 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4"
      style={{ minWidth: '320px' }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX size={18} />
        </button>
      </div>

      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Session Type</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="">All Types</option>
          {sessionTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

    
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, min: e.target.value }))
            }
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, max: e.target.value }))
            }
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
      </div>

     
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>

   
      <div className="flex gap-2">
        <button
          onClick={clearAllFilters}
          className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
        >
          Clear
        </button>
        <button
          onClick={applyFilters}
          className="flex-1 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium"
        >
          Apply
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Showing {events.length} of {originalEvents.length} events
      </div>
    </div>
  );
};

export default EventFilters;
