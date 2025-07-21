import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/Reducers/rootReducer';

// This file is ONLY for the server.

/**
 * Creates a new, non-persisted Redux store instance for each server-side request.
 * This is the final, correct version.
 */
export const createServerStore = (preloadedState) => {
  console.log("Hello, I'm in");
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    // By completely OMITTING the 'middleware' key, we force Redux Toolkit
    // to use its absolute internal default. This is the most stable option
    // in a conflicting SSR environment and still includes the thunk middleware.
  });
};
