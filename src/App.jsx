/* eslint-disable react/prop-types */
import { Suspense, lazy, useState } from 'react';
import '@/App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Loader from '@/Components/common/Loader';
import { useSelector } from 'react-redux';
import SearchModal from '@/Components/common/SearchModal';
// import { blogList, mentorList, menteeList } from '@/mock/searchData'; // replace with real sources

const Header = lazy(() => import('@/Components/common/Header'));
const Home = lazy(() => import('@/pages/Home-Page'));
const Footer = lazy(() => import('@/Components/common/Footer'));
const Mentors = lazy(() => import('@/pages/MentorPage'));
const Profile = lazy(() => import('@/pages/Profile'));
const PrivateRoute = lazy(() => import('@/Components/common/PrivateRoute'));
const Events = lazy(() => import('@/pages/Events-Page'));
const ContactUs = lazy(() => import('@/pages/ContactUs'));
const ResumeBuilder = lazy(() => import('@/pages/ResumeBuilder'));
const ResumeHome = lazy(() => import('@/pages/ResumeHome'));
const FeaturePage = lazy(() => import('@/pages/FeaturePage'));
const Pods = lazy(() => import('@/pages/Pods'));
const WhyUs = lazy(() => import('@/pages/WhyUs'));
const BlogHomePage = lazy(() => import('@/pages/BlogPage'));
const AboutUs = lazy(() => import('@/pages/AboutUs'));
const AskMentor = lazy(() => import('@/pages/AskMentor-Page'));

// Footer Components
const PrivacyPolicy = lazy(
  () => import('@/Components/pages/Footer-pages/PrivacyPolicy')
);
const TermsandConditions = lazy(
  () => import('@/Components/pages/Footer-pages/TermsandConditions')
);
const ShippingandDelivery = lazy(
  () => import('@/Components/pages/Footer-pages/ShippingandDelivery')
);
const CancellationandRefund = lazy(
  () => import('@/Components/pages/Footer-pages/CancellationandRefund')
);
const ForgotPasswordPage = lazy(() => import('@/pages/Forgot-Password-Page'));

import PropTypes from 'prop-types';
import EditSection from '@/Components/pages/Profile-Page/Dashboard';
import ContextProvider from '@/Components/pages/AskMentor-Page/context/Context';
import Loader1 from '@/Components/common/Loader1';
import Loader2 from '@/Components/common/Loader2';
import DashboardLayout from '@/Components/common/DashboardLayout';
import HomeSection from '@/Components/pages/Profile-Page/Dashboard-components/Home-Section/HomeSection';
import SignupRole from '@/pages/SignupRole';
import OAuthCallback from '@/pages/OAuthCallback';
import { BlogModalProvider } from './Context/BlogModalContext';
import PublicRoute from './Components/core/PublicRoute';
import BottomNavbar from './Components/common/BottomNavbar';
import BlogDetailPage from '@/Components/pages/blogs/BlogPageDetail';
import { BlogProvider } from './Context/BlogContext';
import Signin from '@/pages/Signin';

