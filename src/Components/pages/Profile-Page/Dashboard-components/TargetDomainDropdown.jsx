import React, { useState, useEffect, useRef } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

const TargetDomainDropdown = ({ formData, setFormData }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Create a reference for the dropdown
  const options = [
    'Fitness',
    'Career',
    'Technology',
    'Business',
    'Health',
    'Personal Development',
  ];

  const handleSelect = (option) => {
    let updatedDomains;
    if (formData?.targetDomain?.includes(option)) {
      updatedDomains = formData?.targetDomain?.filter(
        (domain) => domain !== option
      );
    } else {
      updatedDomains = [...formData?.targetDomain, option];
    }
    setFormData({ ...formData, targetDomain: updatedDomains });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <label>Target Domain</label>

      {formData.targetDomain.length ? (
        <div className="bg-white relative text-xs flex flex-col flex-wrap gap-1 p-2 mb-2">
          <div className="flex flex-row gap-2 p-2 flex-wrap">
            {formData.targetDomain.map((tag) => (
              <div
                key={tag}
                className="rounded-full w-fit py-2.5 px-3 text-[16px] bg-customPurple text-white flex items-center gap-2"
              >
                {tag}
                <div
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      targetDomain: formData.targetDomain.filter(
                        (i) => i !== tag
                      ),
                    })
                  }
                >
                  <IoCloseSharp className="cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={toggleDropdown}
          className="border-customPurpleLight border-[1px] w-full mt-1 rounded px-2 py-2 text-[16px] text-left"
        >
          Select Domain
        </button>

        {dropdownVisible && (
          <div className="absolute z-50 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto">
            <ul>
              {options.filter(
                (option) => !formData.targetDomain.includes(option)
              ).length > 0 ? (
                options
                  .filter((option) => !formData.targetDomain.includes(option))
                  .map((option, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-purple-50 hover:text-customPurple"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </li>
                  ))
              ) : (
                <li className="p-2 text-gray-500">No option available</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TargetDomainDropdown;
