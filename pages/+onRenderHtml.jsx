import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { dangerouslySkipEscape, escapeInject } from 'vike/server';
import { PageShell } from '../renderer/PageShell';
import { Provider } from 'react-redux';
import { createServerStore } from '@/Store/store.js';
import { StaticRouter } from 'react-router-dom/server';

// 1. Import 'react-helmet-async' as suggested by the error message
import HelmetAsync from 'react-helmet-async';
const { HelmetProvider } = HelmetAsync;

export async function onRenderHtml(pageContext) {
  const { Page, pageProps, data, urlOriginal } = pageContext;

  const store = createServerStore(data?.initialState || {});
  const helmetContext = {};

  const pageHtml = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <PageShell pageContext={pageContext}>
        <StaticRouter location={urlOriginal}>
          <Provider store={store}>
            <Page {...pageProps} />
          </Provider>
        </StaticRouter>
      </PageShell>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  const storeInitialState = store.getState();

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${dangerouslySkipEscape(helmet.title.toString())}
        ${dangerouslySkipEscape(helmet.meta.toString())}
        ${dangerouslySkipEscape(helmet.link.toString())}
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
        <script>
          window.__INITIAL_STATE__ = ${dangerouslySkipEscape(JSON.stringify(storeInitialState))}
        </script>
      </body>
    </html>`;

  return { documentHtml };
}
