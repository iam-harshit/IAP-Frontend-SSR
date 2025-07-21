import React from 'react';
import ReactDOM from 'react-dom/client';
import { PageShell } from './PageShell';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../Store/clientStore.js';

export function onRenderClient(pageContext) {
  const { Page, pageProps } = pageContext;

  // The initial state from the server is automatically handled by Redux Persist.

  ReactDOM.hydrateRoot(
    document.getElementById('root'),
    <PageShell pageContext={pageContext}>
      {/* Directly wrap the Page component with the client Provider and PersistGate */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Page {...pageProps} />
        </PersistGate>
      </Provider>
    </PageShell>
  );
}
