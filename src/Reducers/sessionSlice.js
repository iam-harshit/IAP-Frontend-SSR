import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleGetDashboardSessions } from '@/services/Operations/SessionsOperation/SessionApi';

export const fetchDashboardSessions = createAsyncThunk(
  'session/fetchDashboardSessions',
  async (params = { status: 'all', date: '' }, thunkAPI) => {
    try {
      const { status, date } = params;
      const response = await handleGetDashboardSessions(status, date);
      return {
        dashboardSessions: response?.data,
        filterStatus: status,
        selectedDate: date,
        totalCount: response?.totalCount,
        metadata: response?.metadata,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        `Failed to fetch ${params.status} dashboard sessions`
      );
    }
  }
);

const initialState = {
  sessions: [],
  cancellationPoint: null,
  loading: false,
  error: null,
  dashboardSessions: [],
  currentFilter: 'all',
  selectedDate: '',
  dashboardLoading: false,
  dashboardError: null,
  totalCount: 0,
  metadata: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCurrentFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    clearSessionError: (state) => {
      state.error = null;
      state.dashboardError = null;
    },
    resetSessionState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSessions.pending, (state) => {
        state.dashboardLoading = true;
        state.dashboardError = null;
      })
      .addCase(fetchDashboardSessions.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardSessions = action.payload.dashboardSessions || [];
        state.currentFilter = action.payload.filterStatus;
        state.selectedDate = action.payload.selectedDate || '';
        state.totalCount = action.payload.totalCount || 0;
        state.metadata = action.payload.metadata;
      })
      .addCase(fetchDashboardSessions.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardError = action.payload;
      });
  },
});

export const { setCurrentFilter, clearSessionError, resetSessionState } =
  sessionSlice.actions;
export default sessionSlice.reducer;
