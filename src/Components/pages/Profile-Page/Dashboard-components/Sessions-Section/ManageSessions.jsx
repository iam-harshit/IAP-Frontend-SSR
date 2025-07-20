import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, X, ChevronDown } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import bg from '@/assets/Profile-Page/no-slot-png.png';
import dayjs from 'dayjs';

import {
  fetchDashboardSessions
} from '@/Reducers/sessionSlice';
import SessionCard from './SessionCard';
import SessionFilter from './SessionFilter';

// Custom styled Pagination
const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    color: '#6b7280',
    fontWeight: '500',
    '&:hover': {
      backgroundColor: '#f3f4f6',
    },
    '&.Mui-selected': {
      backgroundColor: '#8b5cf6',
      color: 'white',
      '&:hover': {
        backgroundColor: '#7c3aed',
      },
    },
  },
  '& .MuiPaginationItem-ellipsis': {
    color: '#9ca3af',
  },
}));

const ManageSessions = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.currentUser.role);
  const userId =useSelector((state)=>state.user?.currentUser?._id);
  // console.log("UserID>>>",userId)
  const { dashboardSessions, dashboardLoading, dashboardError, totalCount } =
    useSelector((state) => state.session);
  const [activeFilter, setActiveFilter] = useState('all');
  const mentorFilters = ['all','scheduled','cancelled', 'completed'];
  const menteeFilters = ['all', 'cancelled', 'completed','pending'];
  const filters = role === 'mentor' ? mentorFilters : menteeFilters;
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 5;

  useEffect(() => {
    // Format date for API call (Day.js)
    const dateForAPI = selectedDate ? selectedDate.format('YYYY-MM-DD') : '';
    dispatch(fetchDashboardSessions({ status: activeFilter, date: dateForAPI}));
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [dispatch, activeFilter, selectedDate]);

  // Calculate pagination
  const totalSessions = dashboardSessions?.length || 0;
  // console.log(">>>>",totalSessions)
  const totalPages = Math.ceil(totalSessions / sessionsPerPage);
    console.log("====",totalPages)

  const startIndex = (currentPage - 1) * sessionsPerPage;
  const endIndex = startIndex + sessionsPerPage;
  const currentSessions = dashboardSessions?.slice(startIndex, endIndex) || [];
  // console.log("<<<<",currentSessions)
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setShowMobileFilters(false);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    // Scroll to top of sessions list
    const sessionsContainer = document.getElementById('sessions-container');
    if (sessionsContainer) {
      sessionsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const clearDate = () => {
    setSelectedDate(null);
  };

  const clearAllFilters = () => {
    setSelectedDate(null);
    setActiveFilter('all');
    setShowMobileFilters(false);
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        {/* Header Section */}
        <div className=" md:hidden mb-8">
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-customPurple font-semibold mt-2 md:mt-0">
              My Sessions
            </h1>
            <div className="w-[180px] h-[0.5px] border-[1px] border-[#E3BBFF] mt-1"></div>
          </div>
          <p className="text-sm text-gray-500 font-semibold mt-2 mb-4">
            Manage your sessions and calls.
          </p>
        </div>

        {/* Mobile Filter Accordion */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Filter Toggle Header */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center">
                <Filter className="w-5 h-5 mr-2 text-purple-500" />
                <span className="font-semibold text-gray-800">Filters</span>
                {(selectedDate || activeFilter !== 'all') && (
                  <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                    Active
                  </span>
                )}
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  showMobileFilters ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {/* Accordion Content */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showMobileFilters ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="border-t border-gray-100 p-4">
                <SessionFilter 
                  selectedDate={selectedDate}
                  activeFilter={activeFilter}
                  filters={filters}
                  onDateChange={handleDateChange}
                  onFilterChange={handleFilterChange}
                  onClearDate={clearDate}
                  onClearAllFilters={clearAllFilters}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout: Content + Desktop Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="w-full lg:w-[70%] space-y-6" id="sessions-container">
            {/* Header Section */}
            <div className="hidden md:block mb-8">
              <div className="mb-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-customPurple font-semibold mt-2 md:mt-0">
                  My Sessions
                </h1>
                <div className="w-[180px] h-[0.5px] border-[1px] border-[#E3BBFF] mt-1"></div>
              </div>
              <p className="text-sm text-gray-500 font-semibold mt-2 mb-4">
                Manage your sessions and calls.
              </p>
            </div>

            {/* Loading State */}
            {dashboardLoading && (
              <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-sm">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-500 mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Loading your sessions...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {dashboardError && !dashboardLoading && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-500 text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Oops! Something went wrong
                  </h3>
                  <p className="text-gray-600 mb-6">{dashboardError}</p>
                  <button
                    onClick={() => dispatch(fetchDashboardSessions(activeFilter))}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-semibold transform hover:scale-105"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!dashboardLoading &&
              !dashboardError &&
              (!dashboardSessions || dashboardSessions.length === 0) && (
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={bg}
                      className="w-60 sm:w-80 h-auto object-contain mb-6"
                      alt="No sessions"
                    />
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 text-center">
                      No {activeFilter === 'all' ? '' : activeFilter} sessions found
                    </h3>
                    <p className="text-gray-500 text-center text-sm sm:text-base max-w-md">
                      {activeFilter === 'all' 
                        ? "You don't have any sessions yet. Start by creating your first session!" 
                        : `No ${activeFilter} sessions match your current filters.`
                      }
                    </p>
                  </div>
                </div>
              )}

            {/* Sessions List */}
            {!dashboardLoading && 
             !dashboardError && 
             dashboardSessions && 
             dashboardSessions.length > 0 && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                        {activeFilter === 'all' 
                          ? 'All Sessions' 
                          : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Sessions`
                        }
                      </h3>
                      <p className="text-gray-500 mt-1 text-sm sm:text-base">
                        Showing {startIndex + 1}-{Math.min(endIndex, totalSessions)} of {totalSessions} session{totalSessions !== 1 ? 's' : ''}
                        {selectedDate && (
                          <span className="block sm:inline">
                            {' '}for {selectedDate.format('MMMM DD, YYYY')}
                          </span>
                        )}
                      </p>
                    </div>
                    {totalPages > 1 && (
                      <div className="mt-4 sm:mt-0 text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Sessions Cards */}
                <div className="space-y-4 sm:space-y-6">
                  {currentSessions?.map((session, index) => (
                    <div 
                      key={session._id}
                      className="transform transition-all duration-300 hover:scale-[1.01]"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      <SessionCard 
                        session={session}
                        role={role}
                        userId={userId}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-center">
                      <StyledPagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                        sx={{
                          '& .MuiPaginationItem-root': {
                            borderRadius: '12px',
                            margin: '0 4px',
                            minWidth: '40px',
                            height: '40px',
                            fontSize: '14px',
                            fontWeight: '500',
                          },
                        }}
                      />
                    </div>
                    <div className="text-center mt-4 text-sm text-gray-500">
                      Showing {startIndex + 1}-{Math.min(endIndex, totalSessions)} of {totalSessions} sessions
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Sidebar - Filters */}
          <div className="hidden lg:block lg:w-[30%] space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                <SessionFilter 
                  selectedDate={selectedDate}
                  activeFilter={activeFilter}
                  filters={filters}
                  onDateChange={handleDateChange}
                  onFilterChange={handleFilterChange}
                  onClearDate={clearDate}
                  onClearAllFilters={clearAllFilters}
                />            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ManageSessions;