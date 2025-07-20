import React, { useEffect } from 'react';

function Loader1() {
  useEffect(() => {
    window.history.replaceState(null, document.title, '/');

    const timer = setTimeout(() => {
      window.location.replace(
        'https://community.curiousdevelopers.in/login-now/'
      );
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleBackNavigation = (event) => {
      event.preventDefault();
      window.location.replace('/');
    };

    window.addEventListener('popstate', handleBackNavigation);

    return () => {
      window.removeEventListener('popstate', handleBackNavigation); // Cleanup
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-purple-500 to-indigo-800 h-screen text-white">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Redirecting to Sign In...</h1>
        <p className="text-lg opacity-90">Hang tight, logging you in...</p>
      </div>
      <div className="flex space-x-4 items-center">
        <div className="h-10 w-10 bg-purple-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-10 w-10 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-10 w-10 bg-purple-500 rounded-full animate-bounce"></div>
      </div>
      <div className="absolute bottom-10 text-center">
        <p className="text-sm opacity-75">
          Powered by <span className="font-semibold">Curious Ecosystem</span>
        </p>
      </div>
    </div>
  );
}

export default Loader1;
