import ReactDOM from 'react-dom/client';
import App from '@/App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from '@/Store/store.js';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import { HelmetProvider } from 'react-helmet-async';
import HelmetPkg from 'react-helmet-async';

const { HelmetProvider } = HelmetPkg;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
        <Toaster />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
