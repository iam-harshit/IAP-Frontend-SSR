import React from 'react';
import ReactDOM from 'react-dom/client';
import { PageShell } from './PageShell';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/Store/clientStore.js'; // Imports the CLIENT-ONLY store

export function onRenderClient(pageContext) {
  const { Page, pageProps } = pageContext;

  // The client store automatically uses the `__INITIAL_STATE__` from the window.

  ReactDOM.hydrateRoot(
    document.getElementById('root'),
    <PageShell pageContext={pageContext}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Page {...pageProps} />
        </PersistGate>
      </Provider>
    </PageShell>
  );
}
