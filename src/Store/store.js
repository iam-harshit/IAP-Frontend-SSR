import pkg from '@reduxjs/toolkit';
import userReducer from '@/Reducers/userSlice';
import eventsReducer from '@/Reducers/eventsSlice';
import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import sessionReducer from '../Reducers/sessionSlice';
import storage from './storage.js';

const { configureStore, combineReducers } = pkg;

const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
  events: eventsReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
