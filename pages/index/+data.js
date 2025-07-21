import { getAllSlots } from '@/services/Operations/EventsOperation.js/EventsApi';

export async function data(pageContext) {
  try {
    // 1. Only fetch data from public, non-authenticated endpoints.
    const eventsResponse = await getAllSlots();

    // 2. Construct a plain JavaScript object for the initial state.
    const initialState = {
      events: {
        slots: eventsResponse?.data || [],
        loading: false,
        error: null,
      },
      // We are no longer trying to fetch authenticated 'session' data here.
    };

    return { initialState };
  } catch (error) {
    console.error(
      'Error fetching public data in /pages/index/+data.js:',
      error
    );
    // On error, return an empty state to prevent the app from crashing.
    return { initialState: {} };
  }
}
