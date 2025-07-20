/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';

const EventDate = ({ formData, setFormData, handleDateChange }) => {
  // Calculate duration based on both date and time
  useEffect(() => {
    if (formData.startDate && formData.endDate && formData.startTime && formData.endTime) {
      try {
        const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
        const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
        // Calculate difference in milliseconds
        const diffMs = endDateTime - startDateTime;
        // Convert to hours with one decimal place
        const diffHours = (diffMs / (1000 * 60 * 60)).toFixed(1);
        if (diffMs > 0) {
          setFormData(prev => ({...prev,duration: diffHours}));
        } else {
          setFormData(prev => ({ ...prev, duration: '0' }));
        }
      } catch (error) {
        console.error('Error calculating duration:', error);
      }
    }
  }, [formData.startDate, formData.endDate, formData.startTime, formData.endTime]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-md font-semibold text-indigo-800 mb-3">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleDateChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-5 py-3 text-md rounded-xl border border-purple-600 outline-none  transition"
            required
          />
        </div>
        <div>
          <label className="block text-md font-semibold text-indigo-800 mb-3">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleDateChange}
            min={formData.startDate || new Date().toISOString().split('T')[0]}
            className={`w-full px-5 py-3 text-md rounded-xl border outline-none transition ${formData.sessionType === 'workshop' ? 'border-purple-600' : 'border border-purple-600 outline-none bg-gray-50 cursor-not-allowed'}`}
            required
            disabled={formData.sessionType !== 'workshop'}
          />
        </div>
      </div>
    </div>
  )
}

export default EventDate