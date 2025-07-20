import React from 'react';
import inspiration from '@/assets/inspiration_logo.png';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'; 
import { useRef } from 'react';
import teamMembers from '@/Constants/about-us-constant/aboutUs.js';
import blob from '@/assets/About-us/blob.svg';
import blob2 from '@/assets/About-us/blob2.svg';
import blob3 from '@/assets/About-us/blob3.svg';
import { useInView } from 'react-intersection-observer';
import inspiration_logo from '@/assets/inspiration_logo.png';
function AboutUs() {
  const swiperRef = useRef(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div>
      {/* Section 1 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#cfadf4] via-[#ffffff] to-[#cfadf4] text-black py-[90px] xl:py-[140px] px-4 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-12">
        {/*Blobs */}
        <img
          src={blob2}
          alt="Top Left Blob"
          className="absolute top-[-60px] left-[-80px] w-[250px] md:w-[320px] opacity-60 z-0 pointer-events-none"
        />
        <img
          src={blob3}
          alt="Bottom Right Blob"
          className="absolute bottom-[-80px] right-[-100px] w-[300px] md:w-[380px] opacity-50 z-0 pointer-events-none animate-spin-slow"
        />

        {/* SVG Curve Overlay */}
        <svg
          className="absolute bottom-[-1px] left-0 w-full h-[100px] xl:h-[150px] z-0 opacity-30"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#7750e6"
            d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,197.3C672,192,768,128,864,96C960,64,1056,64,1152,101.3C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        {/* left content */}
        <div className="relative z-10 w-full md:w-2/3">
          <h1 className="text-[50px] md:text-[60px] xl:text-[135px] font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-[#8755fc] via-[#6f1bec] to-[#5c0cfb] text-transparent bg-clip-text">
              Hello
            </span>
            <span className="text-[#5c0cfb]">,</span>
          </h1>
          <h2 className="text-[30px] text-[#8800FF] md:text-[35px] xl:text-7xl font-bold mt-4 xl:mt-6">
            We’re <span className=" text-[#6d27af]">Inspiration App.</span>
          </h2>
          <p className="font-semibold mt-8 xl:mt-12 text-[18px] md:text-lg xl:text-xl text-gray-600 max-w-2xl">
            We provide immersive digital mentorships that amplify curious minds,
            driven by curiosity, on a vision to lets grow all together.
          </p>
        </div>
        {/* Right Side Numbers */}
        <div className="relative z-10 w-full md:w-1/3 space-y-8 xl:space-y-16">
          <div>
            <h3 className="text-[30px] xl:text-5xl text-[#8800FF] font-extrabold">
              25000+
            </h3>
            <p className="text-gray-600 text-[15px] xl:text-xl">
              Strong Community
            </p>
          </div>
          <div>
            <h3 className="text-[30px] text-[#8800FF]  xl:text-5xl font-extrabold">
              150+
            </h3>
            <p className="text-gray-600 text-[15px] xl:text-xl">
              Expert Mentors
            </p>
          </div>
          <div>
            <h3 className="text-[30px] xl:text-5xl text-[#8800FF] font-extrabold">
              500+
            </h3>
            <p className="text-gray-600 text-[15px] xl:text-xl">
              Completed Events
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className=" relative bg-gradient-to-br from-[#efe4f9] to-[#f6f5f8] py-0 xs2:py-5 md:py-10 xl:py-20 px-4 sm:px-6 md:px-10 xl:px-20 overflow-hidden">
        {/* SVG Decorative Curve */}
        <svg
          className="absolute top-0 left-0 w-full h-full max-h-[200px] sm:max-h-[300px] md:max-h-[300px] lg:max-h-[390px] xl:max-h-[400px] z-0"
          viewBox="0 0 1920 400"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 300 C 400 100, 600 160, 800 300 S 1600 400, 1920 250"
            stroke="#9333EA"
            strokeWidth="3"
            fill="transparent"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="xl:mx-4 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-2 md:gap-12">
          {/* Left Image + Decorative Boxes */}
          <div className="relative w-full lg:w-1/2 flex justify-center items-center px-6 mb-12 mt-12 sm:mb-10 md:mb-0 md:mt-0">
            <div className="relative w-full max-w-[520px] aspect-[4/3] z-10 mx-auto">
              {/* Blob Behind Image */}
              <img
                src={blob}
                alt="Decorative Blob"
                className="absolute top-[-20%] right-[-13%] w-[40%] opacity-80 z-0 pointer-events-none"
              />

              {/* Top Left Box */}
              <div className="absolute top-[-11%] left-[-4%] w-[20%] aspect-square rounded-2xl bg-gradient-to-br from-red-400 via-purple-500 to-yellow-300 shadow-xl z-10" />

              {/* Bottom Left Box */}
              <div className="absolute bottom-[-6%] left-[-9%] w-[20%] aspect-square rounded-2xl bg-gradient-to-br from-green-400 via-blue-300 to-purple-200 shadow-lg z-10" />

              {/* Bottom Right Box with Icon */}
              <div className="absolute bottom-[-8%] right-[-6%] w-[20%] aspect-square rounded-2xl bg-gradient-to-br from-pink-400 via-purple-400 to-violet-900 shadow-xl z-20 flex justify-center items-center">
                <img
                  src={inspiration}
                  alt="Inspiration Logo"
                  className="w-[50%] h-[50%] object-contain"
                />
              </div>

              {/* Main Image */}
              <div className="relative z-10 shadow-2xl rounded-2xl overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500 w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Inspiration Hero"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Right Text Section */}
          <div className="w-full lg:w-1/2 mb-3">
            <h2 className=" text-lg sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              What we do
            </h2>
            <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-md">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                We’ve built an{' '}
                <strong>all-in-one mentorship and learning platform</strong>{' '}
                that empowers thousands of learners, creators, and professionals
                to connect, grow, and thrive.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                From 1-on-1 mentorship to live workshops, skill-based roadmaps,
                community-driven learning pods, and curated career support — our
                platform handles the growth journey so you can focus on what
                matters: <strong>becoming your best self.</strong>
              </p>
              {/* <a
                href="#"
                className="text-purple-700 font-semibold hover:underline transition-all text-sm"
              >
                Check out our community milestones →
              </a> */}
            </div>
          </div>
        </div>
      </div>
      {/* Section 3 */}
      <section className="relative bg-[#f5f1ff] text-black py-12 xl:py-24 px-6 md:px-16 xl:px-32 overflow-hidden isolate">
        {/* Decorative Gradient Blob - Top Left */}
        <div className="absolute top-[-80px] left-[-80px] w-[280px] h-[280px] bg-gradient-to-br from-[#b388ff] to-[#d2a8ff] rounded-full opacity-30 blur-[100px] -z-10"></div>

        {/* Decorative Quotation SVG - Left Behind Text */}
        <div className="absolute left-4 top-[30%] opacity-10 z-0 hidden md:block">
          <svg width="160" height="160" viewBox="0 0 140 140" fill="none">
            <path
              d="M40 60C40 40 55 30 70 30V60C60 60 55 65 55 70H85C85 90 70 100 55 100C45 100 40 90 40 80V60Z"
              fill="#7e5bef"
            />
            <path
              d="M90 60C90 40 105 30 120 30V60C110 60 105 65 105 70H135C135 90 120 100 105 100C95 100 90 90 90 80V60Z"
              fill="#7e5bef"
            />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 xl:gap-16">
          {/* TEXT SECTION */}
          <div className="lg:w-2/3 w-full">
            {/* Show image right below heading on mobile/tablet only */}
            <div className="lg:hidden w-full mb-6">
              <div className="relative w-full max-w-xs mx-auto aspect-square rounded-2xl overflow-hidden shadow-xl ring-2 ring-[#d3bfff]/30">
                <img
                  src={"https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/aboutUsPage/NandanGN.webp"}
                  alt="Founder Nandan GN"
                  loading='lazy'
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <h2 className=" text-[22px] md:text-[30px] xl:text-6xl font-extrabold leading-tight mb-4 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#5b21b6]">
              A word from Founder:
            </h2>
            {/* Full Paragraph (no truncation) */}
            <p className="text-[15px] xl:text-lg leading-relaxed text-gray-800 mb-2 xl:mb-4">
              <span className="text-xl xl:text-4xl font-bold text-[#7c3aed]">
                “
              </span>
              Inspiration App was born from a simple but powerful question—What
              if everyone had access to the right guidance at the right moment
              in their journey? As someone who&apos;s always been curious about
              people’s stories, struggles, and breakthroughs, I wanted to build
              a space where mentors and learners could come together—not just to
              teach or learn, but to grow together. This platform isn’t just a
              product—it’s a community, a movement, and a shared dream. Every
              day, I feel grateful and humbled to see it take shape through the
              passion of mentors, the determination of learners, and the magic
              of human connection. I’m still learning, listening, and
              evolving—just like everyone else here. And that’s the real beauty
              of it.
              <span className="text-xl xl:text-4xl font-bold text-[#7c3aed]">
                ”
              </span>
            </p>

            <p className="font-semibold text-gray-700 mb-5 md:mb-8">
              – Nandan GN
            </p>

            <a
              href="#"
              className="inline-block bg-[#7c3aed] items-center justify-center ring-none rounded-md sm:rounded-lg shadow-md font-semibold py-2 px-5 md:px-7 font-dm bg-violet-500 border-b-4 border-b-violet-700 text-white hover:border-0 active:border-0 hover:text-gray-100 active:bg-violet-800 active:text-gray-300 text-sm sm:text-base"
            >
              View Profile
            </a>
          </div>

          {/* DESKTOP Image Section */}
          <div className="lg:w-1/3 hidden lg:block relative">
            <div className="absolute w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-[#d8b4fe] to-[#a78bfa] blur-[100px] opacity-40 top-[-60px] right-[-60px] -z-10"></div>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl ring-2 ring-[#d3bfff]/30">
              <img
                src={"https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/aboutUsPage/NandanGN.webp"}
                alt="Founder Nandan GN"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section
        ref={ref}
        className="relative overflow-hidden py-16 md:py-20 bg-purple-100"
      >
        {/* Decorative Blobs */}
        <img
          src={blob3}
          alt="blob2"
          className="absolute top-[10%] left-[-5%] w-[180px] md:w-[220px] opacity-40 animate-pulse pointer-events-none z-0 blur-[40px]"
        />
        <img
          src={blob3}
          alt="blob3"
          className="absolute bottom-[-5%] right-[-8%] w-[220px] md:w-[280px] opacity-30 animate-spin-slow pointer-events-none z-0 blur-[40px]"
        />

        {/* Section Heading */}
        <div className="relative z-10 text-center">
          <h2 className="px-2 text-[25px] md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#5d2aa1] via-[#7e40dc] to-[#9e5eff] text-transparent bg-clip-text">
            Meet Our Curious Family
          </h2>
          <p className="px-4 text-base md:text-lg text-gray-600 mt-4 md:mt-8 max-w-2xl mx-auto">
            A passionate team of creators, engineers, and dreamers building
            something meaningful together.
          </p>
        </div>

        {/* Swiper Cards */}
        {inView && (
          <div className="relative z-10 xl:max-w-6xl 2xl:max-w-[1355px] mx-auto px-4">
            <Swiper
              modules={[Pagination, Autoplay]}
              lazy={false}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              loop={true}
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1536: { slidesPerView: 4 },
              }}
            >
              {teamMembers.map((member, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex justify-center px-2 py-12 md:py-16">
                    <div
                      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
                      className="group w-[260px] xs:w-[300px] p-6 rounded-2xl border border-white/30 bg-white shadow-md hover:shadow-xl transition-all duration-300 transition-transform duration-300 hover:scale-105 relative overflow-hidden"
                    >
                      {/* Decorative Purple Blob in Top-Right */}
                      {/* <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#a78bfa] via-[#7c3aed] to-[#5b21b6] rounded-full blur-xl opacity-40 z-0"></div> */}

                      {/* Top Right Logo */}
                      <img
                        src={inspiration_logo}
                        alt="Inspiration Logo"
                        className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 z-20"
                      />

                      {/* Inner Flex Layout */}
                      <div className="flex flex-col items-center gap-y-4 relative z-10">
                        {/* Gradient Halo Ring */}
                        <div className="bg-gradient-to-tr from-[#7d4af6] to-[#cfa8f7] p-[3px] rounded-full">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-[3px] border-white shadow-md"
                          />
                        </div>

                        {/* Member Name */}
                        <h3 className="text-lg font-semibold text-center text-[#2e213f]">
                          {member.name}
                        </h3>

                        {/* Role */}
                        <p className="text-sm text-center text-gray-500">
                          {member.role}
                        </p>

                        {/* Social Icons */}
                        <div className="mt-1 flex justify-center space-x-4 text-xl text-gray-400">
                          <FaTwitter className="hover:text-[#8B5CF6] transition" />
                          <FaFacebook className="hover:text-[#8B5CF6] transition" />
                          <FaLinkedin className="hover:text-[#8B5CF6] transition" />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </section>
      <a
        href="https://curiousecosystem.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[9999] bg-white text-black font-bold text-xs md:text-sm rotate-[-90deg] origin-bottom-right px-7 py-2 shadow-lg border border-gray-300 hover:bg-gray-100"
      >
        CBS
      </a>
    </div>
  );
}

export default AboutUs;
