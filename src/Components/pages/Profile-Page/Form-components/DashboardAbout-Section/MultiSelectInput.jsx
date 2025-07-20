import React, { useState, useEffect, useRef } from 'react';
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
  setFormData,
}) => {
  const [langInput, setLangInput] = useState('');
  const [langMenu, setLangMenu] = useState(false);
  const inputRef = useRef(null);

  // Initialize selected languages when component mounts or currentUser changes
  useEffect(() => {
    if (itemSelected) {
      setItemSelected(itemSelected);
    }
  }, [itemSelected, setItemSelected]);

  const filteredTags = ItemsArray.filter(
    (item) =>
      item
        ?.toLocaleLowerCase()
        ?.includes(langInput.toLocaleLowerCase()?.trim()) &&
      !itemSelected?.includes(item)
  );

  const isDisable =
    !langInput?.trim() ||
    itemSelected.some(
      (item) =>
        item?.toLocaleLowerCase()?.trim() ===
        langInput?.toLocaleLowerCase()?.trim()
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
  };
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      [formName]: itemSelected,
    }));
  }, [itemSelected, formName, setFormData]);

  return (
    <div className="my-2">
      <div className="relative my-3 inline-flex items-center justify-left w-full">
        <hr className="w-100 h-0.5 my-3 bg-customPurple border-0" />
        <span className="absolute px-2 text-sm uppercase bg-white font-semibold text-customPurple">
          <h2>Languages</h2>
        </span>
      </div>

      <div className="relative text-sm w-full">
        <div className="w-[100%] bg-[#f2f5ff] flex flex-row items-center rounded-lg justify-between md:p-3 sm:p-1 md:gap-2.5">
          <CiSearch className="text-[20px] text-customPurple" />
          <input
            ref={inputRef}
            type="text"
            value={langInput}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-[100%] rounded-lg text-xs flex-1 p-2.5 border-none outline-none focus:outline-none"
            onFocus={() => setLangMenu(true)}
            onBlur={() => setLangMenu(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isDisable) {
                e.preventDefault();
                setItemSelected([...itemSelected, langInput]);
                setLangInput('');
                setLangMenu(true);
              }
            }}
          />
          <button
            className="text-white rounded-md m-[3px] cursor-pointer bg-customPurple hover:bg-[#4e2fcd] md:rounded-md font-medium text-xs px-3 py-2 text-center"
            disabled={isDisable}
            onClick={() => {
              if (isDisable) return;
              setItemSelected([...itemSelected, langInput]);
              setLangInput('');
              inputRef.current?.focus();
              setLangMenu(true);
            }}
          >
            + Add
          </button>
        </div>

        {/* Menu */}
        {langMenu && (
          <div className="absolute left-0 top-15 w-full bg-white z-10 mt-1 max-h-52 p-1 overflow-y-auto shadow-md rounded-md scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200">
            <ul className="w-full">
              {filteredTags?.length > 0 ? (
                filteredTags.map((tag) => (
                  <li
                    key={tag}
                    className="p-2 cursor-pointer hover:bg-purple-50 hover:text-customPurple rounded-md w-full"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setItemSelected([...itemSelected, tag]);
                      setLangInput('');
                      setLangMenu(false);
                      inputRef.current?.blur();
                    }}
                  >
                    {tag}
                  </li>
                ))
              ) : (
                <li className="p-2 text-customPurple">No options available</li>
              )}
            </ul>
          </div>
        )}
        {itemSelected?.length > 0 && (
          <div className="bg-white relative text-xs flex flex-col flex-wrap gap-1 p-2 mb-2">
            <p className="text-[14px] text-slate-400 font-semibold">
              {formDesc}
            </p>
            <div className="flex flex-row gap-2 p-2 flex-wrap">
              {itemSelected.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full w-fit py-2 px-3 text-xs bg-customPurple text-white flex items-center gap-2"
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectInput;
