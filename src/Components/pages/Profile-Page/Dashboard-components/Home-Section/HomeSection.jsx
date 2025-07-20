import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  mentorActions,
  menteeActions,
} from '@/Constants/Dashboard-Constants/HomeSectionData/QuickActionsData';
import ProfileNavigation from '@/Components/pages/Profile-Page/Dashboard-components/Home-Section/ProfileNavigation';
import QuickActionSection from '@/Components/pages/Profile-Page/Dashboard-components/Home-Section/QuickActionSection';
import FormCompletionModule from '..//FormCompletionModule';
import CounterSection from '@/Components/pages/Profile-Page/Dashboard-components/Home-Section/CounterSection';
import GraphSection from '@/Components/pages/Profile-Page/Dashboard-components/Home-Section/GraphSection';
import SettingsSection from '@/Components/pages/Profile-Page/Dashboard-components/Home-Section//SettingsSection';
import ExploreCommunitySection from '@/Components/pages/Profile-Page/Dashboard-components/Home-Section//ExploreCommunitySection';
import { handleNextSession } from '@/services/Operations/DashboardOperation/DashboardApi';

const HomeSection = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [nextSessionRes, setNextSessionRes] = useState([])
  const { userName, role } = currentUser
  const isMentor = currentUser?.role === 'mentor'
  const actions = isMentor ? mentorActions : menteeActions

  // const handleNextSessionApiResponse = useCallback(async () => {
  //   try {
  //     const nextSessionResponse = await handleNextSession(userName);
  //     if (nextSessionResponse.success) {
  //       setNextSessionRes(nextSessionResponse.data);
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // }, [userName])

  // useEffect(() => {
  //   handleNextSessionApiResponse();
  // }, []);

  return (
    <div className="space-y-4 px-1">
      <div className="flex flex-col lg:flex-row gap-2 mt-2 md:mt-0">
        <div className="basis-[65%] flex flex-col gap-2 md:gap-3">
          <ProfileNavigation />
          <QuickActionSection actions={actions} />
        </div>
        <div className="basis-[35%] min-h-full">
          <FormCompletionModule UserData={currentUser} />
        </div>
      </div>
      {/*-----Counter Section-----*/}
      {nextSessionRes.length > 0 && (
        <CounterSection
          nextSessionRes={nextSessionRes}
          role={role}
          fetchNextSession={handleNextSessionApiResponse}
        />
      )}
      {/*-----Graph & Settings Section-----*/}
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-[64%_35%]">
        <div className="w-full">
          <GraphSection />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <SettingsSection />
          <ExploreCommunitySection />
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
