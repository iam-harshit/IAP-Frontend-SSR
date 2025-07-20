import { getAllSlots } from '@/services/Operations/EventsOperation.js/EventsApi';
import pkg from '@reduxjs/toolkit';

const { createAsyncThunk, createSlice } = pkg;

const initialState = {
  slots: [],
  loading: false,
  error: null,
};

export const fetchSlots = createAsyncThunk(
  'events/fetchSlots',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllSlots();
      console.log(response, 'Get All Slots');
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      return error;
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSlots(state, action) {
      state.slots = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.slots = action.payload;
        state.loading = false;
      })
      .addCase(fetchSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSlots, setLoading, setError } = eventsSlice.actions;

export const selectSlots = (state) => state.events.slots;
export const selectSlotLoading = (state) => state.events.loading;
export const selectSlotError = (state) => state.events.error;

export default eventsSlice.reducer;
