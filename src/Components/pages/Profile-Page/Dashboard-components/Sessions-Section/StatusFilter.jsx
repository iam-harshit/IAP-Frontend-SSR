import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #7c3aed',
    borderRadius: '12px',
    minHeight: '48px',
    paddingLeft: '10px',
    boxShadow: 'none',
    '&:hover': { borderColor: '#7c3aed' }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#7c3aed' : 'white',
    color: state.isSelected ? 'white' : 'black',
    '&:hover': { backgroundColor: '#ede9fe', color: 'black' }
  }),
  singleValue: (provided) => ({ ...provided, color: '#7c3aed' }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (provided) => ({ ...provided, color: '#7c3aed', '&:hover': { color: '#7c3aed' } })
};

const SessionStatusFilter = ({ filters, activeFilter, onFilterChange }) => {
  // Transform filters array into options format for React Select
  const statusOptions = filters?.map(status => ({
    value: status,
    label: status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)
  })) || [];

  // Find current selected option
  const selectedOption = statusOptions.find(option => option.value === activeFilter);

  // Handle selection change
  const handleChange = (selectedOption) => {
    onFilterChange(selectedOption?.value || 'all');
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Session Status
      </label>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={statusOptions}
        styles={customStyles}
        placeholder="Select session status..."
        isClearable={false}
        isSearchable={false}
      />
    </div>
  );
};

export default SessionStatusFilter;