import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { PageShell } from './PageShell';
// Add these imports:
import { escapeInject, dangerouslySkipEscape } from 'vike/server';
import HelmetPkg from 'react-helmet-async';
const { HelmetProvider } = HelmetPkg;

export { render };

function render(pageContext) {
  const { Page, pageProps } = pageContext;
  const helmetContext = {};
  const pageHTML = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    </HelmetProvider>
  );

  // Extract head tags from helmetContext
  const { helmet } = helmetContext;
  const helmetHead =
    helmet &&
    `
    ${helmet.title?.toString() || ''}
    ${helmet.priority?.toString() || ''}
    ${helmet.meta?.toString() || ''}
    ${helmet.link?.toString() || ''}
    ${helmet.script?.toString() || ''}
    ${helmet.style?.toString() || ''}
  `;

  // Use escapeInject for the HTML template and dangerouslySkipEscape for the rendered React HTML
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>My App</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(pageHTML)}</div>
      </body>
    </html>`;

  return { documentHtml };
}
