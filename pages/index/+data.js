import { getAllSlots } from '@/services/Operations/EventsOperation.js/EventsApi';

export async function data(pageContext) {
  try {
    const eventsResponse = await getAllSlots();
    const initialState = {
      events: {
        slots: eventsResponse?.data || [],
        loading: false,
        error: null,
      },
    };
    return { initialState };
  } catch (error) {
    console.error('Error fetching data in /pages/index/+data.js:', error);
    return { initialState: {} };
  }
}
