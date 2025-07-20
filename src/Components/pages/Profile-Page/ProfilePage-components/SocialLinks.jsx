import React from 'react';
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import instagramLogo from '@/assets/Profile-Page/instagram.png';

const SocialLinks = ({ socialLinks }) => (
  (socialLinks.linkedin || socialLinks.twitter || socialLinks.instagram || socialLinks.github) && (
    <div className="w-fit flex gap-x-2 items-center justify-end xl:justify-center mb-4 mt-3 lg:mb-0">
      {socialLinks.linkedin && (
        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110 hover:shadow-lg">
          <FaLinkedin className="text-[#0A66C2] text-xl" />
        </a>
      )}
      {socialLinks.twitter && (
        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110 hover:shadow-lg">
          <FaXTwitter className="text-xl" />
        </a>
      )}
      {socialLinks.instagram && (
        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110 hover:shadow-lg">
          <img src={instagramLogo} alt="instagram" className="w-[20px] h-[20px]" />
        </a>
      )}
      {socialLinks.github && (
        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110 hover:shadow-lg">
          <FaGithub className="text-black text-xl" />
        </a>
      )}
    </div>
  )
);

export default SocialLinks;
