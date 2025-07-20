/* eslint-disable react/no-unknown-property */
import React, { useEffect } from 'react';
import CardForExploreGurukulSection from '@/Components/pages/Home-Page/CardForExploreGurukulSection';

function ExploreGurukulSection() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Create floating particles
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
      // Clear existing particles to avoid duplicates
      particlesContainer.innerHTML = '';

      // Increase number of particles to 50
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full bg-purple-800 opacity-30';

        // Larger size range (5-15px)
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Faster animation (5-15s duration)
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 1;
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

        // Add some variation in color
        const colors = ['bg-purple-800', 'bg-pink-600', 'bg-indigo-600'];
        particle.classList.add(
          colors[Math.floor(Math.random() * colors.length)]
        );

        particlesContainer.appendChild(particle);
      }
    }
  }, []);

  return (
    <div className="relative overflow-hidden py-5 ">
      {/* 🌟 Floating particles background */}
      <div className="particles-container absolute inset-0 -z-10 overflow-hidden" />

      {/* 🌈 Animated mesh gradient background */}
      <div className="absolute inset-0 -z-20 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-100 via-pink-50 to-indigo-100 animate-gradient-mesh"></div>
      </div>

      {/* 🌸 Decorative floating blurred blobs */}
      <div className="absolute top-[-100px] left-[-80px] w-[300px] h-[300px] bg-purple-200  rounded-full animate-float-slow z-0" />
      <div className="absolute bottom-[-80px] right-[-60px] w-[250px] h-[250px] bg-pink-200 rounded-full animate-float-medium z-0" />

      {/* 💫 Main content */}
      <div className="relative text-center m-10 mb-5 ml-2 mr-2 animate-fade-up">
        <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-2  ">
          <span className=" bg-clip-text inline-block animate-gradient font-semibold leading-[1.27] text-[#6418C3] font-qurova">
            Inspiration App
          </span>
        </h2>

        <h2 className="font-bold tracking-tight text-gray-900 text-2xl md:text-3xl lg:text-h2 xl:text-h1 mt-2 px-2  ">
          <span className="block font-qurova">
            <span className="inline">
              Inspired by
              <span className=" inline-block relative whitespace-nowrap text-purple-600 ml-2">
                Gurukul &
                {/* <img src={gurukul} className="absolute bottom-0 left-0 w-full h-[0.58em] object-cover" /> */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute top-2/3 left-0 h-[0.58em] w-full fill-purple-500 mt-1"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
                <span className="relative mr-2 ml-1">Technology</span>
              </span>
            </span>
            <span className="inline-block text-xl font-bold tracking-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
              {' '}
              by Era
            </span>
          </span>
        </h2>
        <p className="mt-6 text-h5 lg:text-h4 font-medium text-gray-700 mx-auto px-4 py-2  ">
          Blending ancient Gurukul values with modern tech, this platform
          revives <br className="hidden xl:block" />
          the sacred guru - disciple bond to pass on wisdom, purpose,{' '}
          <br className="hidden xl:block" />
          and direction for today&apos;s generation.
        </p>

        <CardForExploreGurukulSection />
      </div>

      {/* CSS for animations - add this to your global styles */}
      <style global="true">{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(calc(var(--random-x) * 100px)) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes gradient-mesh {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        
        .animate-gradient-mesh {
          background-size: 200% 200%;
          animation: gradient-mesh 15s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default ExploreGurukulSection;
