import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { CiSearch } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';

const MultiSelectInput = ({
  formName,
  formDesc,
  placeholder,
  ItemsArray,
  itemSelected,
  setItemSelected,
  allowCustomAdd = true,
}) => {
  const [langInput, setLangInput] = useState('');
  const [langMenu, setLangMenu] = useState(false);
  const inputRef = useRef(null);

  const filteredTags = ItemsArray.filter(
    (item) => item?.toLowerCase().includes(langInput.toLowerCase().trim())
    //  && !itemSelected.includes(item)
  );

  const isDisable =
    !langInput.trim() ||
    itemSelected.some(
      (item) => item.toLowerCase().trim() === langInput.toLowerCase().trim()
    );

  const handleInputChange = (e) => {
    e.preventDefault();
    let newValue = e.target.value;

    // Only allow alphabets and spaces
    if (/[^a-zA-Z\s]/.test(newValue)) {
      toast.dismiss();
      toast.error('Only alphabets are allowed.');
      return;
    }

    if (newValue.length > 15) {
      toast.dismiss();
      toast.error('Max limit of 15 characters.');
      return;
    }

    setLangInput(newValue.trimStart());
    setLangMenu(true);
  };

  const handleAdd = (value) => {
    if (!value || isDisable) return;
    setItemSelected((prev) => [...prev, value]);
    setLangInput('');
    setLangMenu(false);
  };

  return (
    <div className="my-4">
      <p className="font-semibold text-sm text-gray-700 mb-2">{formName}</p>
      <p className="text-sm text-gray-500 mb-3">{formDesc}</p>

      {itemSelected?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {itemSelected.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm"
            >
              {tag}
              <IoCloseSharp
                className="cursor-pointer hover:text-red-500"
                onClick={() =>
                  setItemSelected(itemSelected.filter((i) => i !== tag))
                }
              />
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <div className="flex items-center gap-2 border border-gray-300 focus-within:border-purple-500 rounded-lg px-3 py-2 bg-white shadow-sm transition">
          <CiSearch className="text-xl text-purple-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={langInput}
            onChange={handleInputChange}
            onFocus={() => setLangMenu(true)}
            onBlur={() => {
              setTimeout(() => setLangMenu(false), 100);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isDisable) {
                e.preventDefault();
                handleAdd(langInput);
              }
            }}
            className="w-full outline-none text-sm text-gray-800"
          />

          {allowCustomAdd && (
            <button
              className="text-white rounded-md m-[3px] cursor-pointer bg-customPurple hover:bg-[#4e2fcd] md:rounded-md  font-medium  text-h6 px-3 py-2 text-center"
              disabled={isDisable}
              onClick={() => {
                if (isDisable) return;
                setItemSelected((prev) =>
                  Array.isArray(prev) ? [...prev, langInput] : [langInput]
                );
                setLangInput('');
                inputRef.current?.focus();
                setLangMenu(true);
              }}
            >
              Add
            </button>
          )}
        </div>

        {langMenu && filteredTags.length > 0 && (
          <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
            {filteredTags.map((tag) => (
              <li
                key={tag}
                className="p-2 cursor-pointer hover:bg-purple-50 hover:text-customPurple rounded-md w-full"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setItemSelected((prev) =>
                    Array.isArray(prev) ? [...prev, tag] : [tag]
                  );
                  setLangInput('');
                  setLangMenu(false);
                  inputRef.current?.blur();
                }}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultiSelectInput;
