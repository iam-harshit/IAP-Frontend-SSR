import { apiConnector } from '../../ApiConnector';
import { eventEndpoints } from '../../BackendApis';

export const handleCreateEvent = async (payload) => {
  try {
    const response = await apiConnector(
      'POST',
      eventEndpoints.CREATE_EVENT_API,
      payload,
      { 'Content-Type': 'application/json' },
      null,
      true
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const handleViewEventByMentor = async () => {
  try {
    const response = await apiConnector(
      'GET',
      eventEndpoints.GET_ALL_VIEW_EVENTS_BY_MENTOR,
      null,
      { 'Content-Type': 'application/json' },
      null,
      true
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const handleScheduleEvent = async (eventId) => {
  try {
    const response = await apiConnector(
      'POST',
      eventEndpoints.CREATE_SESSION,
      { slotId: eventId },
      { 'Content-Type': 'application/json' },
      null,
      true
    );
    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to schedule event. Please try again later.',
    };
  }
};

export const handleCancelEvent = async (slotId) => {
  try {
    const response = await apiConnector(
      'DELETE',
      `${eventEndpoints.CANCEL_SLOT}/${slotId}/delete`,
      null,
      { 'Content-Type': 'application/json' },
      null,
      true
    );
    console.log('Cancel Event Response:', response);
    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to cancel event. Please try again later.',
    };
  }
};
