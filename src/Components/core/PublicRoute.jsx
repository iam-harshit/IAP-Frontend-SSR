// src/Components/common/PublicRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  // If logged in, redirect to dashboard
  return currentUser ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
