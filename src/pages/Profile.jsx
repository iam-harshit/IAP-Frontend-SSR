import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProfilePage from '@/Components/pages/Profile-Page/ProfilePage.jsx';
import Loader from '@/Components/common/Loader.jsx';
import ProfileNotFound from '@/Components/pages/Profile-Page/ProfilePage-components/ProfileNotFound.jsx';

import { handleGetPublicProfileApi } from '@/services/Operations/ProfileOperation/ProfilePageApi.js';

const Profile = ({ isCurrentUser }) => {
  const { userName } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);

  const getProfileData = async () => {
    try {
      setLoading(true);
      let response;

      if (isCurrentUser) {
        if (currentUser) {
          setUserData(currentUser);
        } else {
          setUserData(null);
        }
      } else {
        response = await handleGetPublicProfileApi(userName);
        if (response?.status) {
          setUserData(response?.data?.data);
        } else {
          setUserData(null);
        }
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProfileData();
  }, [userName, currentUser, isCurrentUser]);

  return (
    <div>
      {!loading ? (
        <>
          {userData ? (
            <ProfilePage userData={userData} isCurrentUser={isCurrentUser} />
          ) : (
            <ProfileNotFound />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Profile;
