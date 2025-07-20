/* eslint-disable react/prop-types */
import React from 'react'
import {  FiCalendar, FiClock, FiLink, FiUsers, FiX } from 'react-icons/fi'
import { GiTeacher } from 'react-icons/gi';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { MdTopic } from 'react-icons/md';


const PreviewEventModel = ({ formData, setShowPreview, handleScheduleEvent }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not specified';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 lg:p-4 z-[9999] py-4 lg:py-0"
      onClick={() => setShowPreview(false)}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 pb-0 sm:p-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-indigo-900">
              <GiTeacher className="inline mr-2 text-purple-600" />
              {formData.sessionTitle || 'Untitled Event'}
              <span className="ml-2 text-sm font-normal text-gray-500 capitalize">({formData.sessionCategory})</span>
            </h3>
            <button onClick={() => setShowPreview(false)}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-600 outline-none mt-2">
              <p className="text-gray-700 text-md">{formData.sessionDescription || 'No description provided'}</p>
            </div>

            {/* Added Topics Section */}
            {formData.sessionTopics && formData.sessionTopics.length > 0 && (
              <div className="bg-white p-4 rounded-xl border border-purple-600 outline-none shadow-sm">
                <h4 className="flex items-center font-medium text-indigo-700 mb-2">
                  <MdTopic className="mr-2 text-purple-600" /> Session Topics
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData?.sessionTopics.map((topic, index) => (
                    <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-xl border border-purple-600 outline-none shadow-sm">
                <h4 className="flex items-center font-medium text-indigo-700 mb-2">
                  <FiCalendar className="mr-2 text-purple-600" />Date Range
                </h4>
                <p className="text-gray-700">{formatDate(formData.startDate)} to {formatDate(formData.endDate)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-purple-600 outline-none shadow-sm">
                <h4 className="flex items-center font-medium text-indigo-700 mb-3">
                  <FiClock className="mr-2 text-purple-600" /> Time
                </h4>
                <p className="text-gray-700">{formatTime(formData.startTime)} to {formatTime(formData.endTime)}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-purple-600 outline-none shadow-sm">
                <h4 className="flex items-center font-medium text-indigo-700 mb-2">
                  <FiClock className="mr-2 text-purple-600" /> Duration
                </h4>
                <p className="text-xl font-bold text-purple-700">{formData.duration || '0'} hours</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-purple-600 outline-none shadow-sm">
                <h4 className="flex items-center font-medium text-indigo-700 mb-2">
                  <FaIndianRupeeSign className="mr-2 text-purple-600" />Price
                </h4>
                <p className="text-xl font-bold text-purple-700">₹{formData.slotPrice || '0'}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-purple-600 outline-none shadow-sm">
                <h4 className="flex items-center font-medium text-indigo-700 mb-2">
                  <FiUsers className="mr-2 text-purple-600" /> Capacity
                </h4>
                <p className="text-xl font-bold text-purple-700">{formData.maxCapacity || '0'}</p>
              </div>
            </div>
            {formData.meetingLink && (
              <div className="bg-white p-4 rounded-xl border border-purple-600 outline-none shadow-sm">
                <h4 className="flex items-center font-medium text-indigo-700 ">
                  <FiLink className="mr-2 text-purple-600" />Meeting Link
                </h4>
                <a href={formData.meetingLink} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline break-all flex items-center"
                >
                  <FiLink className="mr-2" /> {formData.meetingLink}
                </a>
              </div>
            )}
          </div>
          <div className="mt-8 mb-4 flex justify-end space-x-4">
            <button onClick={() => setShowPreview(false)} className="px-6 py-2 bg-white border border-purple-600 outline-none text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center"
            >
              Back
            </button>
            <button onClick={handleScheduleEvent}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition flex items-center"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PreviewEventModel