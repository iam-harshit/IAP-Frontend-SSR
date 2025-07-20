import React, { useState, useEffect } from 'react';
import Main from '@/Components/pages/AskMentor-Page/components/main/Main';
import Sidebar from '@/Components/pages/AskMentor-Page/components/sidebar/Sidebar';
import SEO from '@/Components/common/SEO';

const AskMentor = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompressed, setIsCompressed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = isCompressed ? 40 : 180;

  return (
    <>
      <SEO
        title="Ask Chatur"
        description="Ask Chatur, your AI-powered assistant from InspirationApp. Explore answers to your tech-related questions and stay ahead with the latest innovations in the digital world."
        canonical='https://inspirationapp.org/ask-chatur'
      />
      <div className="flex flex-col md:flex-row w-full overflow-hidden ">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out `}
          style={{
            width: isMobile ? '100%' : `${sidebarWidth}px`,
            position: isMobile ? 'absolute' : 'relative',
            zIndex: 10,
            minWidth: `${sidebarWidth}px`,
          }}
        >
          <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isCompressed={isCompressed}
            setIsCompressed={setIsCompressed}
          />
        </div>

        {/* Main */}
        <div
          className="flex-1 flex flex-col scroll-hide"
          style={{
            // marginLeft: !isMobile ? `${sidebarWidth}px` : '0',
            width: !isMobile ? `calc(100% - ${sidebarWidth}px)` : '100%',
          }}
        >
          <div className=" w-full md:px-4 mx-auto">
            <Main currentUser={currentUser} isCompressed={isCompressed} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AskMentor;
