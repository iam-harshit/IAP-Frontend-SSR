import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const FormStepper = ({ currStep, currentUser }) => {
  // Below Array is for Titles.
  const isMentor = currentUser?.role === 'mentor';
  const StepItems = ['About', 'Career', 'Availability', 'Offereings'];
  const stepItemsMentee = ['About', 'Career'];
  // Below Array is for Form Paths.
  const StepperRoutes = [
    'background-details',
    'professional-details',
    'long-term-membership',
    'pricing-offering',
  ];
  const stepperRoutesMentee = ['background-details', 'professional-details'];
  const navigate = useNavigate();
  const changeSection = useCallback((newSection) => {
    if (newSection) {
      navigate(`/dashboard/${newSection}`); // Navigating to section with edit mode
    } else {
      return null;
    }
  }, []);
  return (
    <div className="flex justify-center items-center w-full  mx-auto py-2">
      {isMentor
        ? StepItems.map((e, index) => {
            return (
              <React.Fragment key={index}>
                {index == 0 ? null : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    key={index}
                    viewBox="0 0 24 24"
                    className={`h-1  w-full ${currStep < index ? 'bg-gray-300' : 'bg-customPurple'} `}
                  ></svg>
                )}
                <div
                  className={` relative w-56 md:w-42 cursor-pointer p-0.5 ${currStep < index ? 'bg-gray-300' : 'bg-customPurple'} rounded-full  flex justify-center align-middle`}
                  onClick={() => changeSection(StepperRoutes[index])}
                >
                  <span
                    className={`${currStep < index ? 'text-gray-500' : 'text-white'}  text-[14px] md:text-[16px] `}
                  >
                    {' '}
                    {index + 1}
                  </span>
                  <p className="block text-slate-600 font-semibold absolute text-[8px] md:text-[11px] bottom-[-70%]">
                    {e}
                  </p>
                </div>
              </React.Fragment>
            );
          })
        : stepItemsMentee.map((e, index) => {
            return (
              <React.Fragment key={index}>
                {index == 0 ? null : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    key={index}
                    viewBox="0 0 24 24"
                    className={`h-1  w-full ${currStep < index ? 'bg-gray-300' : 'bg-customPurple'} `}
                  ></svg>
                )}
                <div
                  className={` relative w-56 md:w-42 cursor-pointer p-0.5 ${currStep < index ? 'bg-gray-300' : 'bg-customPurple'} rounded-full  flex justify-center align-middle`}
                  onClick={() => changeSection(stepperRoutesMentee[index])}
                >
                  <span
                    className={`${currStep < index ? 'text-gray-500' : 'text-white'}  text-[14px] md:text-[16px] `}
                  >
                    {' '}
                    {index + 1}
                  </span>
                  <p className="block text-slate-600 font-semibold absolute text-[8px] md:text-[11px] bottom-[-70%]">
                    {e}
                  </p>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
};

export default FormStepper;
