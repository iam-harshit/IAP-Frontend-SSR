/* eslint-disable react/prop-types */
import React from 'react'
import { FiPlus, FiLink, FiX } from 'react-icons/fi'

const ResourceLinks = ({
  resourceInput,
  setResourceInput,
  handleAddResource,
  resources,
  handleRemoveResource
}) => {
  return (
    <div>
      <label className="flex items-center text-md font-semibold text-indigo-800 mt-5 mb-1">
        <FiLink className="mr-2 text-purple-600 text-xl" />Resources/Notes Links
      </label>
      <div className="relative flex items-center">
        <input
          type="url"
          value={resourceInput}
          onChange={(e) => setResourceInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddResource()}
          placeholder="Add resource or notes links..."
          className="w-full px-5 py-3 pl-12 text-md rounded-xl border border-purple-600 outline-none shadow-sm"
        />
        <div className="absolute left-4 text-purple-600">
          <FiLink className="text-xl" />
        </div>
        <button
          type="button"
          onClick={handleAddResource}
          disabled={!resourceInput.trim()}
          className="absolute right-4 flex items-center justify-center w-8 h-8 bg-purple-700 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlus />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {resources?.map((resource, index) => (
          <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
            <a
              href={resource}
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-[200px] truncate hover:underline"
            >
              {resource}
            </a>
            <button
              type="button"
              onClick={() => handleRemoveResource(index)}
              className="ml-2 text-purple-600 hover:text-purple-800"
            >
              <FiX size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResourceLinks