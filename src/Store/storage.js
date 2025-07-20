// src/Store/storage.js

let storage;

if (typeof window !== 'undefined') {
  // Only import localStorage-based storage in the browser
  storage = require('redux-persist/lib/storage').default;
} else {
  // Noop storage for SSR
  storage = {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
}

export default storage;
