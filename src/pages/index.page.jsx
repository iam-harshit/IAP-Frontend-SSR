import { useState, useEffect } from 'react';
import { DotBackgroundDemo } from '@/Components/ui/Aurora-bg';
import WordRotate from '@/Components/ui/Word-Rotate';
import ImpactingMentorsHero from '@/Components/pages/Home-Page/ImpactingMentorsSlidersHero';
import { Link } from 'react-router-dom';
import SEO from '@/Components/common/SEO';
import CardSlider from '@/Components/pages/Home-Page/horizontalslidercards';
import ExploreIAPSection from '@/Components/pages/Home-Page/ExploreIAPSection';
import ExploreIAPCategoriesSection from '@/Components/pages/Home-Page/ExploreIAPCategoriesSection';
import IAPOnboardingStepsSection from '@/Components/pages/Home-Page/SuccessSteps/IAPOnboardingStepsSection.jsx';
import ExploreChaturAISection from '@/Components/pages/Home-Page/ExploreChaturAISection';
import ExploreStartupDirectorySection from '@/Components/pages/Home-Page/ExploreStartupDirectorySection';
import ExploreGurukulSection from '@/Components/pages/Home-Page/ExploreGurukulSection';
import ExploreSuccessStatsSection from '@/Components/pages/Home-Page/ExploreSuccessStatsSection';
import ExploreTestimonialSection from '@/Components/pages/Home-Page/ExploreTestimonialSection';
import IAPFAQSection from '@/Components/pages/Home-Page/IAPFAQSection';
import OfferingsToggle from '@/Components/pages/Home-Page/OfferingsToggle';
import AchievementsSection from '@/Components/pages/Home-Page/Achivements/AchievementsSection';

const Page = () => {
  // const [isModalOpen, setIsModalOpen] = useState(true);
  const [categoriesDropDown, setCategoriesDropdown] = useState(false);

  const [mentors, setMentors] = useState(0);
  const [events, setEvents] = useState(0);
  const [feedback, setFeedback] = useState(0);

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  const handleDropDown = () => {
    setCategoriesDropdown(!categoriesDropDown);
  };

  const words = ['Technology', 'Spirituality', 'Health & Fitness', 'Business'];

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const intervalTime = 50; // update every 50ms
    const steps = duration / intervalTime;

    const mentorIncrement = 150 / steps;
    const eventIncrement = 300 / steps;
    const feedbackIncrement = 500 / steps;

    let currentStep = 0;

    const intervalId = setInterval(() => {
      currentStep++;
      setMentors((prev) => Math.min(Math.round(prev + mentorIncrement), 150));
      setEvents((prev) => Math.min(Math.round(prev + eventIncrement), 300));
      setFeedback((prev) =>
        Math.min(Math.round(prev + feedbackIncrement), 500)
      );

      if (currentStep >= steps) {
        clearInterval(intervalId);
      }
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <SEO
        title="InspirationApp"
        description="Inspiration App helps individuals grow personally and professionally with tools, mentorship, and a supportive community to build skills and achieve goals faster."
        canonical="https://inspirationapp.org"
      />
      <div className="overflow-hidden">
        <DotBackgroundDemo>
          <div className="w-full min-h-[30vh] relative flex flex-col md:flex-row items-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-10 gap-4 sm:gap-6 md:gap-8 mb-5">
            {/* Left Section - Text */}
            <div className="w-full md:w-1/2 gap-3 sm:gap-4 flex flex-col justify-center lg:pl-8">
              <span
                className="
                hidden sm:inline-block
                w-fit
                rounded-full
                border-2 border-purple-600
                bg-purple-100
                px-3 py-1 mb-3
                text-xs font-bold text-[#6418C3]
                shadow-sm
              "
              >
                💜 For Curious, From Curious
              </span>

              <div className="-mt-2 sm:-mt-3 md:-mt-4">
                <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-1 sm:mb-2 md:mb-3">
                  Mentorship for
                </h1>
                <div className="  text-left w-full">
                  <h1>
                    <WordRotate
                      words={words}
                      className="text-[#6418C3] font-qurova font-[400]  text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                    />
                  </h1>
                </div>
              </div>

              <p className="text-black text-xs xs:text-sm sm:text-base">
                Ready to level up? Book a{' '}
                <span className="text-xs xs:text-xs sm:text-xs md:text-sm font-bold text-[#6418C3] px-2 xs:px-1 py-0.5 whitespace-nowrap">
                  SUPERIOR SESSIONS
                </span>{' '}
                and get expert guidance
              </p>

              <div className="flex flex-row w-full xs:flex-row gap-2 sm:gap-3 md:gap-4 md:mt-5 items-stretch xs:items-center">
                <Link to="/events" className="w-full xs:w-auto">
                  <span className="relative inline-block">
                    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-purple-400"></span>
                    <button className="relative inline-block w-full xs:w-auto rounded bg-customColor backdrop-blur-md px-3 py-1.5 text-xs lg:text-sm font-semibold text-white shadow-lg transition-all duration-200 ease-in-out hover:shadow-none hover:translate-y-0.5 active:translate-y-1">
                      Book Session
                    </button>
                  </span>
                </Link>
                <Link to="/explore-mentors" className="w-full xs:w-auto">
                  <span className="relative inline-block">
                    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-purple-400"></span>
                    <button className="relative inline-block w-full xs:w-auto rounded  bg-customColor backdrop-blur-md px-3 py-1.5 text-xs lg:text-sm font-semibold text-white shadow-lg transition-all duration-200 ease-in-out hover:shadow-none hover:translate-y-0.5 active:translate-y-1">
                      Explore Mentors
                    </button>
                  </span>
                </Link>
              </div>

              <div className="flex flex-row justify-between w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-4 sm:mt-6 md:mt-8 lg:mt-10 text-center">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {mentors}+
                  </h2>
                  <p className="text-black text-xs sm:text-sm">
                    Expert Mentors
                  </p>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {events}+
                  </h2>
                  <p className="text-black text-xs sm:text-sm">
                    Completed Sessions
                  </p>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {feedback.toLocaleString()}+
                  </h2>
                  <p className="text-black text-xs sm:text-sm">
                    Positive Feedback
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - Conditional Render based on screen size */}
            <div className="w-full md:w-1/2 flex justify-center h-full mt-4 sm:mt-6 md:mt-0">
              {/* Show CardSlider on small screens only */}
              <div className="block md:hidden w-full">
                <CardSlider />
              </div>

              {/* Show ImpactingMentorsHero on medium and larger screens */}
              <div className="hidden md:flex h-full items-center justify-center">
                <ImpactingMentorsHero />
              </div>
            </div>
          </div>
        </DotBackgroundDemo>

        <div>
          <AchievementsSection />
        </div>

        <div className="mt-0">
          <ExploreIAPSection />
        </div>

        <div className="mt-0">
          <ExploreIAPCategoriesSection />{' '}
        </div>

        <div>
          <OfferingsToggle />
        </div>

        <div className="mt-20">
          <IAPOnboardingStepsSection />
        </div>

        <div className="mt-20">
          <ExploreChaturAISection />
        </div>

        <ExploreStartupDirectorySection />

        <ExploreGurukulSection />

        <ExploreSuccessStatsSection />

        <ExploreTestimonialSection />

        <IAPFAQSection />
        {/* Uncomment this if needed - Resume builder component*/}
        {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
      </div>
    </>
  );
};

export default { Page };
