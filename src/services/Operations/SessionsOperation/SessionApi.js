import dayjs from 'dayjs';
import { apiConnector } from '../../ApiConnector';
import { sessionEndPoints } from '../../BackendApis';

const { MENTEE_CANCEL_SESSION, MENTOR_CANCEL_SESSION } = sessionEndPoints;

// cancel session
export const cancelSessionById = async (sessionId, payload) => {
  try {
    const response = await apiConnector(
      'PATCH',
      `${sessionEndPoints?.SESSION_GENERAL}/${sessionId}/cancel`,
      payload,
      { 'Content-Type': 'application/json' },
      null,
      true
    );
    return response;
  } catch (error) {
    console.error('Error Cancelling Session');
    return error;
  }
};

// Get Dashboard Session
export const handleGetDashboardSessions = async (status = 'all', date = '') => {
  try {
    const params = { status };
    const dateToUse = date && date.trim() !== '' ? date : dayjs().format('YYYY-MM-DD');
    params.date = dateToUse;

    const response = await apiConnector(
      'GET',
      sessionEndPoints?.GET_DASHBOARD_SESSIONS,
      null,
      { 'Content-Type': 'application/json' },
      params,
      true
    );
    // console.log('Dashboard Sessions Response:', response);
    // console.log('Full API Response:', response);
    // console.log('Response Data:', response?.data);
    // console.log('Sessions Array:', response?.data?.data);
    return response?.data;
  } catch (error) {
    console.error('Error fetching dashboard sessions:', error);
    return error;
  }
};

export const handleRescheduleSession = async (sessionId, rescheduleData) => {
  try {
    const response = await apiConnector(
      'PATCH',
      `${sessionEndPoints?.SESSION_GENERAL}/${sessionId}/reschedule`,
      rescheduleData,
      { 'Content-Type': 'application/json' },
      null,
      true
    );
    console.log('Reschedule Response,', response?.response?.data);
    return response?.data;
  } catch (error) {
    console.error('Error rescheduling session,', error);
    return error;
  }
};

export const handleUpdateSession = async (sessionId, payload) => {
  try {
    const response = await apiConnector(
      'PUT',
      `${sessionEndPoints?.SESSION_GENERAL}/${sessionId}/update`,
      payload,
      { 'Content-Type': 'application/json' },
      null,
      true
    );
    console.log('Response', response);
        return {
      success: true,
      data: response?.data,
      message: response?.data?.message || 'Session updated successfully'
    };
  } catch (error) {
    console.error(error)
        return {
      success: false,
      message: error?.response?.data?.message || 'Failed to update session',
      error: error
    };
  }
};
