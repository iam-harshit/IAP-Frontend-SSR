import React from 'react';
import { createRoot } from 'react-dom/client';
import { PageShell } from './PageShell';

export { render };

async function render(pageContext) {
  const { Page, pageProps } = pageContext;
  const container = document.getElementById('react-root');
  const root = createRoot(container);
  root.render(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );
}
