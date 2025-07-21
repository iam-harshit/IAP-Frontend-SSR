import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEvents = createAsyncThunk('time/fetchEvents', async () => {
  const response = await axios.get('http://localhost:5000/api/user/calendars', {
    withCredentials: 'true',
  });
  return response?.data?.data;
});

export const addEvent = createAsyncThunk('time/addEvent', async (event) => {
  const response = await axios.post(
    'http://localhost:5000/api/user/calendar',
    event,
    { withCredentials: 'true' }
  );
  return response?.data?.data;
});

export const updateEvent = createAsyncThunk(
  'time/updateEvent',
  async (event) => {
    const response = await axios.put(
      'http://localhost:5000/api/user/calendar',
      event,
      { withCredentials: 'true' }
    );
    return response?.data;
  }
);

export const removeEvent = createAsyncThunk('time/removeEvent', async (id) => {
  const response = await axios.delete(
    'http://localhost:5000/api/user/calendar',
    {
      data: { id },
      withCredentials: true,
    }
  );
  return response.data.data;
});

const calendarSlice = createSlice({
  name: 'time',
  initialState: {
    events: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(
          (event) => event.id === action.payload.id
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        );
      });
  },
});

export default calendarSlice.reducer;
