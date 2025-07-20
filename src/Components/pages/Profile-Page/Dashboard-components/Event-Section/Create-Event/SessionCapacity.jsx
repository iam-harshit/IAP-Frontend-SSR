/* eslint-disable react/prop-types */
import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { MdReduceCapacity } from 'react-icons/md'

const SessionCapacity = ({ formData, handleChange }) => {
  return (
    <div>
      <label className="flex items-center text-md font-semibold text-indigo-800 mt-4 mb-1">
        <MdReduceCapacity className="mr-2 text-purple-600 text-xl" />
        {formData.sessionType === '1-1' ? 'Participants' : 'Max Capacity'}
      </label>
      <div className="relative">
        <input
          type="number"
          name="maxCapacity"
          value={formData.sessionType === '1-1' ? '1' : formData.maxCapacity}
          onChange={handleChange}
          min="1"
          max={formData.sessionType === '1-1' ? '1' : formData.sessionType === '1-n' ? '10' : formData.sessionType === 'group' ? '20' : '100'
          }
          className="w-full px-5 py-3 pl-12 text-md rounded-xl border border-purple-600 outline-none shadow-sm"
          required
          disabled={formData.sessionType === '1-1'}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
          <FaUsers className="text-xl" />
        </div>
      </div>
    </div>
  )
}

export default SessionCapacity