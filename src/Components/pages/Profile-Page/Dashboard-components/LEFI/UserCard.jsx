import React from 'react';
import companyIcon from '@/assets/DashboardAssets/company.png';
import universityIcon from '@/assets/DashboardAssets/university.png';
import verifiedIcon from '@/assets/DashboardAssets/verified.svg';
import UserSocialLinks from '@/Components/pages/Profile-Page/Dashboard-components/LEFI/UserSocialLinks.jsx';

const UserCard = ({ user }) => {
  let backgroundColor = '';
  let textColor = '';

  switch (user.category) {
    case 'TECHNOLOGY':
      backgroundColor = '#F7E9D6';
      textColor = '#FF8C00';
      break;
    case 'BUSINESS':
      backgroundColor = '#E0E0FF';
      textColor = '#9000FF';
      break;
    case 'HEALTH & FITNESS':
      backgroundColor = '#FCE8FB';
      textColor = '#FF0088';
      break;
    case 'SPIRITUALITY':
      backgroundColor = '#E4F0E1';
      textColor = '#006C04';
      break;
    default:
      backgroundColor = 'transparent';
      textColor = 'transparent';
  }

  return (
    <div className="user-card flex flex-col rounded-3xl">
      {user.category && (
        <header className="flex items-center">
          <div
            className={`py-2 px-4 border-b-2 rounded-t-2xl flex items-center gap-x-4 w-full justify-between`}
            style={{
              backgroundColor,
              color: textColor,
              borderBottomColor: textColor,
            }}
          >
            <h1 className="font-semibold tracking-wider">{user.category}</h1>
            <div className="flex items-center gap-x-2">
              <UserSocialLinks socials={user.socials} />
            </div>
          </div>
        </header>
      )}

      <div
        className={`bg-white p-4 ${
          user.category ? 'rounded-b-2xl' : 'rounded-2xl'
        } flex flex-col gap-y-4 flex-1`}
      >
        <div className="flex gap-x-3 items-center">
          <img
            src={user.profile_picture}
            alt="Mentor"
            className="rounded-full w-[50px] h-[50px]"
          />
          <div className="flex flex-col">
            <div className="flex gap-x-2 items-center">
              <h2 className="user-name">{user.name}</h2>
              <img
                src={verifiedIcon}
                alt="verified"
                className="w-[15px] mb-[2px]"
              />
            </div>
            <div className="flex gap-x-[6px] items-start">
              {user.company ? (
                <img src={companyIcon} alt="company" className="w-[12px]" />
              ) : (
                <img
                  src={universityIcon}
                  alt="university"
                  className="w-[12px]"
                />
              )}
              <p className="text-[10.5px] font-semibold text-[#5C3FD4]">
                {user.company || user.university}
              </p>
            </div>
          </div>
        </div>
        <div className="skills flex items-start">
          <span className="text-[#777777] font-semibold text-h6 pr-2">
            Skills:
          </span>
          <ul className="flex flex-wrap gap-2">
            {user.skills?.length > 0 && (
              <>
                {user.skills.slice(0, 3).map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className="text-[10px] font-semibold text-[#52515E] bg-[#F5EBFF] border border-[#F5EBFF] px-3 py-1 rounded-full tracking-wide"
                  >
                    #{skill}
                  </li>
                ))}
                {user.skills.length > 3 && (
                  <li className="text-[10px] font-semibold text-[#5C3FD4] bg-[#EDE9FE] border border-[#C4B5FD] px-3 py-1 rounded-full tracking-wide">
                    +{user.skills.length - 3} more
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
        <div className="flex justify-center gap-x-8">
          <button className="bg-[#5C3FD4] text-white text-h6 rounded-xl py-1 px-3 transition-all duration-300 ease-in-out hover:bg-[#4a2eb9] hover:scale-105 hover:shadow-lg">
            View Profile
          </button>
          <button className="text-h6 rounded-xl py-[3px] px-6 text-[#5C3FD4] border-2 border-[#5C3FD4] transition-all duration-300 ease-in-out hover:bg-[#f5f1ff] hover:border-[#4a2eb9] hover:scale-105 hover:shadow-lg">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;