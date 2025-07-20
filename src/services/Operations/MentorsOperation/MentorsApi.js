import { apiConnector } from '../../ApiConnector';
import { findMentorEndpoints, profileEndpoints } from '../../BackendApis';

// SEARCH MENTOR OPERATION
export const handleSearchMentors = async (selectedCategory, query) => {
  try {
    const response = await apiConnector(
      'GET',
      findMentorEndpoints.SEARCH_MENTORS,
      null,
      { 'Content-Type': 'application/json' },
      { category: selectedCategory, query },
      false
    );
    return response?.data?.data?.users;
  } catch (error) {
    return error;
  }
};

// FIND ALL MENTOR OPERATION
export const handleMentors = async (page = 1) => {
  try {
    const response = await apiConnector(
      'GET',
      `${findMentorEndpoints.EXPLORE_MENTORS}?page=${page}`,
      null,
      { 'Content-Type': 'application/json' },
      null,
      false
    );
    return response.data; // ✅ depending on how apiConnector is built
  } catch (error) {
    throw error;
  }
};

// INSPIRED MENTOR OPERATION


export const handleInspiredMentors = async () => {
  try {
    const response = await apiConnector(
      'GET',
      profileEndpoints.GET_INSPIRED_MENTORS_API,
      null,
      { 'Content-Type': 'application/json' },
      null,
      false
    );
    // console.log(response);
    return response?.data?.data?.users;
  } catch (error) {
    return error;
  }
};
