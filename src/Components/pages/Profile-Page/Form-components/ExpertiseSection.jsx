import React, { useState, useEffect, useRef } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { IoCloseSharp } from 'react-icons/io5';

function ExpertiseSection({
  DomainExpertise,
  expertiseCategory,
  setExpertiseCategory,
  SelectedExpertise,
  setSelectExpertise,
}) {
  const CATEGORY_LIST = ['Technology', 'Design', 'Spiritual', 'Finance'];

  const [categToggle, setCategToggle] = useState(false);
  const [ExpToggle, setExpToggle] = useState(false);
  // UseRefs for handling toggles
  const catRef = useRef(null);
  const domainRef = useRef(null);

  // Below Filter is  used to Filter Domain Expertise Options based on category selected.
  const FilterTags =
    DomainExpertise[expertiseCategory]?.filter(
      (item) => item && !SelectedExpertise?.includes(item)
    ) || [];

  // Below useEffect is to handle click outside effect for Category Dropdown

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (catRef.current && !catRef.current.contains(event.target)) {
        setCategToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [categToggle]);

  // Below useEffect is to handle click outside effect for Domain Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (domainRef.current && !domainRef.current.contains(event.target)) {
        setExpToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ExpToggle]);

  // Below Function is to limit Expertise Selection to 3
  const handleExpertiseSelect = (data) => {
    if (SelectedExpertise?.length < 3) {
      setSelectExpertise([...SelectedExpertise, data]);
    } else {
      toast.error('Max 3 Preference only..');
    }
  };
  // Below function is to restrict user from selecting Domain Expertise from different Categories.
  const handleCategToggle = () => {
    if (SelectedExpertise && SelectedExpertise?.length > 0) {
      toast.error('Cannot select Items from Different Category,');
    } else {
      setCategToggle(!categToggle);
    }
  };

  return (
    <div className="my-3">
      <div className="relative inline-flex  items-center justify-left w-full">
        <hr className="w-100 h-0.5 my-3 bg-customPurple border-0" />
        <span className="absolute px-1 text-[20px] bg-white font-semibold text-customPurple">
          <h2>Select your Expertise Domain</h2>
        </span>
      </div>
      {/* Display selected Categories */}
      <div className="my-4">
        {SelectedExpertise && SelectedExpertise?.length > 0 ? (
          <div>
            <h2 className="my-3 text-gray-500">Selected Expertise:</h2>
            <div className="flex flex-row gap-2 flex-wrap">
              {SelectedExpertise?.map((tag, index) => (
                <div
                  className="rounded-full w-fit py-2.5 px-3 text-[16px] bg-customPurple text-white text-white-500
                flex items-center gap-2"
                  key={index}
                >
                  {tag}
                  <div
                    onClick={() =>
                      setSelectExpertise(
                        SelectedExpertise?.filter((i) => i !== tag)
                      )
                    }
                  >
                    <IoCloseSharp className="cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {/* Category Dropdown */}
      <div className=" w-[100%] border border-gray-500 flex flex-row items-center rounded-lg  md:p-2 sm:p-1 md:gap-2.5 ">
        <div ref={catRef}>
          <div
            onClick={() => handleCategToggle()}
            className="flex  w-[90px] md:w-[130px] py-[11px] md:py-2 md:p-1.5 cursor-pointer flex-row items-center justify-center md:justify-around bg-customPurple 
              rounded-l-md md:rounded-md text-white"
          >
            <p className="text-[11px] md:text-[14px] text-center">
              {expertiseCategory ? expertiseCategory : 'Select Category'}
            </p>
            <div>
              <IoMdArrowDropdown />
            </div>
          </div>
          <div
            className={`absolute rounded-sm p-1.5 z-10 w-[110px] border-2 border-gray-200  bg-slate-50 ${categToggle ? 'block' : 'hidden'}`}
          >
            {CATEGORY_LIST.map((catItem, index) => (
              <p
                className="cursor-pointer text-[16px]"
                key={index}
                onClick={() => {
                  setExpertiseCategory(CATEGORY_LIST[index]);
                  setCategToggle(false);
                }}
              >
                {catItem}
              </p>
            ))}
          </div>
        </div>
        {/* Input Drop down */}
        {/* Domain Expertise Dropdown */}
        <div className="relative w-full  flex flex-col ">
          <div
            className="w-full flex flex-row justify-between p-1.5"
            onClick={() => {
              setExpToggle(!ExpToggle);
            }}
          >
            <div>Select your Domains</div>
            <div>
              <RiArrowDropDownLine className="text-[25px]" />
            </div>
          </div>
          <div
            ref={domainRef}
            className={`absolute top-[120%] max-h-[200px] overflow-scroll rounded-sm p-1.5 z-10 w-full border-2 border-gray-200  bg-white ${ExpToggle ? 'block' : 'hidden'}`}
          >
            <ul>
              {FilterTags?.length ? (
                FilterTags.map((tag, index) => (
                  <li
                    onClick={() => handleExpertiseSelect(tag)}
                    className="p-1.5 cursor-pointer hover:bg-purple-50 hover:text-customPurple rounded-md w-full"
                    key={index}
                  >
                    {tag}
                  </li>
                ))
              ) : (
                <li className="p-2 text-customPurple ">
                  No options available / Try Selecting Categories
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpertiseSection;
