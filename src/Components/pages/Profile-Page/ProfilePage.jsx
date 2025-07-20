/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import '@/App.css';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import EducationSection from '@/Components/pages/Profile-Page/ProfilePage-components/EducationSection';
import WorkExpSection from '@/Components/pages/Profile-Page/ProfilePage-components/WorkExpSection';
import SlotSection from '@/Components/pages/Profile-Page/ProfilePage-components/SlotSection';
import ProfileHeader from '@/Components/pages/Profile-Page/ProfilePage-components/ProfileHeader';
import EmptyProfileSection from '@/Components/pages/Profile-Page/ProfilePage-components/EmptyProfileSection.jsx';
import Certifications from './ProfilePage-components/Certifications.jsx';
import SEO from '@/Components/common/SEO';
import Skills from '@/Components/pages/Profile-Page/ProfilePage-components/Skills.jsx';
import Languages from '@/Components/pages/Profile-Page/ProfilePage-components/Languages.jsx';
import ProfilePageFiller from '@/Components/pages/Profile-Page/ProfilePage-components/ProfilePageFiller.jsx';
import SideNavBar from '@/Components/pages/Profile-Page/ProfilePage-components/SideNavBar.jsx';
import MentorshipCategories from '@/Components/pages/Profile-Page/ProfilePage-components/MentorShipCategories.jsx';
import MentorshipOfferings from '@/Components/pages/Profile-Page/ProfilePage-components/MentorshipOfferings.jsx';
import MenteeDetails from '@/Components/pages/Profile-Page/ProfilePage-components/MenteeDetails.jsx';

