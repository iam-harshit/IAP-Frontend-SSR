/* eslint-disable react/prop-types */
import React from 'react'
import { FiBook, FiCalendar, FiEye } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const ActionButtons = ({ handleViewEvent, handleScheduleEvent }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-end pt-8">
      <button
        onClick={handleViewEvent}
        className="px-4 py-3 bg-white border border-purple-600 text-purple-600 bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 hover:text-white text-md font-semibold rounded-lg  transition flex items-center justify-center"
      >
        <FiEye className="mr-2" /> Preview
      </button>
      <div className="flex">
        <Link
          to="/"
          className="px-4 w-full py-3 bg-white border border-purple-600 text-purple-600 bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 hover:text-white text-md font-semibold rounded-lg  transition flex items-center justify-center"
        >
          <FiBook className="mr-2" /> View
        </Link>
      </div>
      <button
        onClick={handleScheduleEvent}
        className={"px-4 py-3 text-md font-semibold rounded-lg transition flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"}
      >
        <FiCalendar className="mr-2" /> Create
      </button>
    </div>
  )
}

export default ActionButtons