import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';
import { FiPlusCircle } from 'react-icons/fi';
const DropDownMultiSelect = ({
  formName,
  formDesc,
  placeholder,
  ItemsArray,
  itemSelected,
  setItemSelected,
  setFormData,
}) => {
  // Below state is for Form Input.
  const [expertiseInput, setExpertiseInput] = useState('');

  const [ExpMenu, setExpMenu] = useState(false);
  // Below useRef is used for handling dropdown components.
  const inputRef = useRef(null);
  const toggleRef = useRef(null); // State for Category toggle
  const [categoryToggle, setCategoryToggle] = useState(false);

  // Below useEffect is to hande mousdown outside the toggle
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setCategoryToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [categoryToggle]);

  useEffect(() => {
    // Update formData with itemSelected whenever it changes
    setFormData((prev) => ({
      ...prev,
      skills: itemSelected,
    }));
  }, [itemSelected, setFormData]);

  const isDisable =
    // Check if Input is empty or only consists of whitespace characters
    !expertiseInput?.trim() ||
    itemSelected?.filter(
      (item) =>
        // Check if the current item matches the input (case insensitive)
        item?.toLocaleLowerCase()?.trim() ===
        expertiseInput?.toLocaleLowerCase()?.trim()
    )?.length;

  return (
    <div className="my-2">
      <div className="relative my-3 inline-flex  items-center justify-left w-full">
        <hr className="w-100 h-0.5 my-3 bg-customPurple border-0" />
        <span className="absolute px-2 text-sm uppercase bg-white font-semibold text-customPurple">
          <h2>Select your Skills</h2>
        </span>
      </div>
      {/* <p className="font-bold text-lg mb-3">{formName}</p> */}
      <div className="relative text-sm">
        <div className="w-[100%] bg-[#f2f5ff] flex flex-row items-center rounded-lg justify-between md:p-2 sm:p-1 md:gap-2.5">
          {/* <CiSearch className="text-[20px] text-customPurple" /> */}
          <div ref={toggleRef}></div>
          <input
            ref={inputRef}
            type="text"
            value={expertiseInput}
            onChange={(e) => setExpertiseInput(e.target.value.trimStart())}
            placeholder={placeholder}
            className="w-[100%] rounded-lg text-xs flex-1 p-2.5 border-none outline-none focus:outline-none"
            onFocus={() => setExpMenu(true)}
            onBlur={() => setExpMenu(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isDisable) {
                e.preventDefault();
                setItemSelected((prev) => [...prev, expertiseInput]);
                setExpertiseInput('');
                inputRef.current?.blur();
              }
            }}
          />
          <button
            className=" text-customPurple rounded-full md:m-[3px] cursor-pointer bg-white hover:bg-[#4e2fcd] hover:text-white md:rounded-md font-medium text-sm px-3 py-2 text-center md:border-[1px] md:border-customPurple  "
            disabled={isDisable}
            onClick={() => {
              if (isDisable) {
                return;
              }
              setItemSelected((prev) => [...prev, expertiseInput]);
              setExpertiseInput('');
              inputRef.current?.focus();
              inputRef.current?.blur();
            }}
          >
            <div className="hidden md:flex   flex-row items-center gap-2">
              <FaPlus />
              <p className="hidden md:inline-block text-xs">Add</p>
            </div>
            <div className="md:hidden text-[19px]">
              <FiPlusCircle />
            </div>
          </button>
        </div>
        {itemSelected?.length ? (
          <div className="bg-white  relative text-xs flex flex-col flex-wrap gap-1 p-2 mb-2">
            <p className="text-[14px] text-slate-400 font-semibold">
              {formDesc}
            </p>
          </div>
        ) : null}
        {/* Drop down for available skills */}

        {ExpMenu && (
          <div className="absolute left-0 top-12 w-full bg-white z-10 mt-1 max-h-52 p-1 overflow-y-auto shadow-md rounded-md scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200">
            <ul className="w-full">
              {ItemsArray?.length ? (
                ItemsArray.filter(
                  (tag) =>
                    tag.toLowerCase().includes(expertiseInput.toLowerCase()) &&
                    !itemSelected.includes(tag)
                ).map((tag, i) => (
                  <li
                    key={i}
                    className="p-2 cursor-pointer hover:bg-purple-50 hover:text-customPurple rounded-md w-full"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setExpMenu(false);
                      setItemSelected((prev) => [...prev, tag]);
                      setExpertiseInput('');
                      inputRef.current?.blur();
                    }}
                  >
                    {tag}
                  </li>
                ))
              ) : (
                <li className="p-2 text-customPurple ">No options available</li>
              )}
            </ul>
          </div>
        )}

        <div className="flex flex-row gap-2 p-2 flex-wrap ">
          {itemSelected?.map((tag, index) => {
            return (
              // Below div displays all the selected items.
              <div
                key={index}
                className="rounded-full w-fit py-2.5 px-3 text-xs bg-customPurple text-white
                    flex items-center gap-2"
              >
                {tag}
                <div
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    setItemSelected(itemSelected?.filter((i) => i !== tag))
                  }
                >
                  <IoCloseSharp className="cursor-pointer" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DropDownMultiSelect;
