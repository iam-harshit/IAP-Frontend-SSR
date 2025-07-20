import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import AboutDesc from './AboutDesc';
import Modal from '@/Components/common/Modal';
import instagramLogo from '@/assets/Profile-Page/instagram.png';
import verifiedIcon from '@/assets/DashboardAssets/verified.svg';
import { FaLink, FaRegPlayCircle } from 'react-icons/fa';
import MentorAvailabilityStatusAndResponseTime from '@/Components/pages/Profile-Page/ProfilePage-components/MentorAvailabilityStatusAndResponseTime.jsx';

const UserDetails = ({
  name,
  isMentor,
  userData,
  isCurrentUser,
  followersCount,
  followingCount,
}) => {
  const { socialMedia, experience } = userData;
  const badge = isMentor && userData.mentorDetails.badge;
  const websiteURL = userData?.mentorDetails?.website;
  const introVideo = userData?.mentorDetails?.introVideoUrl;

  const latestCompanyWebsite =
    experience?.length > 0
      ? [...experience].sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate)
        )[0]?.companyWebsite
      : '';

  const latestCompanyLogo = latestCompanyWebsite
    ? `${latestCompanyWebsite.replace(/\/$/, '')}/favicon.ico`
    : '';

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const formattedFollowers = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(followersCount || 0);

  const formattedFollowing = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(followingCount || 0);

  const [location, setLocation] = useState({
    streetAddress: '',
    city: '',
    state: '',
    country: '',
  });
  const ensureHttpProtocol = (url) =>
    url && !/^https?:\/\//i.test(url) ? `https://${url}` : url;
  const [socialLinks, setSocialLinks] = useState({
    linkedin: '',
    twitter: '',
    instagram: '',
    github: '',
  });
  useEffect(() => {
    setSocialLinks({
      linkedin: ensureHttpProtocol(
        socialMedia.find((link) => link?.platform === 'linkedin')?.link || ''
      ),
      twitter: ensureHttpProtocol(
        socialMedia.find((link) => link?.platform === 'twitter')?.link || ''
      ),
      instagram: ensureHttpProtocol(
        socialMedia.find((link) => link?.platform === 'instagram')?.link || ''
      ),
      github: ensureHttpProtocol(
        socialMedia.find((link) => link?.platform === 'github')?.link || ''
      ),
    });

    setLocation({
      streetAddress: userData?.location?.streetAddress ?? '',
      city: userData?.location?.city ?? '',
      state: userData?.location?.state ?? '',
      country: userData?.location?.country ?? '',
    });
  }, [userData]);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-start justify-center px-4 lg:ml-4">
      <div className="w-full flex flex-col justify-start">
        <div className="flex flex-col md:flex-row justify-between items-start w-full">
          <div className="w-full">
            {/* Name and Top Mentor */}
            <div className="flex items-center  ">
              <span className="text-h3 sm:text-h2 text-gray-800  relative">
                {name}
              </span>

              {/* Verified Badge */}
              {badge === 'verified' && (
                <img
                  src={verifiedIcon}
                  alt="Verified"
                  className="w-4 h-4 md:w-5 md:h-5 ml-1"
                />
              )}

              {/* Latest Company Logo */}
              {latestCompanyLogo && (
                <img
                  src={latestCompanyLogo}
                  alt="Company Logo"
                  className="w-5 h-5 md:w-6 md:h-6 object-contain ml-2"
                  title={latestCompanyWebsite}
                />
              )}
            </div>

            {/* Bio */}
            {userData?.bio && (
              <AboutDesc
                aboutDescription={userData?.bio}
                isCurrentUser={isCurrentUser}
              />
            )}

            {/* Location + Modal */}
            {(location.city || location.state || location.country) && (
              <div className="flex flex-col md:flex-wrap items-start md:items-start mt-1">
                <div className="flex items-start">
                  <p className="text-gray-400 text-h6">
                    {`${location.city ? location.city + ', ' : ''}${
                      location.state ? location.state + ', ' : ''
                    }${location.country ? location.country : ''}`}
                    {isCurrentUser && (
                      <span
                        className="text-[#1C97E9] text-h5 hover:cursor-pointer pl-2"
                        onClick={openModal}
                      >
                        Contact info
                      </span>
                    )}
                  </p>
                  {isOpen && (
                    <Modal
                      isOpen={isOpen}
                      closeModal={closeModal}
                      type="profile"
                      data={userData}
                    />
                  )}
                </div>
              </div>
            )}
            {/* Website and Intro Video Links */}
            {(websiteURL || introVideo) && (
              <div className="flex items-center gap-4 mt-1">
                {websiteURL && (
                  <a
                    href={websiteURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-600 font-normal  transition-all duration-200 max-w-full"
                  >
                    <FaLink className="w-4 h-4 shrink-0 text-gray-600 hover:scale-105 transition-transform duration-200" />
                    <span
                      className="text-[#1C97E9] hover:underline truncate whitespace-nowrap overflow-hidden max-w-[140px] sm:max-w-full"
                      title={new URL(websiteURL).hostname.replace(/^www\./, '')}
                    >
                      {new URL(websiteURL).hostname.replace(/^www\./, '')}
                    </span>
                  </a>
                )}

                {introVideo && (
                  <a
                    href={introVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-600 font-normal  transition-all duration-200"
                  >
                    <FaRegPlayCircle className="w-5 h-5 text-gray-600 hover:scale-105 transition-transform duration-200" />
                    <span className="truncate max-w-[120px] text-[#1C97E9] sm:max-w-full hover:underline">
                      Watch Intro
                    </span>
                  </a>
                )}
              </div>
            )}

            {/* Followers */}
            <div className="flex gap-x-4 mt-1">
              <div className="flex items-center text-gray-700 font-medium gap-1">
                {formattedFollowers}
                <span className="text-gray-500 font-normal">
                  {formattedFollowers == 1 ? 'follower' : 'followers'}
                </span>
              </div>
              <div className="flex items-center text-gray-700 font-medium gap-1">
                {formattedFollowing}
                <span className="text-gray-500 font-normal">following</span>
              </div>
            </div>
            {/* Social Media */}
            {(socialLinks.linkedin ||
              socialLinks.twitter ||
              socialLinks.instagram ||
              socialLinks.github) && (
              <div className="w-fit flex gap-x-2 items-center justify-end xl:justify-center my-3 lg:mb-0">
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
                  >
                    <div className="flex gap-2 text-[#0A66C2] text-xl">
                      <FaLinkedin />
                    </div>
                  </a>
                )}

                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
                  >
                    <div className="flex gap-2 text-xl">
                      <FaXTwitter />
                    </div>
                  </a>
                )}

                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
                  >
                    <img
                      src={instagramLogo}
                      alt="instagram"
                      className="w-[20px] h-[20px]"
                    />
                  </a>
                )}

                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
                  >
                    <div className="flex gap-2 text-black text-xl">
                      <FaGithub />
                    </div>
                  </a>
                )}
              </div>
            )}
            {/* Mentor Availability Status and Response Time */}
            {userData?.mentorDetails?.availabilityStatus && (
              <MentorAvailabilityStatusAndResponseTime
                status={userData.mentorDetails.availabilityStatus}
                responseTime={userData.mentorDetails.avgResponseTime}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
