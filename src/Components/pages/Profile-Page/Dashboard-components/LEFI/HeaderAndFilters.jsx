import React from 'react';
import FilterOptions from '@/Components/pages/Profile-Page/Dashboard-components/LEFI/FilterOptions'; 

const HeaderAndFilters = ({ activeTab, setActiveTab, tabs, filters, handleCheckboxChange, currentTabTitle }) => {
  return (
    <header className="flex flex-col gap-y-[20px] border-b-[1px] border-[#919191] p-2 xs:pt-4 md:pt-0 md:p-4">
      <div className="flex justify-between xs:justify-start xs:gap-x-[20px] items-center">
        <h3
          className={`cursor-pointer pb-[2px] border-b-2 px-2 text-h5 font-semibold xs2:text-[18px] l-md:text-h4 ${
            activeTab === 'first'
              ? 'text-[#5C3FD4] border-[#5C3FD4]'
              : 'text-gray-700 border-transparent hover:text-[#5C3FD4] hover:border-[#5C3FD4]'
          }`}
          onClick={() => setActiveTab('first')}
        >
          {tabs[0]}
        </h3>
        <h3
          className={`cursor-pointer pb-[2px] border-b-2 px-2 text-h5 font-semibold xs2:text-[18px] l-md:text-h4 ${
            activeTab === 'second'
              ? 'text-[#5C3FD4] border-[#5C3FD4]'
              : 'text-gray-700 border-transparent hover:text-[#5C3FD4] hover:border-[#5C3FD4]'
          }`}
          onClick={() => setActiveTab('second')}
        >
          {tabs[1]}
        </h3>
      </div>

      {/* Filtered By Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-4 sm:gap-x-10 mb-4">
        <h5 className="text-h5 text-[#737373] pl-2 md:pl-0">Filtered By:</h5>
        <FilterOptions filters={filters} handleCheckboxChange={handleCheckboxChange} currentTabTitle={currentTabTitle} />
      </div>
    </header>
  );
};

export default HeaderAndFilters; 