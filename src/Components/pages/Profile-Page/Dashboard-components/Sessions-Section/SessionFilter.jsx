import React from 'react';
import { Calendar, Filter, X } from 'lucide-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledStaticDatePicker } from './StyledStaticDatePicker.jsx';
import SessionStatusFilter from './StatusFilter.jsx';

const SessionFilter = ({
  selectedDate,
  activeFilter,
  filters,
  onDateChange,
  onFilterChange,
  onClearDate,
  onClearAllFilters
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Filter className="w-5 h-5 mr-2 text-purple-500" />
          Filters
        </h3>
        {(selectedDate || activeFilter !== 'all') && (
          <button
            onClick={onClearAllFilters}
            className="text-sm text-gray-500 hover:text-red-500 flex items-center transition-colors duration-200"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </button>
        )}
      </div>

      {/* Status Filters as Pills */}
      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Status
        </label>
        <div className="flex flex-wrap gap-2">
          {filters?.map((status) => (
            <button
              key={status}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 border
                ${activeFilter === status 
                  ? 'bg-purple-500 text-white shadow-md border-purple-500 transform scale-105' 
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
                }`}
              onClick={() => onFilterChange(status)}
            >
              <span className="capitalize">
                {status === 'all' ? 'All' : status}
              </span>
            </button>
          ))}
        </div>
      </div> */}
      <SessionStatusFilter 
  filters={filters}
  activeFilter={activeFilter}
  onFilterChange={onFilterChange}
/>

      {/* Date Filter with Static Calendar */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Calendar className="w-4 h-4 inline mr-2" />
          Filter by Date
        </label>
        
        {/* Selected Date Display */}
        {selectedDate && (
          <div className="mb-1 p-2 bg-purple-50 border border-purple-200 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-800">
                Selected: {selectedDate.format('MMMM DD, YYYY')}
              </span>
              <button
                onClick={onClearDate}
                className="text-purple-600 hover:text-purple-800 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        
        {/* Static Calendar */}
        <div className="calendar-container flex justify-center w-full">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledStaticDatePicker
              value={selectedDate}
              onChange={onDateChange}
              displayStaticWrapperAs="desktop"
              slotProps={{
                actionBar: {
                  actions: ['clear', 'today'],
                },
              }}
            />
          </LocalizationProvider>
        </div>
        
        {selectedDate && (
          <button
            onClick={onClearDate}
            className="mt-3 w-full text-sm text-gray-500 hover:text-red-500 transition-colors duration-200 py-2 px-4 border border-gray-200 rounded-xl hover:border-red-300"
          >
            Clear date filter
          </button>
        )}
      </div>
    </>
  );
};

export default SessionFilter;