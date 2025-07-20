import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import logo from '@/assets/inspiration-logo-transparent.png';
import Mentor from '@/assets/Mentor.png';
import Mentee from '@/assets/Mentee.png';
import TechCategory from '@/assets/TechCategory.png';
import BusinessCategory from '@/assets/BusinessCategory.jpg';
import SpiritualCategory from '@/assets/SpiritualCategory.png';
import FitnessCategory from '@/assets/FitnessCategory.jpg';
import SEO from '@/Components/common/SEO';

const Content = ({ role, image, desc, onClick, isLarge, selected }) => {
  return (
    <>
      <SEO
        title="Sign Up"
        description="Join InspirationApp today! Choose your role as a Mentor or Mentee and start your journey in one of four categories: Technology, Health & Fitness, Spirituality, or Business. Empower your growth through mentorship."
        canonical="https://inspirationapp.org/sign-up"
      />

      <div
        onClick={onClick}
        className={`cursor-pointer flex gap-4 flex-col items-center border-2 rounded-2xl transition-all duration-200 
      ${
        selected
          ? 'bg-[#A798E7] text-white border-white shadow-lg'
          : 'border-[#5500C4] hover:bg-purple-300/40'
      }

        ${isLarge ? 'p-2 llg:p-4' : 'p-2 l-md:p-4 llg:p-9'}
      `}
      >
        <img
          src={image}
          alt=""
          className={`object-cover rounded-full ${isLarge ? 'w-36 h-36' : 'w-28 h-28'}`}
        />
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">{role}</p>
          <p
            className={` ${isLarge ? 'text-h6 l-md:text-h5 llg:text-h5 text-center' : 'text-h6 l-md:text-h5 llg:text-h4 font-semibold'}`}
          >
            {desc}
          </p>
        </div>
      </div>
    </>
  );
};

const SignupRole = () => {
  const [step, setStep] = useState(0); // 0 --> Role selection, 1 --> category selection, 2 --> sign up page
  const [isMentor, setIsMentor] = useState(false);
  const [category, setCategory] = useState([]);

  const handleSelectRole = (role) => {
    if (role === 'mentor') {
      setIsMentor(true);
      setStep(1);
    } else {
      setIsMentor(false);
      setStep(2);
    }
  };

  const handleSelectCategory = (cat) => {
    setCategory((prevCategory) => {
      if (prevCategory.includes(cat)) {
        return prevCategory.filter((item) => item !== cat);
      } else {
        return [...prevCategory, cat];
      }
    });
  };

  return (
    <>
      {step === 0 || step === 1 ? (
        <div className="relative w-full h-screen flex flex-col items-center bg-white">
          {/* Background Logo */}
          <div
            className="fixed inset-0 flex justify-center items-center"
            style={{
              backgroundImage: `url(${logo})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.2,
            }}
          ></div>

          {/* Foreground Content */}
          <div className=" relative z-10 w-full max-w-3xl px-3 md:px-7w md:max-w-4xl mt-7">
            {step == 1 && (
              // Mentor Category Selection Screen
              <>
                <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-80px)">
                  {/* Back to Selection*/}
                  <div className="flex justify-end w-full">
                    <button
                      className="text-black   text-caption l-md:text-h6 llg:text-h5 hover:-translate-x-2 transition-all duration-200 flex items-center text-base font-semibold hover:underline hover:font-bold"
                      onClick={() => setStep(0)}
                    >
                      <MdKeyboardArrowLeft className="size-[20px] " />
                      Back
                    </button>
                  </div>
                  <div className="flex justify-center items-center min-h-[calc(100vh-140px)]">
                    <div>
                      <div>
                        <h1 className="text-h3 l-md:text-h2 llg:text-h1 mt-10 mb-2 font-bold text-[#5C3FD4] leading-[100%]">
                          Select Category
                        </h1>
                        <span className="font-medium">
                          You can select more than one category
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-7 l-md:gap-8 llg:gap-9 mt-4 l-md:mt-8">
                        <Content
                          image={TechCategory}
                          desc="Technology"
                          onClick={() => handleSelectCategory('technology')}
                          selected={category.includes('technology')}
                        />
                        <Content
                          image={BusinessCategory}
                          desc="Business"
                          onClick={() => handleSelectCategory('business')}
                          selected={category.includes('business')}
                        />
                        <Content
                          image={SpiritualCategory}
                          desc="Spirituality"
                          onClick={() => handleSelectCategory('spirituality')}
                          selected={category.includes('spirituality')}
                        />
                        <Content
                          image={FitnessCategory}
                          desc="Health & Fitness"
                          onClick={() =>
                            handleSelectCategory('health & fitness')
                          }
                          selected={category.includes('health & fitness')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {category.length > 0 && (
                  <div className="flex justify-center mt-10">
                    <button
                      className="bg-[#5C3FD4] hover:bg-[#4A2FC2] text-white font-semibold px-6 py-2 rounded-lg transition-all"
                      onClick={() => setStep(2)}
                    >
                      Proceed
                    </button>
                  </div>
                )}
              </>
            )}

            {step == 0 && (
              <div className="text-center">
                {/* Back to Home */}
                <div className="flex justify-end w-full">
                  <Link
                    className="text-black  text-caption l-md:text-h6 llg:text-h5 hover:-translate-x-2 transition-all duration-200 flex items-center text-base font-semibold hover:underline hover:font-bold"
                    to={'/'}
                  >
                    <MdKeyboardArrowLeft className="size-[20px] " />
                    Back
                  </Link>
                </div>
                <div className="flex justify-center items-center min-h-[calc(100vh-140px)]">
                  <div>
                    <h1 className="text-h3 l-md:text-h2 llg:text-h1 font-bold text-[#5C3FD4] leading-[100%] my-10">
                      Create a New Account
                    </h1>
                    <div className="p-5 grid grid-cols-1 gap-4 llg:gap-12 sm:grid-cols-2 max-w-[650px] mx-auto">
                      <Content
                        role={'Mentor'}
                        image={Mentor}
                        desc="Shape Tomorrow’s Leaders: Sign Up to Mentor Today"
                        onClick={() => handleSelectRole('mentor')}
                        isLarge={true} // Larger images for role selection
                      />
                      <Content
                        role={'Mentee'}
                        image={Mentee}
                        desc="Your Path to Growth Starts Here: Sign Up and Learn"
                        onClick={() => handleSelectRole('mentee')}
                        isLarge={true} // Larger images for role selection
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>{step === 2 && <Signup isMentor={isMentor} category={category} />}</>
      )}
    </>
  );
};

export default SignupRole;
