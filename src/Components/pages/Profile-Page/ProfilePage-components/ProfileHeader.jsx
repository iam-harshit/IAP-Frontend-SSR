import React, { useState, useEffect } from 'react';
import ProfilePageHeaderImg from '@/assets/Profile-Page/profileBanner.jpg';
import Completion from '@/Components/pages/Profile-Page/ProfilePage-components/Completion';
import ProfileImage from '@/Components/pages/Profile-Page/ProfilePage-components/ProfileImage.jsx';
import ProfileHeaderActions from '@/Components/pages/Profile-Page/ProfilePage-components/ProfileHeaderActions';
import UserDetails from '@/Components/pages/Profile-Page/ProfilePage-components/UserDetails';
import UnfollowModal from '@/Components/pages/Profile-Page/ProfilePage-components/UnfollowModal';
import {
  followUser,
  unfollowUser,
  checkIsFollowing,
  getFollowStats,
} from '@/services/Operations/ProfileOperation/ProfilePageApi';

function ProfileHeader({
  userData,
  isCurrentUser,
  changeSection,
  isMentor,
  showUnfollowModal,
  setShowUnfollowModal,
  currentUser
}) {
  const { name } = userData;
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
 
  const targetUserId = userData?._id;
  useEffect(() => {
    const fetchFollowDetails = async () => {
      try {
        const [isFollowingRes, stats] = await Promise.all([
          checkIsFollowing(targetUserId),
          getFollowStats(targetUserId),
        ]);
        setIsFollowing(isFollowingRes);
        setFollowersCount(stats.followersCount);
        setFollowingCount(stats.followingCount);
      } catch (err) {
        console.error('Error fetching follow data', err);
      }
    };

    if (targetUserId) {
      fetchFollowDetails();
    }
  }, [targetUserId]);

  

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(targetUserId);
        setIsFollowing(false);
        setFollowersCount((prev) => prev - 1);
      } else {
        await followUser(targetUserId);
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Follow toggle failed:', error);
    }
  };

  const handleUnfollow = async () => {
  try {
    if (!targetUserId) {
      console.warn('Missing targetUserId');
      return;
    }

    await unfollowUser(targetUserId);
    setIsFollowing(false);
    setFollowersCount((prev) => prev - 1); 
    setShowUnfollowModal(false);
  } catch (err) {
    console.error('Unfollow failed', err);
  }
};
  return (
    <div className="rounded-xl pb-8 bg-white border shadow-md relative">
      <div className="w-full relative">
        <img
          className="h-[100px] md:h-[150px] lg:h-[200px] w-screen rounded-t-xl object-cover"
          src={ProfilePageHeaderImg}
          alt="Banner"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-start items-start w-full relative">
        <ProfileImage name={name} userData={userData} />
        <ProfileHeaderActions
          isCurrentUser={isCurrentUser}
          isFollowing={isFollowing}
          handleFollow={handleFollow}
          setShowUnfollowModal={setShowUnfollowModal}
          changeSection={changeSection}
          userData={userData}
          currentUser={currentUser}
        />
      </div>

      <UserDetails
        name={name}
        userData={userData}
        isCurrentUser={isCurrentUser}
        isMentor={isMentor}
        followersCount={followersCount}
        followingCount={followingCount}
      />

      {isCurrentUser && (
        <div className="px-4 mt-1 md:mt-3 flex flex-col-reverse items-start md:flex-row md:items-end md:justify-between">
          <Completion
            userData={userData}
            changeSection={changeSection}
            isMentor={isMentor}
          />
        </div>
      )}

      {showUnfollowModal && (
        <UnfollowModal
          name={name}
          setShowUnfollowModal={setShowUnfollowModal}
          handleUnfollow={handleUnfollow}
        />
      )}
    </div>
  );
}

export default ProfileHeader;
