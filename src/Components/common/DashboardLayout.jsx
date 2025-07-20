import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '@/Components/pages/Profile-Page/Dashboard-components/DashboardHeader';
import ProfileLeftSidebar from '@/Components/pages/Profile-Page/Dashboard-components/ProfileLeftSidebar-Section/ProfileLeftSidebar';
import { useSelector } from 'react-redux';
// import { Helmet } from 'react-helmet-async';
import HelmetPkg from 'react-helmet-async';
import { useParams } from 'react-router-dom';

const DashboardLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isMentor = currentUser?.role === 'mentor';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { Helmet } = HelmetPkg;

  const { section = 'home' } = useParams();

  return (
    <div
      className={`grid grid-cols-[auto_1fr] grid-rows-[90px_1fr] md:grid-rows-[100px_1fr] ${
        section === 'home'
          ? 'bg-gray-200'
          : section === 'lefi'
            ? 'bg-[#F1F1F1] h-[100vh] md:h-auto'
            : ''
      }`}
    >
      {/*---------SEO PURPOSE ONLY---------*/}
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/*---------Sidebar Section---------*/}
      <div className="row-span-2">
        <ProfileLeftSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isMentor={isMentor}
        />
      </div>

      {/*----------Header Section-----------*/}
      <DashboardHeader
        currentUser={currentUser}
        isMentor={isMentor}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/*----------Main Content Section----------*/}

      <div
        className={`${section === 'lefi' ? '' : 'mx-2'}  mb-2  overflow-auto  md:h-[85vh] lg:h-[85vh] `}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
