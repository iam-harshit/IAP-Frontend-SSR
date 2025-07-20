import toast from 'react-hot-toast';
import { apiConnector } from '../../ApiConnector';
import { profileEndpoints } from '../../BackendApis';
import axios from 'axios';

const {FOLLOW_USER,UNFOLLOW_USER,IS_FOLLOWING, FOLLOW_STATS,GET_PUBLIC_ROUTE,GET_COMMON_PROFILE_API, UPDATE_COMMON_PROFILE_API,UPDATE_MENTEE_PROFILE_API,UPDATE_MENTOR_PROFILE_API,GET_MY_PROFILE_API } = profileEndpoints;

// GET PROFILE OPERATION
export const handleGetProfileApi = async () => {
  // console.log(userName);
  try {
    const response = await apiConnector(
      'GET',
      `${GET_COMMON_PROFILE_API}`,
      null,
      null,
      null,
      true
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    if (error.response) {
      toast.error(error.response.data.message || 'Something went wrong!');
    } else {
      toast.error('Network error, please try again later.');
    }
  } 
};

// UPDATE COMMON PROFILE OPERATION
export const handleUpdateProfileApi = async (payload, dispatch, navigate) => {
  try {
    const response = await apiConnector(
      'POST',
      UPDATE_COMMON_PROFILE_API,
      payload,
      null,
      null,
      true
    );
    console.log(response);
    return response;
  } catch (error) {
    // console.log(error)
    return error;
  }
};


// UPDATE MENTOR PROFILE OPERATION

export const handleMentorUpdateProfileApi = async (payload) => {
  try {
    const response = await apiConnector(
      'POST',
      UPDATE_MENTOR_PROFILE_API,
      payload,
      null,
      null,
      true
    );
    console.log(response);
    return response;
  } catch (error) {
    // console.log(error)
    return error;
  }
};


// UPDATE MENTEE PROFILE OPERATION
export const handleMenteeUpdateProfileApi = async (payload) => {
  try {
    const response = await apiConnector(
      'POST',
      UPDATE_MENTEE_PROFILE_API,
      payload,
      null,
      null,
      true
    );
    console.log(response);
    return response;
  } catch (error) {
    // console.log(error)
    return error;
  }
};


export const handleMyProfileApi = async () => {
  
  try {
    const response = await apiConnector(
      'GET',
      `${GET_MY_PROFILE_API}`,
      null,
      null,
      null,
      true
    );
    return response;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    if (error.response) {
      toast.error(error.response.data.message || 'Something went wrong!');
    } else {
      toast.error('Network error, please try again later.');
    }
  } 
};

export const handleGetPublicProfileApi = async (username) => {
  try {
    const response = await apiConnector(
      'GET',
      `${GET_PUBLIC_ROUTE}/${username}`,
      null,
      null,
      null,
      true
    );
    return response;
  } catch (error) {
    console.error('Error fetching public profile:', error);
    if (error.response) {
      toast.error(error.response.data.message || 'Something went wrong!');
    } else {
      toast.error('Network error, please try again later.');
    }
  }
};


// FOLLOW A USER
export const followUser = async (targetUserId) => {
  try {
    const response = await apiConnector(
      'POST',
      `${FOLLOW_USER}/${targetUserId}`,
      null,
      { 'Content-Type': 'application/json' },
      null,
      true
    );

    return response.data; 
  } catch (err) {
    console.error('Error while following user:', err?.response?.data || err.message);
    throw err;
  }
};



// UNFOLLOW A USER
export const unfollowUser = async (userIdToUnfollow) => {
  try {
    const response = await apiConnector(
      'POST',
      `${UNFOLLOW_USER}/${userIdToUnfollow}`,
      null,
      { 'Content-Type': 'application/json' },
      null,
      true
    );

    return response.data;
  } catch (error) {
    console.error('Error unfollowing user:', error?.response?.data || error.message);
    throw error;
  }
};

// Check if the user is following another user
export const checkIsFollowing = async (targetUserId) => {
  try {
    const response = await apiConnector(
      'GET',
      `${IS_FOLLOWING}/${targetUserId}`,
      null,
      null,
      null,
      true
    );
    return response.data?.data?.isFollowing;
  } catch (error) {
    console.error('Error checking follow status:', error?.response?.data || error.message);
    return false;
  }
};

// GET FOLLOW STATS
export const getFollowStats = async (targetUserId) => {
  try {
    const response = await apiConnector(
      'GET',
      `${FOLLOW_STATS}/${targetUserId}`,
      null,
      null,
      null,
      true
    );
    return response.data?.data;
  } catch (error) {
    console.error('Error getting follow stats:', error?.response?.data || error.message);
    return { followersCount: 0, followingCount: 0 };
  }
};


