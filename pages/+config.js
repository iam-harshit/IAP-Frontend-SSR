import vikeReact from 'vike-react/config';

export default {
  extends: vikeReact,
  passToClient: ['pageProps', 'initialState', 'user', 'routeParams'],
  ssr: true,
  title: 'Inspiration App',
};
