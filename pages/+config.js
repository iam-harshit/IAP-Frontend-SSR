import vikeReact from 'vike-react/config';

export default {
  // Inherit from the official Vike React integration
  extends: vikeReact,

  // The Wrapper property is no longer needed and should be removed.

  passToClient: ['pageProps', 'initialState', 'user', 'routeParams'],

  // Set SSR as the default rendering mode for all pages
  ssr: true,

  // Default page title
  title: 'Inspiration App',
};
