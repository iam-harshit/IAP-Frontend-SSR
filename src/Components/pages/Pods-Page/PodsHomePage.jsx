import React, { useEffect, useState } from 'react';
import './Pods.css';
// import bgImg from '@/assets/Pods/podsBG.png';
import podsArray from '@/Constants/pods';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PodsHomePage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 flex flex-col items-center"
      style={{ backgroundImage: `url('https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/podsPage/podsBG.webp')` }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="hidden md:block md:text-4xl lg:text-5xl font-semibold tracking-wide select-none mb-6 md:mb-10 md:mt-4"
        style={{
          color: '#374151',
        }}
      >
        Post freely.{' '}
        <span
          style={{
            background: 'linear-gradient(90deg, rgb(126, 34, 206), #7c3aed)', // Purple gradient
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '700',
          }}
        >
          Learn deeply.
        </span>{' '}
        Grow endlessly.
      </motion.h1>

      <div className="flex flex-col l-md:flex-row l-md:justify-center l-md:flex-wrap gap-6 w-[100%]">
        {podsArray.map((pod) => (
          <div
            key={pod.key}
            onClick={() => {
              isMobile && navigate(pod.link);
            }}
            className="pod-card group relative cursor-pointer w-full l-md:w-[45%] lg:w-[300px] h-80 overflow-hidden rounded-xl"
          >
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-500 md:group-hover:scale-105"
              style={{
                backgroundImage: `url(${pod.img})`,
              }}
            ></div>

            <div className="absolute inset-0 bg-black/50 lg:hidden flex flex-col justify-end p-4 text-white">
              <div className="flex items-center gap-2 ">
                <img
                  src={pod.logo}
                  alt={pod.label}
                  className="w-10  h-10 l-md:w-6 l-md:h-6 sm:w-10 sm:h-10 mb-2"
                />
                <h3 className="text-xl font-bold mb-1 l-md:text-lg sm:text-xl">
                  {pod.label}
                </h3>
              </div>
              <p className="text-sm line-clamp-2 ">{pod.description}</p>
            </div>

            <div className="hidden lg:block absolute bottom-4 left-4 z-10 transition-all duration-500 ease-in-out md:group-hover:translate-y-[-480%] lg:group-hover:translate-y-[-570%]">
              <h3 className="text-white text-xl l-md:text-2xl font-bold drop-shadow-md">
                {pod.label}
              </h3>
            </div>

            <div
              onClick={() => {
                navigate(pod.link);
              }}
              className="hidden lg:flex absolute bottom-0 left-0 w-full h-full flex-col justify-center items-start
        text-white px-4 pt-20 pb-4 bg-black/30 backdrop-blur-md
        translate-y-full opacity-0 
        group-hover:translate-y-0 group-hover:opacity-100 
        transition-all duration-300 ease-in-out rounded-xl"
            >
              <p className="mt-1">{pod.description}</p>
              <Link
                to={pod.link}
                className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded transition"
              >
                <FaExternalLinkAlt />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodsHomePage;
