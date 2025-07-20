import React, { useEffect, useState, useMemo } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import profileCompletedImage from '@/assets/Profile-Page/profile-completed.png';

const ProgressBar = ({ remainingFields, requiredFields }) => {
  if (!requiredFields) return null;

  const completionPercentage = Math.round(
    ((requiredFields - remainingFields) / requiredFields) * 100
  );

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <h2 className="font-semibold text-h5">{completionPercentage}%</h2>
      <div className="w-[90%]">
        <div className="border h-[9px] rounded-md">
          <div
            style={{ width: `${completionPercentage}%` }}
            className="h-[8px] bg-gradient-to-r from-indigo-700 to-purple-600 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

function FormCompletionModule({ UserData }) {
  const [emptyFields, setEmptyFields] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const isMentor = currentUser?.role === 'mentor';

  useEffect(() => {
    const checkEmptyFields = (data) => {
      const { profilePictureURL, userProfile } = data;
      const { about = {}, workAndEducation = {} } = userProfile || {};

      const missing = [];

      if (!profilePictureURL) missing.push('profilePicture');

      if (
        isMentor &&
        (!workAndEducation?.work?.length ||
          !Array.isArray(workAndEducation?.work))
      ) {
        missing.push('work');
      }

      if (
        !workAndEducation?.education?.length ||
        !Array.isArray(workAndEducation?.education)
      ) {
        missing.push('education');
      }

      if (
        !about?.languagesKnown?.length ||
        !Array.isArray(about?.languagesKnown)
      ) {
        missing.push('languages');
      }

      setEmptyFields(missing);
    };

    if (UserData) checkEmptyFields(UserData);
  }, [UserData, isMentor]);

  const completionData = useMemo(
    () => [
      {
        name: 'profilePicture',
        title: 'Add Profile Picture',
        link: 'background-details',
      },
      { name: 'languages', title: 'Add Languages', link: 'background-details' },
      {
        name: 'education',
        title: 'Add Education',
        link: 'professional-details',
      },
      ...(isMentor
        ? [
            {
              name: 'work',
              title: 'Add Work Experience',
              link: 'professional-details',
            },
          ]
        : []),
    ],
    [isMentor]
  );

  if (!emptyFields) return null;

  return (
    <div className="h-full">
      {emptyFields?.length === 0 ? (
        <div className="p-4 flex flex-col items-center gap-1 bg-white rounded-lg shadow border border-[#680AFF] min-h-full">
          <img
            src={profileCompletedImage}
            alt="profile-completed"
            className="w-3/4 lg:w-full"
          />
          <h2 className="text-h3 font-semibold text-gray-800">
            Profile Completed!🎉
          </h2>
          <p className="text-gray-700 text-h6 text-center">
            You’ve successfully completed your profile. You're now more
            discoverable by mentees. Keep up the good work!
          </p>
        </div>
      ) : (
        <div className="p-3 md:p-4 flex flex-col gap-3 bg-white rounded-lg shadow border border-[#680AFF] min-h-full">
          <h2 className="text-h3 font-semibold text-gray-800">
            Complete your profile.
          </h2>
          <p className="text-h6 text-gray-700">
            By completing all the details you have a higher chance of getting
            new mentees.
          </p>

          <ProgressBar
            requiredFields={completionData?.length}
            remainingFields={emptyFields?.length}
          />

          <div className="flex flex-col sm:flex-row flex-wrap gap-2">
            {completionData?.map((fieldItem, index) => {
              const isMissing = emptyFields.includes(fieldItem.name);
              return (
                <div
                  key={index}
                  className="border py-2 px-3 rounded-md w-full sm:w-auto"
                >
                  {isMissing ? (
                    <Link to={`edit?section=${fieldItem?.link}`}>
                      <div className="flex justify-between items-center cursor-pointer">
                        <div className="flex items-center gap-2">
                          <IoMdCheckmarkCircleOutline className="text-gray-400 w-7 h-7" />
                          <h3 className="text-caption font-semibold text-gray-700">
                            {fieldItem?.title}
                          </h3>
                        </div>
                        <div className="flex items-center ml-2">
                          <h2 className="text-h6 text-customPurple font-semibold hover:underline">
                            Complete
                          </h2>
                          <MdArrowOutward className="w-4 h-4 text-customPurple" />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <IoMdCheckmarkCircleOutline className="text-customPurple w-7 h-7" />
                        <h3 className="text-caption font-semibold text-gray-700">
                          {fieldItem?.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default FormCompletionModule;
