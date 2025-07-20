import React from 'react';
import {
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';

const UserSocialLinks = ({ socials }) => {
  // Only render if there are social links
  if (!socials) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-3">
      {socials.linkedin && (
        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn className="text-black w-[14px] transition-transform duration-500 hover:scale-150" />
        </a>
      )}
      {socials.github && (
        <a href={socials.github} target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-black w-[14px] transition-transform duration-500 hover:scale-150" />
        </a>
      )}
      {socials.instagram && (
        <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-black w-[14px] transition-transform duration-500 hover:scale-150" />
        </a>
      )}
      {socials.twitter && (
        <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
          <FaXTwitter className="text-black w-[14px] transition-transform duration-500 hover:scale-105" />
        </a>
      )}
    </div>
  );
};

export default React.memo(UserSocialLinks); 