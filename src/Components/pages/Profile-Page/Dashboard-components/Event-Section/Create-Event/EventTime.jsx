/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'

const EventTime = ({ formData, handleChange, setFormData }) => {
    useEffect(() => {
      if (formData.sessionType !== 'workshop' && formData.startDate) {
        setFormData(prev => ({
          ...prev,
          endDate: formData.startDate
        }));
      }
    }, [formData.sessionType, formData.startDate]);
    
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="block text-md font-medium text-indigo-800 mb-2">Start Time</label>
          <div className="relative">
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full px-5 py-3 pl-3 text-md rounded-xl border border-purple-600 outline-none  transition"
              required
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-md font-medium text-indigo-800 mb-2">End Time</label>
          <div className="relative">
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full px-5 py-3 text-md rounded-xl border border-purple-600 outline-none  transition"
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventTime