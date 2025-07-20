import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../Store/store';
import { BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
// import * as ReactRouterDOM from 'react-router-dom';

export { PageShell };

function PageShell({ children, pageContext }) {
  if (typeof window === 'undefined') {
    // Server: StaticRouter, with Redux Provider
    return (
      <Provider store={store}>
        <StaticRouter location={pageContext.urlOriginal}>
          {children}
        </StaticRouter>
      </Provider>
    );
  }
  // Client: BrowserRouter, with Redux Provider and StrictMode
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}
