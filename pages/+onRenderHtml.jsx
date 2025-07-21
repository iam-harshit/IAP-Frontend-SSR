import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { dangerouslySkipEscape, escapeInject } from 'vike/server';
import { PageShell } from './renderer/PageShell';
import { Provider } from 'react-redux';
import { createServerStore } from '../src/Store/store';

export async function onRenderHtml(pageContext) {
  // `pageContext.data.initialState` comes directly from your `+data.js` file.
  const { Page, pageProps, data } = pageContext;

  // Defensive fallback for initialState
  const initialState =
    data &&
    typeof data === 'object' &&
    data.initialState &&
    typeof data.initialState === 'object'
      ? data.initialState
      : {};

  // 1. Create the server store here, using the initial state.
  console.error('pageContext.data:', data);
  console.error('pageContext.data.initialState:', initialState);
  const store = createServerStore(initialState);
  console.error('store:', store);

  // 2. The store is guaranteed to be defined when passed to the Provider.
  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <Provider store={store}>
        <Page {...pageProps} />
      </Provider>
    </PageShell>
  );

  const title = pageContext.config.title || 'Inspiration App';
  // Use the state from the store we just created.
  const storeInitialState = store.getState();

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head><title>${title}</title></head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(storeInitialState)}</script>
      </body>
    </html>`;

  return { documentHtml };
}
