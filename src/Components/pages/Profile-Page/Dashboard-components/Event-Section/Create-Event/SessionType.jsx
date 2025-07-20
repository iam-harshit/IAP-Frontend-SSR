/* eslint-disable react/prop-types */
import React from 'react'
import { SiTyper } from "react-icons/si";
import Select from 'react-select';
import { CustomControl, customStyles } from './CustomCategoryStyles';


const SessionType = ({ formData, sessionTypes, handleSessionTypeChange }) => {
  return (
    <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
      <label className="flex items-center text-md font-semibold text-indigo-800 mb-1">
        <SiTyper className="mr-2 text-purple-600 text-xl" />Session Type
      </label>
      <Select
        value={sessionTypes?.find(type => type.value === formData.sessionType)}
        onChange={handleSessionTypeChange}
        options={sessionTypes}
        styles={customStyles}
        components={{ Control: CustomControl }}
        placeholder="Select session type..."
      />
    </div>
  )
}

export default SessionType