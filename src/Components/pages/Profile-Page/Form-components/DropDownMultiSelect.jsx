import React, { useState, useRef, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';

const DropDownMultiSelect = ({
  formName,
  placeholder,
  ItemsArray,
  itemSelected,
  setItemSelected,
  setFormData,
}) => {
  const [expertiseInput, setExpertiseInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      [formName]: itemSelected,
    }));
  }, [itemSelected, formName, setFormData]);

  const addSkill = () => {
    if (expertiseInput.trim() && !itemSelected.includes(expertiseInput)) {
      setItemSelected([...itemSelected, expertiseInput]);
      setExpertiseInput('');
    }
  };

  return (
    <div className="my-2">
      <p className="font-semibold text-gray-700 mb-1">{formName}</p>
      <div className="border rounded-lg p-2 flex flex-wrap gap-2 items-center">
        {/* Selected skills */}
        {itemSelected.map((tag, index) => (
          <div
            key={index}
            className="bg-purple-100 text-purple-700 text-h6 px-3 py-1 rounded-full flex items-center gap-2"
          >
            {tag}
            <IoCloseSharp
              className="cursor-pointer"
              onClick={() =>
                setItemSelected(itemSelected.filter((i) => i !== tag))
              }
            />
          </div>
        ))}
        {/* Input field */}
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={expertiseInput}
            onChange={(e) => setExpertiseInput(e.target.value)}
            placeholder={placeholder}
            className="outline-none bg-transparent text-gray-600 text-h6"
          />
          <button
            onClick={addSkill}
            className="text-purple-500 p-1 rounded-full hover:bg-purple-200"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropDownMultiSelect;
