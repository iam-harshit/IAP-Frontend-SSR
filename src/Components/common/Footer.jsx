import { useState } from 'react';
import { Link } from 'react-router-dom';
import Inspiration_APP from '@/assets/inspiration-logo-transparent.png';
import { CiCircleChevUp } from 'react-icons/ci';
import { IoLogoGooglePlaystore, IoPeople } from 'react-icons/io5';
import { TiSocialLinkedin } from 'react-icons/ti';
import { FaGlobeAmericas } from 'react-icons/fa';
import ScrollToTop from './ScrollToTop';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const location = useLocation();
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // console.log('Email submitted:', email);
      setEmail('');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('main');

    if (scrollContainer && scrollContainer.scrollTop > 0) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  // Navigation data
  const navSections = {
    product: ['Features', 'About Us', 'Why Us'],
    support: ['Contact Us'],
    legal: [
      { text: 'Privacy Policy', path: '/privacypolicy' },
      { text: 'Terms and Conditions', path: '/termsandconditions' },
      { text: 'Refund Policy', path: '/cancellationandrefund' },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-purple-700 to-indigo-900 text-gray-100">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid lg:grid-cols-2">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/">
              <div className="flex items-center space-x-3">
                <img
                  src={Inspiration_APP}
                  className="h-12 w-12 rounded-full bg-white p-1 transform transition-transform duration-300 hover:rotate-180"
                  alt="Inspiration App Logo"
                />
                <span className="text-xl font-qurova font-[400]">
                  inspirationapp
                </span>
              </div>
            </Link>
            <p className="text-sm opacity-90">
              Connecting mentors and mentees to inspire curiosity worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.cbs.curiouscommunityapp&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white hover:text-[#6B25BB] transition-colors"
                aria-label="Google Play Store"
              >
                <IoLogoGooglePlaystore className="text-2xl" />
              </a>
              <a
                href="https://community.curiousdevelopers.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white hover:text-[#6A25BA] transition-colors"
                aria-label="Community"
              >
                <IoPeople className="text-2xl" />
              </a>
              <a
                href="https://curiousecosystem.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white hover:text-[#6825B8] transition-colors"
                aria-label="Website"
              >
                <FaGlobeAmericas className="text-2xl" />
              </a>
              <a
                href="https://www.linkedin.com/company/thecuriousorganization/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white hover:text-[#6826B8] transition-colors"
                aria-label="LinkedIn"
              >
                <TiSocialLinkedin className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="flex flex-col sm:flex-row xs:mt-5 justify-between gap-y-8 sm:gap-x-10">
            <nav aria-labelledby="product-heading" className="space-y-2">
              <h3 id="product-heading" className="text-lg font-semibold mb-2">
                Product
              </h3>
              <ul className="space-y-2">
                {navSections.product.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(' ', '-')}`}
                      onClick={ScrollToTop}
                      className="text-sm hover:text-blue-300 transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="legal-heading" className="space-y-2">
              <h3 id="legal-heading" className="text-lg font-semibold mb-2">
                Legal
              </h3>
              <ul className="space-y-2">
                {navSections.legal.map((item) => (
                  <li key={item.text}>
                    <Link
                      to={item.path}
                      target="_blank"
                      className="text-sm hover:text-blue-300 transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="support-heading" className="space-y-2">
              <h3 id="support-heading" className="text-lg font-semibold mb-2">
                Support
              </h3>
              <ul className="space-y-2">
                {navSections.support.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(' ', '-')}`}
                      onClick={ScrollToTop}
                      className="text-sm hover:text-blue-300 transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center mb-4 md:mb-0">
            © {new Date().getFullYear()} Curious Business Solutions. All rights
            reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center text-sm hover:text-blue-300 transition-colors group"
            aria-label="Scroll to top"
          >
            Back to Top
            <CiCircleChevUp className="ml-1 text-xl transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
