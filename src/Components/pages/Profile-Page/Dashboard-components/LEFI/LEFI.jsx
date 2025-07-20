import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import LiFiMentors from '@/Constants/Dashboard-Constants/LiFiMentors.js';
import LiFiMentees from '@/Constants/Dashboard-Constants/LiFiMentees.js';
import UserCardsDisplay from '@/Components/pages/Profile-Page/Dashboard-components/LEFI/UserCards.jsx';
import HeaderAndFilters from '@/Components/pages/Profile-Page/Dashboard-components/LEFI/HeaderAndFilters.jsx';
import './lefi.css';

const LEFI = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isMentee = currentUser?.role === 'mentee';

  const [activeTab, setActiveTab] = useState('first');
  const [users, setUsers] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(2);
  const [loadMoreCount, setLoadMoreCount] = useState(2);
  const [filters, setFilters] = useState({
    skills: false,
    experience: false,
    domain: false,
    location: '',
    personalLearning: '',
  });

  const tabs = useMemo(
    () =>
      isMentee
        ? ['Mentor Matching', 'Mentee Matching']
        : ['Mentor Matching', 'Mentee Matching'],
    [isMentee]
  );
  const currentTabTitle = useMemo(
    () => (activeTab === 'first' ? tabs[0] : tabs[1]),
    [activeTab, tabs]
  );

  useEffect(() => {
    setRowsToShow(2);
    setLoadMoreCount(2);
  }, [currentTabTitle]);

  useEffect(() => {
    if (isMentee) {
      if (activeTab === 'first') {
        setUsers(LiFiMentors);
      } else {
        setUsers(LiFiMentees);
      }
    } else {
      if (activeTab === 'first') {
        setUsers(LiFiMentors);
      } else {
        setUsers(LiFiMentees);
      }
    }
  }, [isMentee, activeTab]);

  const handleCheckboxChange = useCallback((e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }, []);

  const handleViewMore = useCallback(() => {
    setRowsToShow((prevRows) => prevRows + loadMoreCount);
  }, [loadMoreCount]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 2500) {
        setLoadMoreCount(0);
      } else if (window.innerWidth >= 1280) {
        setLoadMoreCount(3);
      } else {
        setLoadMoreCount(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-[100%] pb-[100px]">
      <HeaderAndFilters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        filters={filters}
        handleCheckboxChange={handleCheckboxChange}
        currentTabTitle={currentTabTitle}
      />
      <UserCardsDisplay users={users} rowsToShow={rowsToShow} />

      <div className="flex flex-col items-center mt-10">
        {rowsToShow * 3 < users.length && (
          <button
            onClick={handleViewMore}
            className="py-2 px-4 bg-[#F4E8FE] border-2 text-[#85888C] text-h6 border-[#9E6DFF] rounded-lg transition duration-300 hover:bg-[#EAD7FD] hover:text-[#6B3EFF] hover:border-[#6B3EFF]"
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default LEFI;
