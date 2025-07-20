import { testimonials } from '@/Constants/testimonial';
import wavyImg from '@/assets/testimonial.svg';

const ExploreTestimonialSection = () => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="relative py-10 px-4 overflow-hidden">
      {/* Wavy Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={wavyImg}
          alt="Wavy Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-2 text-[#6418C3] font-qurova">
            We Deliver Excellence
          </h2>
          <p className="text-black max-w-2xl mx-auto mt-4 leading-relaxed">
            Authentic feedback from real people who&apos;ve trusted us — and
            continue to trust us <br /> with their growth, success, and dreams
          </p>
        </div>

        <div className="relative h-[500px] overflow-hidden">
          <div
            className="absolute w-full animate-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{
              animationDuration: '30s',
              WebkitAnimationDuration: '30s',
              animationTimingFunction: 'linear',
              WebkitAnimationTimingFunction: 'linear',
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-purple-200 transition-transform duration-300 hover:scale-105 shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={
                      testimonial.profileImage ||
                      'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/IAP-512-big-circle.png'
                    }
                    alt={testimonial.name || 'User'}
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-300 mr-4"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src =
                        'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/IAP-512-big-circle.png';
                    }}
                  />
                  <div>
                    <h4 className="font-bold text-purple-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-purple-600 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  &ldquo; {testimonial.content} &ldquo;
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => {
                    const fullStars = Math.floor(testimonial.rating);
                    const hasHalfStar =
                      testimonial.rating % 1 !== 0 && i === fullStars;

                    if (i < fullStars) {
                      return (
                        <svg
                          key={i}
                          className="w-5 h-5 fill-current text-yellow-400"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 
          9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          />
                        </svg>
                      );
                    } else if (hasHalfStar) {
                      return (
                        <svg key={i} className="w-5 h-5" viewBox="0 0 24 24">
                          <defs>
                            <linearGradient id={`halfGrad-${i}`}>
                              <stop offset="50%" stopColor="#facc15" />
                              <stop offset="50%" stopColor="#d1d5db" />
                            </linearGradient>
                          </defs>
                          <path
                            fill={`url(#halfGrad-${i})`}
                            d="M12 17.27L18.18 21l-1.64-7.03L22 
            9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 
            4.73L5.82 21z"
                          />
                        </svg>
                      );
                    } else {
                      return (
                        <svg
                          key={i}
                          className="w-5 h-5 fill-current text-gray-300"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 17.27L18.18 21l-1.64-7.03L22 
          9.24l-7.19-.61L12 2 9.19 8.63 2 
          9.24l5.46 4.73L5.82 21z"
                          />
                        </svg>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreTestimonialSection;