const CommonLayout = ({ children, noMargin = true, onSearchClick }) => {
  const location = useLocation();
  const hideFooterRoutes = [
    '/ask-chatur',
    '/events',
    '/blogs',
    '/profile',
    '/blogs/:id',
    '/pods',
    '/explore-mentors',
  ];

  const shouldHideFooter = hideFooterRoutes.some(
    (path) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`)
  );
  return (
    <div className="min-h-screen flex flex-col ">
      <Header onSearchClick={onSearchClick} />
      <main className={`flex-1 ${noMargin ? '' : 'my-4 md:my-8 lg:my-12'}`}>
        {children}
      </main>
      <div className="lg:hidden">
        <BottomNavbar />
      </div>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

CommonLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onSearchClick: PropTypes.func,
};

function App() {
  const [events, setEvents] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const { blogs } = useSelector((state) => state.blog);

  return (
    <div className="App">
      <BlogModalProvider>
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          dataSources={[
            {
              type: 'Blog',
              // data: blogs,
              displayKey: 'title',
              secondaryKey: 'userId.name',
              onNavigate: (item) => navigate(`/blogs/${item._id}`),
            },
            // {
            //   type: 'Mentor',
            //   data: 'mentorList',
            //   displayKey: 'fullName',
            //   secondaryKey: 'skills',
            //   onNavigate: (item) => navigate(`/mentor/${item._id}`),
            // },
            // {
            //   type: 'Mentee',
            //   data: 'menteeList',
            //   displayKey: 'fullName',
            //   secondaryKey: 'interests',
            //   onNavigate: (item) => navigate(`/mentee/${item._id}`),
            // },
          ]}
        />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                  <Home />
                </CommonLayout>
              }
            />
            <Route path="/loader1" element={<Loader1 />} />
            <Route path="/loader2" element={<Loader2 />} />
            <Route path="/oauth-callback" element={<OAuthCallback />} />
            <Route
              path="/sign-in"
              element={
                <PublicRoute>
                  <Signin />
                </PublicRoute>
              }
            />
            <Route
              path="/sign-up"
              element={
                <PublicRoute>
                  <SignupRole />
                </PublicRoute>
              }
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/explore-mentors"
              element={
                <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                  <Mentors />
                </CommonLayout>
              }
            />
            <Route
              path="/events"
              element={
                <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                  <Events events={events} setEvents={setEvents} />
                </CommonLayout>
              }
            />
            <Route
              path="/contact-us"
              element={
                <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                  <ContactUs />
                </CommonLayout>
              }
            />
            <Route
              path="/about-us"
              element={
                <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                  <AboutUs />
                </CommonLayout>
              }
            />
            <Route
              path="/pods/*"
              element={
                <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                  <Pods />
                </CommonLayout>
              }
            />
            <Route
              path="/why-us"
              element={
                <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                  <WhyUs />
                </CommonLayout>
              }
            />
            {/* Blog routes wrapped with BlogProvider */}
            <Route
              path="/blogs"
              element={
                <BlogProvider>
                  <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                    <BlogHomePage />
                  </CommonLayout>
                </BlogProvider>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <BlogProvider>
                  <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                    <BlogDetailPage />
                  </CommonLayout>
                </BlogProvider>
              }
            />
            <Route
              path="/features"
              element={
                <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                  <FeaturePage />
                </CommonLayout>
              }
            />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route
              path="/termsandconditions"
              element={<TermsandConditions />}
            />
            <Route
              path="/cancellationandrefund"
              element={<CancellationandRefund />}
            />
            <Route
              path="/shippinganddelivery"
              element={<ShippingandDelivery />}
            />
            <Route
              path="/profile/cbs-iap/:userName"
              element={
                <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                  <Profile isCurrentUser={false} />
                </CommonLayout>
              }
            />
            <Route
              path="/resume_builder_home"
              element={
                <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                  <ResumeHome />
                </CommonLayout>
              }
            />
            <Route
              path="/resume_builder"
              element={
                <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                  <ResumeBuilder />
                </CommonLayout>
              }
            />
            <Route
              path="/ask-chatur"
              element={
                <CommonLayout
                  noMargin
                  onSearchClick={() => setIsSearchOpen(true)}
                >
                  <ContextProvider>
                    <AskMentor currentUser={currentUser} />
                  </ContextProvider>
                </CommonLayout>
              }
            />
            <Route element={<PrivateRoute />}>
              <Route
                path="/profile"
                element={
                  <CommonLayout
                    noMargin
                    onSearchClick={() => setIsSearchOpen(true)}
                  >
                    <Profile isCurrentUser={true} />
                  </CommonLayout>
                }
              />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<HomeSection />} />
                <Route path=":section" element={<EditSection />} />
              </Route>
              <Route
                path="home"
                element={
                  <CommonLayout onSearchClick={() => setIsSearchOpen(true)}>
                    <EditSection />
                  </CommonLayout>
                }
              />
            </Route>
          </Routes>
          <ShowBottomNavbar />
        </Suspense>
      </BlogModalProvider>
    </div>
  );
}

const ShowBottomNavbar = () => {
  const location = useLocation();

  const excludedRoutes = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/oauth-callback',
    '/dashboard',
  ];

  const shouldShow = !excludedRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return shouldShow ? (
    <div className="lg:hidden">
      <BottomNavbar />
    </div>
  ) : null;
};

export default App;
