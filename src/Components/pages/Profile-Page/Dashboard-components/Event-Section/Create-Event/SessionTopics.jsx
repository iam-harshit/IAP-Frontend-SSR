/* eslint-disable react/prop-types */
import React from 'react'
import { FiPlus, FiUsers, FiX } from 'react-icons/fi'
import { MdTopic } from 'react-icons/md'

const Topics = ({ topicInput, setTopicInput, handleAddTopic, topics, handleRemoveTopic }) => {
  return (
    <div>
      <label className="flex items-center text-md font-semibold text-indigo-800 mt-5 mb-1">
        <MdTopic className="mr-2 text-purple-600 text-xl" />Session Topics
      </label>
      <div className="relative flex items-center">
        <input
          type="text"
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTopic()}
          placeholder="Add session topics..."
          className="w-full px-5 py-3 pl-12 text-md rounded-xl border border-purple-600 outline-none shadow-sm"
        />
        <div className="absolute left-4 text-purple-600">  <FiUsers className="text-xl" />  </div>
        <button
          type="button"
          onClick={handleAddTopic}
          disabled={!topicInput.trim()}
          className="absolute right-4 flex items-center justify-center w-8 h-8 bg-purple-700 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlus />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {topics?.map((topic, index) => (
          <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm" >
            {topic}
            <button type="button" onClick={() => handleRemoveTopic(index)} className="ml-2 text-purple-600 hover:text-purple-800">
              <FiX size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Topics