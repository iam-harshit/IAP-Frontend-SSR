import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { stats } from '@/Constants/Home-Constants/stats';

function ExploreSuccessStatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className="py-16 px-4 sm:px-2 lg:px-8 md:px-4 mb-50">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#6418C3] mb-4 font-qurova">
          Numbers tell our story 🙂
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-12 px-5 lg:px-0">
          Every number represents a milestone, a story, and a step toward the
          future we're building together with dedication, vision, and heart.
        </p>
      </div>

      <div className="grid grid-cols-1 xs2:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#6418C3] font-qurova">
              {inView ? (
                <CountUp end={stat.number} duration={2.5} suffix="+" />
              ) : (
                '0'
              )}
            </h3>
            <p className="mt-4 text-base sm:text-lg md:text-xl font-semibold text-gray-900">
              {stat.title}
            </p>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 ">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreSuccessStatsSection;
