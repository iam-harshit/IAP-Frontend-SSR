import { useState } from 'react';
import {
  MdAccessTime,
  MdHistoryEdu,
  MdLanguage,
  MdLocationOn,
  MdWork,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { truncate } from '../../../../utils/truncate';

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();

  const name = mentor?.name?.trim() || 'Mentor Name';
  const firstName = name.split(' ')[0];
  const imgSrc =
    mentor?.profilePicture ||
    `https://api.dicebear.com/5.x/initials/svg?seed=${firstName?.charAt(0)}`;
  const isTopMentor = mentor?.isTopMentor;
  const reviews = mentor?.reviews || 28;
  const rating = mentor?.rating || 5.0;
  const spotsLeft = mentor?.spotsLeft || 0;
  const experience = mentor?.totalExperience || '5+ Years';
  const location = mentor?.location || 'Unknown';
  const availableOn = mentor?.nextAvailableSlot
    ? new Date(mentor.nextAvailableSlot).toLocaleDateString(undefined, {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      })
    : 'Tomorrow';
  const languages = mentor?.languages || ['English', 'Hindi'];

  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => setShowFullDescription((prev) => !prev);

  const fullDescription =
    mentor?.description ||
    "I help professionals grow in tech and leadership with my hands-on experience at top companies.";

  // 🧠 Predefined and custom offerings
  const predefinedOfferings = Object.entries(mentor?.offerings?.predefined || {})
    .filter(([, value]) => value)
    .map(([key]) => key.replace(/([A-Z])/g, ' $1'));

  const customOfferings =
    mentor?.offerings?.custom?.map((item) => item.customOffering) || [];

  const offeringsToShow = [...predefinedOfferings, ...customOfferings];

  const handleMoreClick = () => {
    navigate(`/mentor/${mentor?.username}`);
  };

  return (
    <div className="bg-white border border-purple-100 rounded-2xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-4 sm:gap-5 relative">
      {spotsLeft > 0 && (
        <span className="absolute -top-3 right-2 bg-white text-purple-700 text-[10px] sm:text-[11px] px-2 sm:px-3 py-[2px] rounded-full border border-purple-300 z-10 font-medium shadow-sm">
          ⏳ Only {spotsLeft} Slots Left
        </span>
      )}

      {/* Mentor Profile Image */}
      <img
        src={imgSrc}
        alt={firstName}
        onError={(e) =>
          (e.target.src = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName?.charAt(0)}`)
        }
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-lg object-cover object-top border border-purple-200"
      />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Name + Country */}
          <div className="flex justify-between items-start sm:items-center flex-wrap gap-1">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-black leading-tight">
              {name}
              <span className="ml-2 uppercase text-[10px] sm:text-xs text-gray-500">
                {mentor?.countryCode || 'AU'}
              </span>
            </h2>
            {isTopMentor && (
              <span className="bg-purple-100 text-purple-700 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                <img src="/favicon.ico" alt="icon" className="size-5" />
                Top Mentor
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center text-xs sm:text-sm text-gray-600 mt-1">
            <span>⭐ {rating}</span>
            <span className="ml-1 text-[11px] text-gray-500">({reviews} reviews)</span>
          </div>

          {/* Designation */}
          {(() => {
            const latestExperience = mentor?.experience
              ?.filter((exp) => exp?.title && exp?.company)
              ?.sort((a, b) => {
                const aDate = a.endDate === 'Present' ? new Date('9999-12-31') : new Date(a.endDate);
                const bDate = b.endDate === 'Present' ? new Date('9999-12-31') : new Date(b.endDate);
                return bDate - aDate;
              })[0];

            return (
              <p className="text-[12px] sm:text-sm text-gray-700 mt-1 flex items-center gap-2">
                <MdWork className="text-purple-600 text-sm sm:text-base" />
                {latestExperience?.title || 'Software Engineer'} at{' '}
                <span className="font-medium">{latestExperience?.company || 'Company'}</span>
              </p>
            );
          })()}

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 mt-3 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MdAccessTime className="text-purple-600" />
              <span>
                Available: <strong>{availableOn}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MdLocationOn className="text-purple-600" />
              <span>
                Location: <strong>{location}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MdHistoryEdu className="text-purple-600" />
              <span>
                Experience: <strong>{experience}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MdLanguage className="text-purple-600" />
              <span>
                Languages: <strong>{languages.join(', ')}</strong>
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-3 border-t border-dashed border-purple-200" />

          {/* Bio */}
          <p className="text-[12px] sm:text-sm text-gray-600 leading-relaxed">
            {showFullDescription ? fullDescription : truncate(fullDescription || '', 150)}
            {fullDescription.length > 150 && (
              <button
                onClick={toggleDescription}
                className="ml-2 text-purple-600 font-medium hover:underline text-xs"
              >
                {showFullDescription ? 'Read less' : 'Read more'}
              </button>
            )}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 my-3">
            {mentor?.skills?.slice(0, 5).map((skill, idx) => (
              <span
                key={idx}
                className="bg-purple-50 text-purple-800 text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-medium"
              >
                #{skill}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-dashed border-purple-200" />

        {/* Offerings and CTA */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-left">
          <div className="flex flex-wrap gap-2 mt-2">
            {offeringsToShow.length > 0 && (
              <>
                {offeringsToShow.slice(0, 3).map((offer, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 bg-purple-100 text-purple-800 text-[11px] sm:text-xs px-2 py-[3px] rounded-lg border border-purple-200 shadow-sm"
                  >
                    <span>🎯</span>
                    <span>{offer}</span>
                  </div>
                ))}
                {offeringsToShow.length > 3 && (
                  <button
                    onClick={handleMoreClick}
                    className="text-xs text-purple-600 underline hover:text-purple-800"
                  >
                    + more
                  </button>
                )}
              </>
            )}
          </div>

          <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-5 py-2 rounded-md transition duration-300 w-full sm:w-auto">
            {mentor?.nextAvailableSlot ? 'View Slot' : 'Request Slot'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
