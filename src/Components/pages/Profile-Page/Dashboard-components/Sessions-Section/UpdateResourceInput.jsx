import { X } from 'lucide-react';
import {useState} from 'react'
import toast from 'react-hot-toast';

const ResourcesInput = ({ resources, onAddResource, onRemoveResource, disabled }) => {
  const [currentUrl, setCurrentUrl] = useState('');
  
  const handleAddResource = () => {
    if (currentUrl.trim()) {
      // Basic URL validation
      try {
        new URL(currentUrl.trim());
        onAddResource(currentUrl);
        setCurrentUrl('');
      } catch {
        toast.error('Please enter a valid URL');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddResource();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs sm:text-sm font-medium text-gray-700">
        Session Resources
      </label>
      
      {/* Add Resource Input */}
      <div className="flex gap-2">
        <input
          type="url"
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add resource URL (https://...)"
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={handleAddResource}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium disabled:opacity-50"
          disabled={disabled || !currentUrl.trim()}
        >
          Add
        </button>
      </div>

      {/* Resources List */}
      {resources?.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-600">Current resources:</p>
          <div className="space-y-2">
            {resources?.map((resourceUrl, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">
                    <a 
                      href={resourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-blue-600 underline"
                    >
                      {resourceUrl}
                    </a>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveResource(index)}
                  className="ml-2 text-red-500 hover:text-red-700 p-1"
                  disabled={disabled}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ResourcesInput