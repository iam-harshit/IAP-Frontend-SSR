import { X } from 'lucide-react';
import {useState} from 'react'
import toast from 'react-hot-toast';

const TopicsInput = ({ topics, onAddTopic, onRemoveTopic, disabled }) => {
  const [currentTopic, setCurrentTopic] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentTopic.trim()) {
        onAddTopic(currentTopic);
        setCurrentTopic('');
      }
    }
  };

  const handleAddClick = () => {
    if (currentTopic.trim()) {
      onAddTopic(currentTopic);
      setCurrentTopic('');
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs sm:text-sm font-medium text-gray-700">
        Session Topics
      </label>
      
      {/* Add Topic Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={currentTopic}
          onChange={(e) => setCurrentTopic(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a topic and press Enter"
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={handleAddClick}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium disabled:opacity-50"
          disabled={disabled || !currentTopic.trim()}
        >
          Add
        </button>
      </div>

      {/* Topics List */}
      {topics.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-600">Current topics:</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
              >
                {topic}
                <button
                  type="button"
                  onClick={() => onRemoveTopic(index)}
                  className="hover:text-blue-600 ml-1"
                  disabled={disabled}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default TopicsInput