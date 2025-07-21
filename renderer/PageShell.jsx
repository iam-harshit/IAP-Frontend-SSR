import React from 'react';
import { PageContextProvider } from 'vike-react/usePageContext';

// This is the final, simplified PageShell. It no longer handles the Redux Provider.
export function PageShell({ pageContext, children }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        {children}
      </PageContextProvider>
    </React.StrictMode>
  );
}
