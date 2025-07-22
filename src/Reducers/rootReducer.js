import { combineReducers } from '@reduxjs/toolkit';

// 1. Import the reducer from each of your actual slice files.
import sessionReducer from './sessionSlice';
import eventReducer from './eventsSlice';
import timeReducer from './timeSlice';
import userReducer from './userSlice';
import mentorReducer from './mentorSlice';

// 2. Combine all the imported reducers into a single rootReducer object.
// The keys used here (e.g., 'auth', 'blogs') will be the names of the state slices
// when you use useSelector, e.g., `state.auth`.
const rootReducer = combineReducers({
  session: sessionReducer,
  events: eventReducer,
  time: timeReducer,
  user: userReducer,
  mentors: mentorReducer,
});

export default rootReducer;
