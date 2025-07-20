import { categories } from '@/Constants/Home-Constants/categories';
import { Link } from 'react-router-dom';

const getBackgroundColor = (title) => {
  switch (title) {
    case 'Technology':
      return '#FBEADB';
    case 'Health and Fitness':
      return '#F8E3F3';
    case 'Spirituality':
      return '#E4F6E8';
    case 'Business':
      return '#ECE3F5';
    default:
      return '#FFFFFF';
  }
};

const ExploreIAPCategoriesSection = () => {
  return (
    <div className="px-4 xs2:px-6 md:px-8 py-16 text-center">
      <h1 className="text-h4 xs2:text-h3 l-md:text-h3 md:text-h2 lg:text-h1 font-semibold text-center mb-4 leading-tight text-[#6418C3] font-qurova">
        Inspiration Compass 🎯
      </h1>

      <p className="text-caption xs2:text-h6 l-md:text-h6 md:text-h6 lg:text-h5 max-w-[98%] xs2:max-w-[86%] l-md:max-w-[69%] sm:max-w-[80%] md:max-w-[65%] lg:max-w-[55%] xl:max-w-[50%] text-[#5e5e5e] font-medium mx-auto mt-5 leading-relaxed">
        We've structured our categories into four main sections – our "Four
        Corners of Inspiration" – to focus your spark: Technology, Health and
        Fitness, Spirituality, and Business. Explore these essential domains.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8 md:gap-12 max-w-[28rem] sm:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 mt-5">
        {categories.map((item, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl overflow-hidden aspect-video shadow-lg group"
            style={{ backgroundColor: getBackgroundColor(item.title) }}
          >
            {/* Right-side background image */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="absolute inset-y-0 right-0 h-full object-contain pointer-events-none opacity-40 mix-blend-multiply z-0"
              style={{ maxWidth: '40%' }}
            />

            {/* Text overlay */}
            <div className="relative z-10 h-full w-full p-4 xs2:p-8 sm:p-4 md:p-4 lg:p-8 flex flex-col text-left">
              <div className="flex-grow">
                <h3
                  className={`xs:text-h5 sm:text-h5 md:text-h4 lg:text-h3 font-semibold font-[Poppins] ${item.color}`}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[#988F84] mt-2 xs2:mt-4 sm:mt-2 md:mt-4 lg:mt-4 text-[10px] xs:text-[12px] sm:text-[10px] md:text-[12px] lg:text-h6 font-[Poppins] font-normal leading-snug"
                  style={{ paddingRight: '45%' }}
                >
                  {item.description}
                </p>
              </div>

              <Link
                to="/explore-mentors"
                className="text-xs sm:text-caption md:text-caption lg:text-h6 text-gray-800 font-medium inline-block hover:underline font-[Poppins] mt-1 xs:mt-6 sm:mt-1 md:mt-2 lg:mt-6"
              >
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreIAPCategoriesSection;
