/* eslint-disable react/prop-types */
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import tag_icon from '@/assets/blogs/tag_icon.svg';
import heart from '@/assets/blogs/heart.svg';
import msg from '@/assets/blogs/msg.svg';
import write_blog from '@/assets/blogs/edit_square.svg';
import start_icon from '@/assets/blogs/star_icon.svg';
import { useBlog } from '@/Context/BlogContext';


const RenderFeaturedArticle = ({ isLoading, hasSearchResults, setShowModal }) => {
  const { featuredBlogs } = useBlog();
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const navigate = useNavigate();

  // Get current featured article
  const featuredArticle = useMemo(() => {
    if (!featuredBlogs?.length) return null;
    return featuredBlogs[currentFeaturedIndex];
  }, [featuredBlogs, currentFeaturedIndex]);
  // Auto-rotate featured articles
  useEffect(() => {
    if (!featuredBlogs?.length || featuredBlogs?.length <= 1) return;

    const interval = setInterval(() => {
      setTimeout(() => {
        setCurrentFeaturedIndex(prev => (prev + 1) % featuredBlogs.length);
      }, 500);
    }, 1000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, [featuredBlogs]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!featuredArticle) {
    return (
      <>
        {!hasSearchResults && (
          <section className="max-w-7xl mx-auto px-3 md:py-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-800">
                Featured Article
              </p>
              {featuredArticle && (
                <button
                  onClick={() => setShowModal(true)}
                  className="hidden sm:flex items-center gap-2 bg-[#9333EA] hover:bg-[#7e22ce] text-white my-2 md:my-3 py-1.5 px-4 sm:py-2 sm:px-6 rounded-md transition-colors text-sm sm:text-base"
                >
                  <img src={write_blog} alt="" /> Create Blog
                </button>
              )}
            </div>
          </section>
        )}
        <section className="mb-12 md:mb-16 rounded-lg max-w-7xl mx-auto p-4 md:p-6 bg-[#F7F0FD] text-center">
          <div className="flex flex-col items-center justify-center py-12">
            <img src={start_icon} alt="Coming soon" className="w-12 h-12 mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-[#7e22ce] mb-2">Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We&apos;re working on some amazing content for you. Stay tuned!
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <div className='w-full lg:w-full px-4 lg:px-3'>
      <section className="max-w-7xl mx-auto py-4 md:py-2 lg:py-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:py-4 md:py-2 lg:py-0">
          <p className="text-xl sm:text-2xl font-bold text-gray-800">Featured Article</p>
          {featuredArticle && (
            <button
              onClick={() => setShowModal(true)}
              className="hidden sm:flex items-center gap-2 bg-[#9333EA] hover:bg-[#7e22ce] text-white my-2 md:my-3 py-1.5 px-4 sm:py-2 sm:px-6 rounded-md transition-colors text-sm sm:text-base"
            >
              <img src={write_blog} alt="" /> Create Blog
            </button>
          )}
        </div>
      </section>
      <section className="mb-12 md:mb-16 rounded-lg max-w-7xl mx-auto p-4 md:p-6 shadow-[0_4px_20px_-2px_rgba(147,51,234,0.3)] border border-purple-100 hover:shadow-[0_6px_24px_-2px_rgba(147,51,234,0.4)] transition-shadow duration-300 cursor-pointer"
        onClick={() => navigate(`/blogs/${featuredArticle?._id}`)}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold tracking-widest text-[#9333EA]uppercase">Featured</span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-800">{featuredArticle?.avgTime || 2} min read</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {featuredArticle?.tags?.map((category, index) => (
            <span key={index} className="bg-[#f3f1f5] text-[#B880F0] font-bold px-2 py-1 rounded-full flex items-center gap-1 text-[10px]"
            >
              <img src={tag_icon} alt="" className="w-3 h-3" /> {category}
            </span>
          ))}
        </div>
        <div className="bg-white rounded-lg">
          <div className=" py-1 md:py-3">
            <h3 className="text-xl md:text-3xl font-bold text-gray-800">{featuredArticle?.title}</h3>
            <div className="text-sm text-gray-600 line-clamp-2 my-2 md:my-3.5" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(featuredArticle?.content) }}
            />
            <div className="flex flex-col items-start justify-start gap-4">
              <div className="flex items-center gap-3 w-full flex-wrap">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#d0bee1] flex items-center justify-center">
                  <p className="text-sm md:text-base text-[#8b35e1] font-bold">
                    {featuredArticle?.author?.name?.split(' ').map((n) => n[0]).join('')}
                  </p>
                </div>
                <div className="flex-grow min-w-[120px]">
                  <span className="font-bold text-gray-800 block text-sm md:text-base">
                    {featuredArticle?.author?.name}</span>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="flex items-center gap-1">
                    <img src={heart} alt="" className="w-4 h-4" />
                    <span className="text-xs md:text-sm text-gray-500">{featuredArticle?.likes || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src={msg} alt="" className="w-4 h-4" />
                    <span className="text-xs md:text-sm text-gray-500">{featuredArticle?.comments || 0}</span>
                  </div>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); navigate(`/blogs/${featuredArticle?._id}`) }} className="px-4 py-1.5 md:px-6 md:py-2 bg-[#9333EA] text-white font-bold rounded-md hover:bg-[#7e22ce] transition-colors text-sm md:text-base mt-2"
              >
                Read the full Article
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RenderFeaturedArticle;