import React, { useEffect, useState } from 'react';
import AppLayout from '@/Components/pages/Resume-Builder/ResumeUI/AppLayout';
import DesktopView from '@/Components/pages/Resume-Builder/ResumeUI/DesktopView';
import '../index.css';
const ResumeBuilder = () => {
  const [viewSize, setViewSize] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 576) {
        setViewSize('small');
      } else if (width > 576 && width < 1024) {
        setViewSize('medium');
      } else {
        setViewSize('large');
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    // Initial check for the window size when the component mounts
    handleResize();
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="resume-scrollbar">
      {viewSize === 'large' ? <DesktopView /> : <AppLayout />}
    </div>
  );
};

export default ResumeBuilder;
