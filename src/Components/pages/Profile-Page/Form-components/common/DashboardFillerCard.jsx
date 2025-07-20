import { useEffect, useRef } from 'react';
import { LuUsers } from 'react-icons/lu';
import { BsBook } from 'react-icons/bs';
import { FaPodcast } from 'react-icons/fa';
import { CiCalendar } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardFillerCard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const scrollRef = useRef(null);
  const pauseRef = useRef(false);

  const cards = [
    {
      icon: <LuUsers className="text-purple-500 text-[28px]" />,
      title: 'Explore Mentors',
      description:
        'Connect with industry experts who will guide your career journey.',
      quote: 'Your next breakthrough is one conversation away',
      quoteColor: 'text-purple-500',
      bgColor: 'bg-purple-100',
      buttonText: 'Browse Mentors',
      buttonColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      path: '/explore-mentors',
    },
    {
      icon: <BsBook className="text-orange-500 text-[28px]" />,
      title: 'Write a Blog',
      description: 'Share your knowledge and inspire others with your stories.',
      quote: 'Your ideas deserve to be heard by the world',
      quoteColor: 'text-orange-500',
      bgColor: 'bg-orange-100',
      buttonText: 'Write a Blog',
      buttonColor: 'bg-gradient-to-r from-orange-400 to-red-400',
      path: '/blogs',
    },
    {
      icon: <FaPodcast className="text-green-500 text-[28px]" />,
      title: 'Engage in Pod',
      description:
        'Team up with like-minded individuals to achieve your goals together.',
      quote: 'Great things happen when minds come together',
      bgColor: 'bg-green-100',
      quoteColor: 'text-green-500',
      buttonText: 'Join Now',
      buttonColor: 'bg-gradient-to-r from-green-400 to-teal-400',
      path: '/pods',
    },
    {
      icon: <CiCalendar className="text-pink-500 text-[28px]" />,
      title: currentUser.role === 'mentor' ? 'Create Events' : 'Attend Events',
      description:
        'Network at exclusive events and expand your professional circle.',
      quote: 'Where opportunities meet preparation',
      quoteColor: 'text-pink-500',
      bgColor: 'bg-pink-100',
      buttonText: 'Explore Events',
      buttonColor: 'bg-gradient-to-r from-pink-500 to-fuchsia-500',
      path:
        currentUser.role === 'mentor' ? '/dashboard/create-event' : '/events',
    },
  ];

  // Infinite scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId;

    const scroll = () => {
      if (!pauseRef.current) {
        container.scrollTop += 1;
        if (container.scrollTop >= container.scrollHeight / 2) {
          container.scrollTop = 0;
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const renderCards = () =>
    cards.map((card, index) => (
      <Link to={`${card.path}`} key={index}>
        <div
          onMouseEnter={() => (pauseRef.current = true)}
          onMouseLeave={() => (pauseRef.current = false)}
          className="relative rounded-xl border bg-white px-6 py-6 overflow-hidden mb-4 cursor-pointer
                     transition-all duration-500 ease-in-out hover:bg-gradient-to-br 
                     hover:from-purple-50 hover:via-purple-50 hover:to-indigo-100 hover:shadow-lg hover:scale-[1.02]"
        >
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-t-xl" />
          <button
            className={`${card.buttonColor} absolute top-4 right-4 text-white text-xs font-semibold px-3 py-1 rounded-full`}
          >
            {card.buttonText}
          </button>
          <div className="mb-4 transition-transform duration-300 ease-in-out group-hover:-translate-y-1">
            <div className={`p-3 rounded-xl ${card.bgColor} w-fit shadow-sm`}>
              {card.icon}
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-4 transition-colors duration-300 group-hover:text-purple-700">
            {card.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 transition-opacity duration-300 group-hover:opacity-90">
            {card.description}
          </p>
          <p
            className={`text-xs font-normal tracking-wide ${card.quoteColor} transition-transform duration-300 group-hover:translate-x-1`}
          >
            “{card.quote}”
          </p>
        </div>
      </Link>
    ));

  return (
    <div
      ref={scrollRef}
      className="fixed select-none right-2 xl:right-20  top-44 bottom-4 w-[90%] sm:w-[300px] md:w-[340px] lg:w-[360px] xl:w-[400px] 2xl:w-[450px] overflow-y-auto p-4 z-40 scrollbar-hide rounded-xl hidden lg:block"
    >
      <div className="space-y-6">
        {/* Double the content for seamless looping */}
        {renderCards()}
        {renderCards()}
      </div>
    </div>
  );
};

export default DashboardFillerCard;
