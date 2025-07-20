import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '@/Reducers/userSlice';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleGetProfileApi } from '@/services/Operations/ProfileOperation/ProfilePageApi';

export default function OAuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchProfile = async () => {
      const params = new URLSearchParams(location.search);
      const errorParam = params.get('error');
      if (errorParam) {
        const decodedError = decodeURIComponent(errorParam);
        toast.error(decodedError);
        if (decodedError.includes('No account found, Please sign up first')) {
          navigate('/sign-up'); // Redirect to sign-up page for this error
        } else {
          navigate('/sign-in'); // Default redirect for other errors
        }
        return; // Exit early if there's an error
      }
      try {
        let res = await handleGetProfileApi();
        let user = res?.data?.data;
        if (user) {
          toast.success('Logged in successfully!');
          dispatch(signInSuccess(user)); // <-- Update Redux state
          navigate('/dashboard'); // Redirect to dashboard after successful login
        }
      } catch (error) {
        const msg = error?.response?.data?.message;
        if (msg && msg.includes('Profile already exists with this email')) {
          toast.error(msg);
        } else if (
          msg &&
          msg.includes('No account found, Please sign up first')
        ) {
          toast.error(msg);
          navigate('/sign-up'); // <-- Redirect to sign-up page
        } else if (msg) {
          toast.error(msg);
        } else {
          toast.error('Login failed. Try again.');
        }
        navigate('/sign-in');
      }
    };
    fetchProfile();
  }, [dispatch, navigate, location]);

  return <div>Signing you in...</div>;
}
