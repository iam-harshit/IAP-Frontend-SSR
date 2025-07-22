import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Correctly import from your MentorsApi file
import { handleMentors } from '@/services/Operations/MentorsOperation/MentorsApi';

// This async thunk will fetch the mentors. It's used on the client-side for pagination, etc.
export const fetchAllMentors = createAsyncThunk(
  'mentors/fetchAll',
  async (page = 1, { rejectWithValue }) => {
    try {
      // The response from handleMentors is the data object itself
      const responseData = await handleMentors(page);
      return responseData; // e.g., { mentors: [...], metadata: {...} }
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

const initialState = {
  list: [],
  metadata: {},
  loading: false,
  error: null,
};

const mentorSlice = createSlice({
  name: 'mentors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMentors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMentors.fulfilled, (state, action) => {
        state.loading = false;
        // The API returns an object with a 'mentors' array and 'metadata'
        state.list = action.payload.mentors;
        state.metadata = action.payload.metadata;
      })
      .addCase(fetchAllMentors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mentorSlice.reducer;
