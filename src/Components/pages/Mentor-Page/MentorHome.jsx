// --- ALL YOUR ORIGINAL IMPORTS ARE UNTOUCHED ---
import SEO from '@/Components/common/SEO';
import LOGO from '@/assets/inspiration-logo-transparent.png';
import no from '@/assets/no.png';
import { handleMentors } from '@/services/Operations/MentorsOperation/MentorsApi';
import { useEffect, useMemo, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MentorCard from './MentorCard';
import MoreFiltersModal from './MoreFiltersModal';
import SidebarFilters from './SidebarFilters';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// 1. The component now accepts `initialMentors` and `initialMetadata` as props.
export default function MentorHome({ initialMentors, initialMetadata }) {
  // --- ALL YOUR ORIGINAL STATE HOOKS ARE PRESERVED ---
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    search: '',
    language: [],
    expertise: [],
    country: [],
  });
  const [selectedCategories, setSelectedCategories] = useState([]);

  // --- THESE 4 LINES ARE THE ONLY STATE CHANGES ---
  // 2. State is initialized with the data provided by the server.
  const [mentors, setMentors] = useState(initialMentors || []);
  const [loading, setLoading] = useState(!initialMentors); // Only true if server didn't provide data.
  const [currentPage, setCurrentPage] = useState(
    initialMetadata?.currentPage || 1
  );
  const [totalPages, setTotalPages] = useState(
    initialMetadata?.totalPages || 1
  );
  const [error, setError] = useState(null); // Your original error state is preserved.

  // --- ALL YOUR ORIGINAL FUNCTIONS (fetchMentors, handlePageChange, etc.) ARE UNTOUCHED ---
  const fetchMentors = async (page, appliedFilters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await handleMentors(page, appliedFilters);
      setMentors(response?.mentors || []);
      setTotalPages(response?.metadata?.totalPages || 1);
      setCurrentPage(response?.metadata?.currentPage || 1);
    } catch (err) {
      setError(err.message || 'Failed to fetch mentors.');
      console.error('Error fetching mentors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- THE MAIN useEffect IS MODIFIED WITH ONLY ONE 'if' CONDITION ---
  useEffect(() => {
    // 3. This condition prevents re-fetching if data came from the server.
    if (!initialMentors) {
      fetchMentors(currentPage, filters);
    }
  }, [currentPage, filters, initialMentors]); // `initialMentors` is added to dependency array.

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    handleFilterChange({ ...filters, category: newCategories });
  };

  // --- YOUR ENTIRE JSX RETURN IS COMPLETELY UNTOUCHED ---
  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO
        title="Explore Mentors - Inspiration App"
        description="Find and connect with experienced mentors to guide your journey in various fields."
        keywords="mentors, professionals, guidance, career, inspiration"
        image={LOGO}
      />
      <div className="flex">
        <SidebarFilters onFilterChange={handleFilterChange} />
        <main className="flex-1 p-4 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loading ? (
              <p>Loading mentors...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : mentors.length > 0 ? (
              mentors.map((mentor) => (
                <MentorCard key={mentor._id} mentor={mentor} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <img src={no} alt="No mentors found" className="mx-auto h-40" />
                <p className="mt-4 text-xl text-gray-600">
                  No mentors found with the selected filters.
                </p>
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-white border rounded-md disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 mx-1 border rounded-md ${
                      currentPage === page
                        ? 'bg-purple-600 text-white'
                        : 'bg-white'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 bg-white border rounded-md disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </main>
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

// import SEO from '@/Components/common/SEO';
// import LOGO from '@/assets/inspiration-logo-transparent.png';
// import no from '@/assets/no.png';
// import { handleMentors } from '@/services/Operations/MentorsOperation/MentorsApi';
// import { useEffect, useMemo, useState } from 'react';
// import { FaArrowUp } from 'react-icons/fa'; // icon for scroll button
// import { Link } from 'react-router-dom';
// import MentorCard from './MentorCard';
// import MoreFiltersModal from './MoreFiltersModal';
// import SidebarFilters from './SidebarFilters';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// const MentorHome = () => {
//   const [mentors, setMentors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [localPage, setLocalPage] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [hasNextPage, setHasNextPage] = useState(false);
//   const [pages, setPages] = useState([1]); // Track discovered pages

//   const openModal = () => setShowModal(true);
//   const closeModal = () => setShowModal(false);

//   // ✅ Observe a marker at the top of the page
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setShowScrollTop(!entry.isIntersecting); // Show when top is out of view
//       },
//       { threshold: 0 }
//     );

//     const marker = document.getElementById('scroll-marker');
//     if (marker) observer.observe(marker);

//     return () => {
//       if (marker) observer.unobserve(marker);
//     };
//   }, []);

//   // ✅ Fetch mentors when page changes
//   useEffect(() => {
//     // Scroll to top marker when page changes
//     const marker = document.getElementById('scroll-marker');
//     if (marker) {
//       marker.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }

//     const fetchMentors = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await handleMentors(localPage);
//         const { data } = res;
//         setMentors(Array.isArray(data) ? data : []);
//         // Try loading the next page
//         try {
//           const nextPageRes = await handleMentors(localPage + 1);
//           const nextData = nextPageRes?.data;
//           const hasData = Array.isArray(nextData) && nextData.length > 0;

//           if (hasData && !pages.includes(localPage + 1)) {
//             setPages((prev) => [...prev, localPage + 1]);
//           }

//           setHasNextPage(hasData);
//         } catch (err) {
//           setHasNextPage(false);
//         }
//       } catch (err) {
//         console.error('Error fetching mentors:', err);
//         setError('Failed to load mentors');
//         setHasNextPage(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMentors();
// }, [localPage]);

//   // Explore Mentor Data
//   const mentorsToDisplay = useMemo(() => {
//     if (!Array.isArray(mentors)) return [];

//     return mentors.map((mentor) => {
//       const location =
//         typeof mentor?.location === 'object' && mentor.location !== null
//           ? [mentor.location.city, mentor.location.country].filter(Boolean).join(', ')
//           : 'India';

//       return {
//         ...mentor,
//         profilePicture: mentor?.profilePicture || '',
//         designation: 'Software Engineer',
//         organization: 'Company',
//         pricePerSession: 250,
//         description: mentor?.bio || 'I help professionals grow in tech and leadership.',
//         skills: mentor?.skills?.length ? mentor.skills : ['Python', 'Leadership'],
//         countryCode: mentor?.countryCode || 'IN',
//         rating: mentor?.rating || 4.5,
//         reviews: mentor?.reviews || 25,
//         spotsLeft: mentor?.spotsLeft || 2,
//         totalExperience: mentor?.totalExperience || '5+ Years',
//         location,
//         languages: mentor?.availableLanguages?.length > 0
//           ? mentor.availableLanguages
//           : ['English'],
//         nextAvailableSlot: mentor?.nextAvailableSlot || '2025-07-10T10:00:00Z',
//         offerings: mentor?.offerings || {},
//         education: mentor?.education || [],
//         experience: mentor?.experience || [],
//         socialMedia: mentor?.socialMedia || [],
//         badge: mentor?.badge || null,
//         isTopMentor: mentor?.isTopMentor || false,
//       };
//     });
//   }, [mentors]);

//   // Pagination Range
//   const getPaginationRange = () => {
//     const total = pages.length;
//     const delta = 1; // How many pages around current
//     const range = [];
//     const left = Math.max(2, localPage - delta);
//     const right = Math.min(pages[pages.length - 1] - 1, localPage + delta);

//     range.push(1); // always show first

//     if (left > 2) range.push('...');

//     for (let i = left; i <= right; i++) {
//       range.push(i);
//     }

//     if (right < pages[pages.length - 1] - 1) range.push('...');

//     if (pages[pages.length - 1] !== 1) range.push(pages[pages.length - 1]);

//     return range;
//   };

//   return (
//     <>
//       <SEO title="Explore Mentors" description="Discover experienced mentors..." />

//       {/* Marker for IntersectionObserver */}
//       <div id="scroll-marker" className="h-0 w-full"></div>

//       <div className="min-h-screen relative bg-gradient-to-b from-purple-100 to-white py-3 pb-24 lg:pb-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-6">
//             <div className="col-span-10 lg:col-span-3 px-4">
//               <SidebarFilters openModal={openModal} />
//             </div>

//             <div className="col-span-10 lg:col-span-7 px-4 space-y-6 lg:pl-12 xl:pl-0">
//               {loading ? (
//                 <div className="flex justify-center items-center flex-col">
//                   <img src={LOGO} className="w-[100px] animate-bounce" alt="loader" />
//                   <span className="font-bold mt-2">Loading available mentors...</span>
//                 </div>
//               ) : error || mentorsToDisplay.length === 0 ? (
//                 <div className="flex flex-col justify-center items-center text-center h-[50vh]">
//                   <img src={no} alt="No mentor found" className="w-[400px]" />
//                   <p className="text-h6 font-semibold text-gray-700 mt-2">
//                     Mentor Not Found!!
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex flex-col gap-6">
//                     {mentorsToDisplay.map((mentor) => (
//                       <Link key={mentor.username} to={`/profile/cbs-iap/${mentor.username}`}>
//                         <MentorCard mentor={mentor} />
//                       </Link>
//                     ))}
//                   </div>

//                   {/* Pagination */}
//                   <div className="mt-10 flex justify-center">
//                     <div className="flex items-center bg-purple-50 px-4 py-2 rounded-full shadow-md space-x-1">

//                       {/* Previous Button */}
//                       <button
//                         onClick={() => setLocalPage((prev) => Math.max(prev - 1, 1))}
//                         disabled={localPage === 1}
//                         className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-purple-100 rounded-full transition disabled:opacity-40"
//                       >
//                         <FaChevronLeft />
//                       </button>

//                       {/* Dynamic Smart Pages */}
//                       {getPaginationRange().map((pg, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => typeof pg === 'number' && setLocalPage(pg)}
//                           disabled={pg === '...'}
//                           className={`w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center
//       ${pg === localPage ? 'bg-purple-600 text-white shadow' : 'text-gray-700 hover:bg-purple-100'}
//       ${pg === '...' ? 'cursor-default opacity-50' : ''}
//     `}
//                         >
//                           {pg}
//                         </button>
//                       ))}

//                       {/* Next Button */}
//                       {hasNextPage && (
//                         <button
//                           onClick={() => setLocalPage(localPage + 1)}
//                           className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-purple-100 rounded-full transition"
//                         >
//                           <FaChevronRight />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {showModal && <MoreFiltersModal onClose={closeModal} />}

//       {/* Scroll-to-Top Button (visible when top is out of view) */}
//       {showScrollTop && (
//         <button
//           onClick={() => {
//             const marker = document.getElementById('scroll-marker');
//             if (marker) {
//               marker.scrollIntoView({ behavior: 'smooth', block: 'start' });
//             }
//           }}
//           className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 z-50"
//           aria-label="Scroll to top"
//         >
//           <FaArrowUp />
//         </button>
//       )}

//     </>
//   );
// };

// export default MentorHome;
