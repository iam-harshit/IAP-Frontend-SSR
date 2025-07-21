import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { usePageContext } from 'vike-react/usePageContext';
import { persistor, store } from '@/Store/store'; // Adjust path to your store file

export default function Wrapper({ children }) {
  const pageContext = usePageContext();
  const isClient = typeof window !== 'undefined';

  // On the server, we just use the plain Redux Provider. No persistence.
  if (!isClient) {
    return <Provider store={pageContext.store}>{children}</Provider>;
  }

  // On the client, we wrap with PersistGate to rehydrate the stored state.
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
