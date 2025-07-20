import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { authEndpoints } from '@/services/BackendApis';
import { handleSignupIntentApi } from '@/services/Operations/AuthenticationOperation/AuthenticationApi';
import clsx from 'clsx';

export default function OAuth({
  authText,
  role,
  mentorshipCategory,
  isSignup,
}) {
  const handleGoogleClick = async () => {
    if (isSignup) {
      if (!role) {
        toast.error('Please select a role before signing up.');
        return;
      }
      toast.loading('Redirecting to Google...');
      try {
        // 1. Call backend to create signup intent and get token
        const token = await handleSignupIntentApi({ role, mentorshipCategory });
        if (!token) throw new Error('Failed to get signup token');

        // 2. Build Google OAuth URL with state=token
        const params = new URLSearchParams({
          prompt: 'select_account',
          response_type: 'code',
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          redirect_uri: authEndpoints.GOOGLE_CALLBACK_API,
          scope: 'profile email',
          state: token,
        });
        // 3. Redirect to Google OAuth
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
      } catch (err) {
        toast.dismiss();
        toast.error('Failed to start Google signup. Please try again.');
      }
    } else {
      // Sign-in: no role/category required, no signup intent
      toast.loading('Redirecting to Google...');
      const params = new URLSearchParams({
        prompt: 'select_account',
        response_type: 'code',
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri: authEndpoints.GOOGLE_CALLBACK_API,
        scope: 'profile email',
      });
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    }
  };

  return (
    <button
      type="button"
      className={clsx(
        authText && 'flex w-full',
        'justify-center border-none outline-none transform hover:scale-90 transition duration-200 ease-in-out'
      )}
      onClick={handleGoogleClick}
    >
      <FcGoogle className="h-6 w-6 mr-3" /> {authText ?? ''}
    </button>
  );
}