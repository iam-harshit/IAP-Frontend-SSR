import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/Reducers/rootReducer';

/**
 * Creates a new, non-persisted Redux store instance for each server-side request.
 */
export const createServerStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    // By providing the default middleware function without any options,
    // we get the most stable configuration, which includes the thunk middleware.
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};
