import { useState } from 'react';
import {FaTimes } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
const TagInput = ({ label, tags, setTags }) => {

  const [input, setInput] = useState('');
  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
        setInput('');
      }
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full mb-6">
      <label className="block font-semibold text-lg text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap items-center border border-gray-300 rounded-md px-2 py-2 min-h-[46px] shadow-sm hover:border-customPurple focus-within:border-customPurple">
        {tags.map((tag, index) => (
          <div key={index}   className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm">
            {tag}
           <IoCloseSharp
                         className="cursor-pointer hover:text-red-500"
              onClick={() => removeTag(index)}
            />
          </div>
        ))}
        <input
          type="text"
          className="flex-grow min-w-[120px] border-none focus:outline-none px-2 py-1 text-sm"
          placeholder="Type and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};


export default TagInput;