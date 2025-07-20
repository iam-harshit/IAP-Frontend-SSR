import { useBlog } from '@/Context/BlogContext';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SEO from '@/Components/common/SEO';
import BlogHero from '@/Components/pages/blogs/BlogHero';
import BlogCard from '@/Components/pages/blogs/BlogCard';
import WriteBlogModal from './WriteBlogModel';
import SearchModal from './SearchBlog';
import RenderFeaturedArticle from './FeaturedBlog';

const Blog = () => {
  const { blogs, toggleLike, fetchAllBlogs, fetchFeaturedBlogs } = useBlog();
  const [searchResults, setSearchResults] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchResultsRef = useRef(null);
  const hasSearchResults = useMemo(() => searchResults.length > 0, [searchResults]);  // Memoized derived values
  
  const handleReloadBlogs = useCallback(async () => { await fetchAllBlogs() }, []);

  useEffect(() => {
    fetchAllBlogs();
    fetchFeaturedBlogs();
  }, []);


  // Latest Blog Articles
  const latestArticles = useMemo(() => {
    return blogs?.filter(article => article?.title).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, visibleArticles);
  }, [blogs, visibleArticles]);
  const loadMore = useCallback(() => setVisibleArticles(prev => prev + 6), []);  // Load more articles

  return (
    <>
      <SEO title="Blog" description="Discover thought-provoking articles..." canonical="https://inspirationapp.org/blogs" />
      <div className="mx-auto max-w-[1920px]">
        <BlogHero setShowModal={setShowModal} setIsSearchOpen={setIsSearchOpen} />
        <WriteBlogModal isOpen={showModal} onClose={() => setShowModal(false)} setIsLoading={setIsLoading} onSuccess={handleReloadBlogs} />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} articles={blogs}
          setSearchResults={setSearchResults} searchResultsRef={searchResultsRef}
        />
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            <RenderFeaturedArticle articles={blogs} isLoading={isLoading} hasSearchResults={hasSearchResults} setShowModal={setShowModal} />
            <section ref={searchResultsRef} id="latest-articles" className="mb-12 md:mb-16 rounded-lg max-w-7xl mx-auto p-4 md:p-6">
              <div className="flex justify-between items-center mb-1 md:mb-2">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {hasSearchResults ? 'Search Results' : 'Latest Articles'}
                </h2>
                {!hasSearchResults && <div className="w-12 h-0.5 md:w-24 md:h-1 bg-[#9333EA] rounded-full" />}
              </div>
              <p className="text-gray-600 mb-6 md:mb-8"> Discover more insights and stories from our community. </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {(hasSearchResults ? searchResults : latestArticles)?.map((article) => (
                  <BlogCard key={article?._id} article={article} onLike={toggleLike} />
                ))}
              </div>
              {!hasSearchResults && visibleArticles < blogs?.length && (
                <div className="mt-8 md:mt-12 text-center">
                    <button onClick={loadMore} className="px-4 py-2 md:px-6 md:py-3 bg-[#7e22ce] border border-gray-600 rounded-lg text-white font-medium hover:bg-[#7b19d1] transition-colors shadow-sm text-sm md:text-base animate-bounce"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
              {blogs?.length === 0 && !isLoading && (
                <p className="text-xl md:text-2xl font-bold text-[#7e22ce] text-center mb-2 animate-bounce">
                  No blogs found
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Blog;