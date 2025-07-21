import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // This import is safe here
import rootReducer from '@/Reducers/rootReducer';

// This file is ONLY for the client.

const clientPersistConfig = {
  key: 'root',
  storage, // Uses the real browser storage
  whitelist: ['user'],
};

const persistedReducer = persistReducer(clientPersistConfig, rootReducer);

// This is the fully configured, persisted store for the browser.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],
      },
    }),
});

// This is the persistor for the client-side store.
export const persistor = persistStore(store);
