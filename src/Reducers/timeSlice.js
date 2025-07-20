import pkg from '@reduxjs/toolkit';
import axios from 'axios';

const { createSlice, createAsyncThunk } = pkg;

// Fetch all events
export const fetchEvents = createAsyncThunk('time/fetchEvents', async () => {
  const response = await axios.get('http://localhost:5000/api/user/calendars', {
    withCredentials: 'include',
  });
  // console.log(response?.data?.data, "fetchEvents");
  return response?.data?.data;
});

// Add a new event
export const addEvent = createAsyncThunk('time/addEvent', async (event) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/user/calendar',
      event,
      { withCredentials: 'include' }
    );
    // console.log(response?.data?.data);
    return response?.data?.data; // Ensure you return data, not the full response object
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
});

// Update an event
export const updateEvent = createAsyncThunk(
  'time/updateEvent',
  async (event) => {
    // console.log(event, "update event");
    const response = await axios.put(
      'http://localhost:5000/api/user/calendar',
      event,
      { withCredentials: 'include' }
    );
    return response?.data;
  }
);

// Delete an event
// Redux action to remove an event
export const removeEvent = createAsyncThunk('time/removeEvent', async (id) => {
  try {
    const response = await axios.delete(
      'http://localhost:5000/api/user/calendar',
      {
        data: { id }, // Send the ID in the request body
        withCredentials: true, // Include credentials if needed
      }
    );
    return response.data.data; // Return the deleted event ID or data
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error; // Rethrow to handle in the component
  }
});

const calendarSlice = createSlice({
  name: 'time',
  initialState: {
    events: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {}, // No need for local reducers since we use async actions

  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log(action.payload);
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        // console.log(action.payload);
        state?.events?.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        // console.log(action.payload) // title , start, end
        const index = state.events?.findIndex(
          (event) => event.id === action.payload.id
        );
        state.status = 'succeeded';
        if (index !== -1) {
          state.events[index] = action.payload;
        } else {
          state.status = 'failed';
        }
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log(action.payload);
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        );
      });
  },
});

export default calendarSlice.reducer;
