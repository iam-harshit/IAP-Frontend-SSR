import { useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import { AiTwotoneHome } from 'react-icons/ai';
import { TbLayoutGridFilled } from 'react-icons/tb';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdEvent } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBlogModal } from '@/Context/BlogModalContext';

export default function BottomNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setShowModal } = useBlogModal();

  const actionButtons = [
    {
      label: 'Pod',
      angle: -90,
      action: () => navigate('/create-pod'),
    },
    {
      label: 'Blog',
      angle: -135,
      action: () => {
        if (location.pathname !== '/blogs') {
          navigate('/blogs');
          setTimeout(() => setShowModal(true), 300); // delay to let page load
        } else {
          setShowModal(true);
        }
      },
    },
    {
      label: 'Event',
      angle: -45,
      action: () => navigate('/events'),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[999] bg-transparent pointer-events-none flex justify-center">
      <div className="w-full justify-center items-center bg-white rounded-t-3xl shadow-2xl">
        <div className="relative w-full bg-white   pointer-events-auto grid grid-cols-5 px-4 py-3">
          {/* Home */}
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center justify-center text-black/50 text-[10px] sm:text-[12px]"
          >
            <AiTwotoneHome size={22} />
            <span>Home</span>
          </button>

          {/* Mentors */}
          <button
            onClick={() => navigate('/explore-mentors')}
            className="flex flex-col items-center text-black/50 text-xs"
          >
            <FaChalkboardTeacher size={22} />
            <span>Mentors</span>
          </button>

          {/* Floating Action Button Center */}
          <div className="relative flex items-center justify-center">
            {/* Action Buttons Fan */}
            {isExpanded &&
              actionButtons.map((btn, idx) => {
                const radius = 70;
                const rad = (btn.angle * Math.PI) / 180;
                const x = radius * Math.cos(rad);
                const y = radius * Math.sin(rad);
                return (
                  <button
                    key={idx}
                    className="absolute bg-purple-600 text-white text-xs font-semibold py-2 px-3 rounded-full shadow-md whitespace-nowrap transition-all duration-300"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    onClick={btn.action}
                  >
                    {btn.label}
                  </button>
                );
              })}

            {/* FAB Button */}
            <button
              className="absolute top-[-20px] bg-purple-600 text-white rounded-full p-3 shadow-xl border-4 border-white"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <FiX size={20} /> : <FiPlus size={20} />}
            </button>
          </div>

          {/* Events */}
          <button
            onClick={() => navigate('/events')}
            className="flex flex-col items-center justify-center text-black/50 text-[10px] sm:text-[12px]"
          >
            <MdEvent size={22} />
            <span>Events</span>
          </button>

          {/* Dashboard */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center justify-center text-black/50 text-[10px] sm:text-[12px]"
          >
            <TbLayoutGridFilled size={22} />
            <span>Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
