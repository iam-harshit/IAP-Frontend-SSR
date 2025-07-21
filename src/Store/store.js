import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Import the thunk middleware
import rootReducer from '@/Reducers/rootReducer';

/**
 * Creates a new, non-persisted Redux store instance for each server-side request.
 * This version uses the original, stable Redux core functions to bypass the
 * @reduxjs/toolkit `configureStore` bug in the SSR environment.
 */
export const createServerStore = (preloadedState) => {
  // We use the classic Redux pattern here
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk) // Apply the thunk middleware for async actions
  );
  return store;
};
