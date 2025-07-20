/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const BlogModalContext = createContext();

export const useBlogModal = () => useContext(BlogModalContext);

export const BlogModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <BlogModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </BlogModalContext.Provider>
  );
};
