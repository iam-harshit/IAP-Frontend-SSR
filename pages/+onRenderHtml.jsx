import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { dangerouslySkipEscape, escapeInject } from 'vike/server';
import { PageShell } from '../renderer/PageShell.jsx';
import { Provider } from 'react-redux';
import { createServerStore } from '@/Store/store.js';

export async function onRenderHtml(pageContext) {
  // `pageContext.data.initialState` now comes directly from your `+data.js` file.
  const { Page, pageProps, data } = pageContext;

  // 1. Create the server store here, passing in the initial state from the data hook.
  const store = createServerStore(data.initialState);

  // 2. The store is guaranteed to be defined when passed to the Provider.
  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <Provider store={store}>
        <Page {...pageProps} />
      </Provider>
    </PageShell>
  );

  const title = pageContext.config.title || 'Inspiration App';
  const storeInitialState = store.getState();

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(storeInitialState)}</script>
      </body>
    </html>`;

  return { documentHtml };
}
