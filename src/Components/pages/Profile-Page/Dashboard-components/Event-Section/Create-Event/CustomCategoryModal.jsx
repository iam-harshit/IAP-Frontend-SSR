/* eslint-disable react/prop-types */
import React from 'react'
import { FiPlus, FiX } from 'react-icons/fi'

const CustomCategoryModal = ({ setShowCustomCategoryModal, customCategoryInput, setCustomCategoryInput, handleAddCustomCategory }) => {
  return (
    <div className="fixed top-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4 py-2">
          <h3 className="text-lg font-semibold text-purple-800">Add Custom Category</h3>
          <button
            onClick={() => setShowCustomCategoryModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={customCategoryInput}
              onChange={(e) => setCustomCategoryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomCategory()}
              placeholder="Enter new category name"
              className="w-full px-4 py-3 pl-12 text-md rounded-xl border border-purple-600 outline-none shadow-sm"
              autoFocus
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
              <FiPlus className="text-xl" />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={() => setShowCustomCategoryModal(false)}
              className="px-4 py-2 text-purple-700 border border-purple-700 rounded-lg hover:bg-purple-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCustomCategory}
              disabled={!customCategoryInput.trim()}
              className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomCategoryModal