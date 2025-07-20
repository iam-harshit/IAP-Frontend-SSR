import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';

const Completion = ({ userData, changeSection, isMentor }) => {
  const [completion, setCompletion] = useState({});
  const [percentage, setPercentage] = useState(0);
  const mentor = ['profilePicture', 'language', 'education', 'experience'];
  const mentee = ['profilePicture', 'language', 'education'];

  const calculatePercentage = (data) => {
    const list = isMentor ? mentor : mentee;
    let value = list.filter((item) => data[item]).length;
    setPercentage(Math.round((value / list.length) * 100));
  };

  useEffect(() => {
    const data = {};
    data['profilePicture'] = userData?.profilePicture ? true : false;
    data['language'] = userData?.language?.length > 0;
    data['education'] = userData?.education.length > 0;

    if (isMentor) {
      data['experience'] = userData?.experience?.length > 0 ? true : false;
      data['domain'] = userData?.skills?.length > 0;
    }

    setCompletion(data);

    calculatePercentage(completion);
  }, [userData]);

  useEffect(() => {
    calculatePercentage(completion);
  }, [completion]);

  return (
    percentage !== 100 && (
      <div className="flex flex-col items-start gap-2  lg:ml-4 md:mt-[10px]">
        <h2 className=" text-h4  font-medium flex flex-col  sm:flex-row sm:gap-2">
          Complete Your Profile
        </h2>

        <div className="flex  sm:my-0">
          <p className="text-[#4b4b4bb9] font-medium ">Profile Strength: </p>{' '}
          <p className="ml-2 font-medium">
            {percentage < 33
              ? 'Beginner'
              : percentage < 66
                ? 'Intermediate'
                : 'Advanced'}
          </p>
          <p className="ml-2 font-medium my-auto "> ({percentage}%) </p>
        </div>

        <div className="flex gap-2 mt-2">
          {isMentor
            ? mentor.map((item, index) => (
                <CompletionButton
                  key={index}
                  data={completion}
                  index={index}
                  value={item}
                  changeSection={changeSection}
                />
              ))
            : mentee?.map((item, index) => (
                <CompletionButton
                  key={index}
                  data={completion}
                  index={index}
                  value={item}
                  changeSection={changeSection}
                />
              ))}
        </div>
      </div>
    )
  );
};

const CompletionButton = ({ data, index, value, changeSection }) => {
  return (
    <button
      disabled={data[value]}
      onClick={() => changeSection('background-details')}
      className={`h-2 relative w-12 rounded-full ${data[value] ? 'bg-customPurple' : 'bg-[#dcd6f6]'}`}
      data-tooltip-id={value}
      data-tooltip-content={value[0].toUpperCase() + value.slice(1)}
    >
      <Tooltip id={data[value] ? '' : value} place="bottom" />
    </button>
  );
};

export default Completion;
