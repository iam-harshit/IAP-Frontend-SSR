/* eslint-disable react/prop-types */
import React from 'react'
import { FiUsers } from 'react-icons/fi'
import Select from 'react-select';
import { CustomControl, customStyles } from './CustomCategoryStyles';

const Category = ({ formData, availableCategories, handleCategoryChange }) => {
  return (
    <div className="w-full lg:w-1/2 mr-4">
      <label className="flex items-center text-md font-semibold text-indigo-800 mb-1">
        <FiUsers className="mr-2 text-purple-600 text-xl" />Category
      </label>
      <Select
        value={availableCategories.find(cat => cat.value === formData.sessionCategory)}
        onChange={handleCategoryChange}
        options={[...availableCategories, { value: 'custom', label: 'Add Custom Category...' }]}
        styles={customStyles}
        components={{ Control: CustomControl }}
        placeholder="Select category..."
      />
    </div>
  )
}

export default Category