import React, { useCallback, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import FormStepper from './FormStepper.jsx';
// import SectionNavigator from '../SectionNavigator'
import { useDispatch, useSelector } from 'react-redux';
// import { setEditing, setSection } from '../../../../../Reducers/userSlice'
import { useNavigate } from 'react-router-dom';
import { setEditing, setSection } from '../../../../../Reducers/userSlice.js';
import SectionNavigator from './SectionNavigator.jsx';
// Below component was added during Profile Page phase 2.
{
  /* 
    Component:FormHeader
    1. Phase: ProfilePagePhase2
    2. Comment: This is Form Header,which comprises of following thigns:Form Name,Stepper,SectionNavigator & BAck to Profile..
    3. Props:
      a. title:Sets the title of Form
      b. step: Prop which is passed in StepperComponent,accepts Number.
      c. desc: Form Description.
      d. next: Next Form Path //Passed Inside SectionNavigator Component
      e. back: Previous Form Path //Passed Inside SectionNavigator Component
  */
}
const FormHeader = ({ title, currentPath, step, desc }) => {
  const { currentUser } = useSelector((state) => state.user);
  const isMentor = currentUser?.Role === 'mentor';
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const StepItems = [
    { path: 'background-details' },
    { path: 'professional-details' },
    { path: 'long-term-membership' },
    { path: 'pricing-offering' },
  ];

  const StepItemsMentee = [
    { path: 'background-details' },
    { path: 'professional-details' },
  ];
  // Determine the current step items based on user role
  const stepItems = isMentor ? StepItems : StepItemsMentee;
  // Get current step index and calculate next and previous steps
  const currentIndex = stepItems.findIndex((item) => item.path === currentPath);
  const nextStep =
    currentIndex < stepItems.length - 1
      ? stepItems[currentIndex + 1].path
      : null;
  const prevStep = currentIndex > 0 ? stepItems[currentIndex - 1].path : null;

  const handleBackToProfile = () => {
    dispatch(setEditing(false));
    navigate('/profile');
  };

  return (
    <div className="">
      <div className="flex flex-row justify-between md:hidden mb-2">
        <div className="flex flex-row justify-center items-center gap-1">
          <IoArrowBack className="text-gray-600" />
          <button
            className="text-gray-700 text-[17px] font-medium  hover:underline hover:underline-offset-4"
            onClick={handleBackToProfile}
          >
            Back to Profile
          </button>
        </div>
        <SectionNavigator
          className="hidden md:block"
          back={prevStep}
          next={nextStep}
        />
      </div>
      <hr className="md:hidden text-customPurple"></hr>
      <div className="px-1.5 md:px-3 pt-2 pb-4 flex flex-row justify-between gap-3">
        <div className="flex flex-col justify-center  ">
          {/* title */}

          <div className="flex flex-row   items-center gap-2">
            <div className=" text-[28px] md:text-[28px] lg:text-[33px] text-customPurple font-semibold">
              <h2>{title}</h2>
            </div>
          </div>

          <p className="text-[15px] my-1 text-gray-500">{desc}</p>
          {/* <div className=' max-w-[208px] md:max-w-[300px] '>
            Below is the stepper Component which takes in step number as a prop
            <FormStepper currStep={step} currentUser={currentUser}  />
          </div> */}
        </div>
        {/* <div className=' hidden md:flex md:max-w-[50%] mx-2 flex-col justify-center items-end'>
          <div className=''>
            Below Component provides Arrow Navigation. Please Specify the path for previous form and next form in back & next.
            <SectionNavigator
              className='hidden md:block'
              back={prevStep}
              next={nextStep}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FormHeader;
