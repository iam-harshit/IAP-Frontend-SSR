import React from 'react';

const FilterOptions = ({ filters, handleCheckboxChange, currentTabTitle }) => {
    
  return (
    <ul className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 mt-2 md:mt-0">
      <li className="mr-2 sm:mr-0">
        <label className="flex items-center cursor-pointer space-x-2 text-sm sm:text-base">
          <input
            type="checkbox"
            name="skills"
            checked={filters.skills}
            onChange={handleCheckboxChange}
            className="hidden peer"
          />
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm bg-[#EEDCFF] border-[0.7px] border-[#6F00FF] peer-checked:bg-[url('../../../../../../src/assets/DashboardAssets/checked.png')] bg-center bg-no-repeat bg-contain"></div>
          <span className="text-h6 xs2:text-h5">Skills</span>
        </label>
      </li>

      {currentTabTitle === 'Mentor Matching' && (
        <>
          <li className="mr-2 sm:mr-0">
            <label className="flex items-center cursor-pointer space-x-2 text-sm sm:text-base">
              <input
                type="checkbox"
                name="experience"
                checked={filters.experience}
                onChange={handleCheckboxChange}
                className="hidden peer"
              />
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm bg-[#EEDCFF] border-[0.7px] border-[#6F00FF] peer-checked:bg-[url('../../../../../../src/assets/DashboardAssets/checked.png')] bg-center bg-no-repeat bg-contain"></div>
              <span className="text-h6 xs2:text-h5">Experience</span>
            </label>
          </li>
          <li className="mr-2 sm:mr-0">
            <label className="flex items-center cursor-pointer space-x-2 text-sm sm:text-base">
              <input
                type="checkbox"
                name="domain"
                checked={filters.domain}
                onChange={handleCheckboxChange}
                className="hidden peer"
              />
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm bg-[#EEDCFF] border-[0.7px] border-[#6F00FF] peer-checked:bg-[url('../../../../../../src/assets/DashboardAssets/checked.png')] bg-center bg-no-repeat bg-contain"></div>
              <span className="text-h6 xs2:text-h5">Domain</span>
            </label>
          </li>
        </>
      )}

      {(currentTabTitle === 'Mentee Matching') && (
        <>
          <li className="mr-2 sm:mr-0">
            <label className="flex items-center cursor-pointer space-x-2 text-sm sm:text-base">
              <input
                type="checkbox"
                name="location"
                checked={filters.location}
                onChange={handleCheckboxChange}
                className="hidden peer"
              />
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm bg-[#EEDCFF] border-[0.7px] border-[#6F00FF] peer-checked:bg-[url('../../../../../../src/assets/DashboardAssets/checked.png')] bg-center bg-no-repeat bg-contain"></div>
              <span className="text-h6 xs2:text-h5">Location</span>
            </label>
          </li>
          <li className="mr-2 sm:mr-0">
            <label className="flex items-center cursor-pointer space-x-2 text-sm sm:text-base">
              <input
                type="checkbox"
                name="personalLearning"
                checked={filters.personalLearning}
                onChange={handleCheckboxChange}
                className="hidden peer"
              />
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm bg-[#EEDCFF] border-[0.7px] border-[#6F00FF] peer-checked:bg-[url('../../../../../../src/assets/DashboardAssets/checked.png')] bg-center bg-no-repeat bg-contain"></div>
              <span className="text-h6 xs2:text-h5">Learning Goals</span>
            </label>
          </li>
        </>
      )}
    </ul>
  );
};

export default React.memo(FilterOptions);