const AboutSection = ({ userData, isCurrentUser }) => {
  const [workData, setWorkData] = useState([]);
  const [eduData, setEduData] = useState([]);
  const [profileRole, setProfileRole] = useState(null);
  const [showUnfollowModal, setShowUnfollowModal] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const isMentor = currentUser?.role === 'mentor';
  const slotsRef = useRef();
  useEffect(() => {
    if (location.hash === '#slots' && slotsRef.current) {
      slotsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    setProfileRole(userData?.role);
  }, [profileRole]);

  const changeSection = useCallback(
    (newSection) => {
      navigate(`/dashboard/${newSection}`);
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    if (userData) {
      const userProfile = userData;

      const work = userProfile?.experience?.filter((item) => item?.company);
      const education = userProfile?.education?.filter(
        (item) => item?.institution
      );

      if (work?.length || education?.length) {
        const sortByDate = (arr) =>
          arr?.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        setWorkData(work?.length ? sortByDate([...work]) : []);
        setEduData(education?.length ? sortByDate([...education]) : []);
      } else {
        setWorkData([]);
        setEduData([]);
      }
    }
  }, [userData]);

  // SEO Description Logic based on User Role (Mentor / Mentee)
  const generateDescription = () => {
    if (profileRole === 'mentor') {
      return `Explore ${userData?.name}'s profile, book 1:1 sessions, and learn from their expertise in various fields. Check availability and pricing for personalized sessions.`;
    } else {
      return `Explore ${userData?.name}'s profile. Connect with expert mentors and gain valuable guidance for your career and personal growth. Book 1:1 sessions and get inspired!`;
    }
  };

  return (
    <>
      <SEO
        title={`Profile | ${userData?.name} | InspirationApp`}
        description={generateDescription()}
        canonical={`https://inspirationapp.org/profile/${userData?.username}`}
        image={userData?.profilePictureURL}
        type="profile"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: userData?.name,
          url: `https://inspirationapp.org/profile/${userData?.username}`,
          image: userData?.profilePicture,
          jobTitle:
            userData?.role === 'mentor'
              ? 'Mentor at InspirationApp'
              : 'Mentee at InspirationApp',
          sameAs: userData?.socialMedia || [],
          description: generateDescription(),
        }}
      />
      <div className="bg-[#EEEEEE] min-h-[calc(100vh-90px)]">
        <div
          className={`md:p-4 p-3 2xl:w-[80%] mx-auto gap-3 grid grid-cols-1 lg:grid-cols-12  ${showUnfollowModal && 'h-[85vh] overflow-y-hidden'} `}
        >
          <div className="col-span-1 md:col-span-1 lg:col-span-8  md:px-3">
            <ProfileHeader
              userData={userData}
              isCurrentUser={isCurrentUser}
              changeSection={changeSection}
              currentUser={currentUser}
              isMentor={isMentor}
              showUnfollowModal={showUnfollowModal}
              setShowUnfollowModal={setShowUnfollowModal}
              aboutDescription={userData?.bio}
            />

            {/* Mentorship Categories */}
            {userData?.mentorDetails && (
              <MentorshipCategories
                isCurrentUser={isCurrentUser}
                mentorDetails={userData.mentorDetails}
              />
            )}

            {/* Skills section  */}
            {userData?.skills?.length > 0 ? (
              <Skills
                userData={userData}
                isCurrentUser={isCurrentUser}
                changeSection={changeSection}
              />
            ) : (
              isCurrentUser && (
                <EmptyProfileSection
                  title="Skills"
                  desc="Your skills speak for your experience — make them visible."
                />
              )
            )}

            {/* Work data start date and end date */}
            {workData && workData.length > 0 ? (
              <WorkExpSection
                workData={workData}
                isCurrentUser={isCurrentUser}
                changeSection={changeSection}
              />
            ) : (
              isCurrentUser && (
                <EmptyProfileSection
                  title="Experience"
                  desc="Your work experience reflects your skills in action — don’t leave it blank!"
                />
              )
            )}

            {/* Education data start date and end date */}
            {eduData && eduData.length > 0 ? (
              <EducationSection
                eduData={eduData}
                isCurrentUser={isCurrentUser}
                changeSection={changeSection}
              />
            ) : (
              isCurrentUser && (
                <EmptyProfileSection
                  title="Education"
                  desc="Your academic journey is part of your story — don’t leave it untold."
                />
              )
            )}
            {userData?.certifications?.length > 0 ? (
              <Certifications
                userData={userData}
                isCurrentUser={isCurrentUser}
                changeSection={changeSection}
              />
            ) : (
              isCurrentUser && (
                <EmptyProfileSection
                  title="Certifications"
                  desc="Showcase your certifications to enhance your profile."
                />
              )
            )}
            {/* Languages section */}
            {userData?.language?.length > 0 ? (
              <Languages
                userData={userData}
                isCurrentUser={isCurrentUser}
                changeSection={changeSection}
              />
            ) : (
              isCurrentUser && (
                <EmptyProfileSection
                  title="Languages"
                  desc="Showcase the languages you speak to reflect your communication strengths and global reach."
                />
              )
            )}
            {/* Mentorship Offerings */}

            {Object.values(
              userData?.mentorDetails?.offerings?.predefined || {}
            ).some((val) => val) ||
            userData?.mentorDetails?.offerings?.custom?.length > 0 ? (
              <MentorshipOfferings
                userData={userData}
                isCurrentUser={isCurrentUser}
                changeSection={changeSection}
              />
            ) : (
              isMentor &&
              isCurrentUser && (
                <EmptyProfileSection
                  title="Mentorship Offerings"
                  desc="Showcase your mentorship offerings to empower others and highlight your ability to guide with impact."
                />
              )
            )}

            {/* Mentee Sections */}
            {userData?.menteeDetails &&
            (isCurrentUser ||
              userData.menteeDetails.mentorshipNeeds?.length > 0 ||
              userData.menteeDetails.preferredMentorCategory?.length > 0 ||
              userData.menteeDetails.learningGoals?.length > 0) && (
              <MenteeDetails
                userData={userData}
                isCurrentUser={isCurrentUser}
                changeSection={changeSection}
              />
            ) }
          </div>

          {/* Right section in the profile page */}

          <div className="col-span-1  md:col-span-1 lg:col-span-4  w-full  lg:h-auto  lg:self-start lg:relative  ">
            <div className="p-0 grid gap-3 grid-cols-1 lg:grid-cols-1 justify-items-center lg:fixed lg:h-full lg:max-h-full lg:pr-3 lg:pb-32 lg:overflow-y-auto scrollbar-hide">
              <div
                ref={slotsRef}
                className={`w-full flex flex-col lg:items-center gap-3 ${
                  location.pathname.startsWith('/profile')
                    ? 'md:flex-row md:px-[15px] lg:px-1 md:justify-between lg:flex-col 2xl:justify-start '
                    : ''
                }`}
              >
                {profileRole === 'mentor' && (
                  <div ref={slotsRef} className="w-full">
                    <SlotSection
                      userData={userData}
                      isCurrentUser={isCurrentUser}
                      isMentor={isMentor}
                      changeSection={changeSection}
                    />
                  </div>
                )}
                <ProfilePageFiller isMentor={isMentor} />
                <SideNavBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

AboutSection.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default AboutSection;
