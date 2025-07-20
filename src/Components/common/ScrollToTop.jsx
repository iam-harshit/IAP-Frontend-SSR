import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll main layout if available
    const layoutMain = document.querySelector('main');
    if (layoutMain) {
      layoutMain.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fallback to window
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
