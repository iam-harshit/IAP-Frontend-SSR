import {
  FaAward,
  FaUsers,
  FaChartLine,
  FaHandHoldingHeart,
} from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/Components/common/SEO';

const WhyUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Why Us"
        description="InspirationApp is a mentor-led platform dedicated to empowering individuals through personalized guidance and community support. Our mission is to ignite your journey toward success with passion and purpose."
        canonical="https://inspirationapp.org/why-us"
      />
      <div className="min-h-screen bg-gray-50 font-poppins">
        {/* Hero Section */}
        <section className="relative py-4 xl:py-16 bg-gradient-to-br from-purple-600 to-indigo-700">
          <div className="container mx-auto px-4 llg:px-72 text-center">
            <h1 className="text-h4 xs2:text-h3 llg:text-h1 font-bold text-white mb-3 animate-fade-in">
              Why Choose Inspiration APP?
            </h1>
            <p className="text-caption xs2:text-p text-white opacity-90">
              Discover the unique advantages that make us the premier choice for
              mentorship and professional growth
            </p>
          </div>
        </section>

        {/* Key Differentiators */}
        <section className="py-3 l-md:py-7 bg-white">
          <div className="container mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 l-md:gap-8 mb-16">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="w-10 h-10 l-md:w-12 l-md:h-12 llg:w-16 llg:h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4 llg:mb-6">
                  <FaAward className="text-purple-600 text-h4 llg:text-h2" />
                </div>
                <h3 className="text-h5 llg:text-h3 font-bold mb-2 llg:mb-3">
                  Proven Excellence
                </h3>
                <p className="text-gray-600 text-caption l-md:text-p llg:text-h6">
                  5+ years of transforming mentorship experiences with 95% user
                  satisfaction
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="w-10 h-10 l-md:w-12 l-md:h-12 llg:w-16 llg:h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 llg:mb-6">
                  <FaUsers className="text-blue-600 text-h4 llg:text-h2" />
                </div>
                <h3 className="text-h5 llg:text-h3 font-bold mb-2 llg:mb-3">
                  Expert Network
                </h3>
                <p className="text-gray-600 text-caption l-md:text-p llg:text-h6">
                  Access 10,000+ verified mentors across 50+ industries
                  worldwide
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="w-10 h-10 l-md:w-12 l-md:h-12 llg:w-16 llg:h-16 bg-pink-100 rounded-xl flex items-center justify-center mb-4 llg:mb-6">
                  <GiProgression className="text-pink-600 text-h4 llg:text-h2" />
                </div>
                <h3 className="text-h5 llg:text-h3 font-bold mb-2 llg:mb-3">
                  Tangible Results
                </h3>
                <p className="text-gray-600 text-caption l-md:text-p llg:text-h6">
                  83% of mentees report career advancement within 6 months
                </p>
              </div>
            </div>

            {/* Unique Approach */}
            <div className="flex flex-wrap items-center -mx-4 mb-16">
              <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                  alt="Collaborative environment"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <h2 className="text-h4 llg:text-h3 font-bold text-gray-800 mb-6">
                  Our Unique Approach to Mentorship
                </h2>
                <div className="space-y-6">
                  {/* Approach 1 */}
                  <div className="flex items-start">
                    <div className="mr-6">
                      <div className="w-12 h-12 llg:w-16 llg:h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FaHandHoldingHeart className="text-purple-600 text-xl" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-h5 llg:h4 font-semibold mb-2">
                        Personalized Matching
                      </h3>
                      <p className="text-gray-600 text-caption l-md:text-p">
                        AI-powered algorithm ensures optimal mentor-mentee
                        compatibility
                      </p>
                    </div>
                  </div>

                  {/* Approach 2 */}
                  <div className="flex items-start">
                    <div className="mr-6">
                      <div className="w-12 h-12 llg:w-16 llg:h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaChartLine className="text-blue-600 text-xl" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-h5 llg:h4 font-semibold mb-2">
                        Progress Tracking
                      </h3>
                      <p className="text-gray-600 text-caption l-md:text-p">
                        Real-time analytics and milestone tracking for
                        measurable growth
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison */}
            <div className="bg-gray-50 rounded-2xl p-6 llg:p-8 shadow-inner">
              <h2 className="text-h3 llg:text-h2 font-bold text-center mb-6 llg:mb-12">
                Why We Stand Out
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Traditional */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-h5 llg:text-h4 font-semibold mb-4 text-purple-600">
                    Traditional Mentorship
                  </h3>
                  <ul className="space-y-3 text-gray-600 text-caption l-md:text-p">
                    <li className="flex items-center ">
                      <span className="mr-2 ">✖️</span> Limited accessibility
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✖️</span> Generic guidance
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✖️</span> No progress tracking
                    </li>
                  </ul>
                </div>

                {/* Our Advantage */}
                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-purple-600">
                  <h3 className="text-h5 llg:text-h4 font-semibold mb-4 text-purple-600">
                    Inspiration APP Advantage
                  </h3>
                  <ul className="space-y-3 text-gray-600 text-caption l-md:text-p">
                    <li className="flex items-center">
                      <span className="mr-2">✔️</span> Global 24/7 access
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✔️</span> Personalized matching
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✔️</span> Data-driven results
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-6 llg:py-20 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-h3 llg:text-h2 font-bold text-center mb-6 llg:mb-12">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white p-8 text-caption l-md:text-p rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <p className="text-gray-600 mb-4">
                    “The personalized mentorship I received completely
                    transformed my career trajectory. Best investment I’ve ever
                    made in my professional development!”
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                    <div>
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-sm text-gray-500">
                        Senior Product Manager
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 llg:py-20 bg-gradient-to-r from-purple-600 to-indigo-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-h4 llg:text-h2 font-bold text-white mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-caption l-md:text-p text-white opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who`%apos`ve accelerated their
              growth through our innovative mentorship platform
            </p>
            <Link to="/dashboard">
              <button className="bg-white text-caption l-md:text-p text-purple-600 px-2 llg:px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default WhyUs;
