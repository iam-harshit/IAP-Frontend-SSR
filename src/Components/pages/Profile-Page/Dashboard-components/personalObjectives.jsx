import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TargetDomainDropdown from './TargetDomainDropdown';
import { updateUserAsync } from '@/Reducers/userSlice';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify
import FormHeader from '@/Components/pages/Profile-Page/Form-components/FormHeader/FormHeader';

function PersonalObjectives({ formData, setFormData }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate

  // const [formData, setFormData] = useState({
  //   shortTermGoals: '',
  //   longTermGoals: '',
  //   targetDomain: [],  // Initialize as an array
  //   futureVision: '',
  //   preparationTime: '',
  //   dedicationHours: '',
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWordCount = (event) => {
    const { name, value } = event.target;
    const wordCount = value.trim().split(/\s+/).length;

    if (wordCount <= 200) {
      handleChange(event);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form Data:', formData);
    try {
      // Construct payload object with user profile information
      const payload = {
        fullname: currentUser?.fullname,
        username: currentUser?.username,
        profilePicture: currentUser?.profilePicture,
        country: currentUser?.country,
        userProfile: {
          about: currentUser?.userProfile?.about,
          workAndEducation: currentUser?.userProfile?.workAndEducation,
          personalObjective: {
            shortTermGoals: formData.shortTermGoals,
            longTermGoals: formData.longTermGoals,
            targetDomain: formData.targetDomain,
            futureVision: formData.futureVision,
            expectedPreparationTime: formData.preparationTime,
            dedicationHoursPerWeek: formData.dedicationHours,
          },
        },
      };

      dispatch(updateUserAsync(payload)); // Dispatch action with the payload data
      // console.log(payload)
      navigate(`/profile`); // Redirect to profile page
      toast.success('Successfully updated profile');
    } catch (error) {
      toast.error('Something went wrong while updating profile', error.message);
    }
  };

  return (
    <div className="mt-2 md:mt-4 mx-2">
      <FormHeader
        title={'Personal Objectives'}
        currentPath={'personal-objective'}
        step={2}
        desc={
          'The information you provide below will be shared with a Mentor. Your responses will help the Mentor decide whether to accept your request for a Trial session or a Long-term Plan.'
        }
      />
      <form onSubmit={handleSubmit} className="">
        {/* <div className='my-3 inline-flex items-center justify-left w-full'>
          <hr className='w-100 h-0.5 my-3 bg-customPurple border-0' />
          <span className='absolute px-1 text-[24px] bg-white font-semibold text-customPurple'>
            <h2>Personal Objectives</h2>
          </span>
        </div>
        <p>
          The information you provide below will be shared with a Mentor. Your responses will help the Mentor decide whether to accept your request for a Trial session or a Long-term Plan.
        </p> */}
        <div className="flex flex-col gap-4 p-2 my-3">
          <div className="flex flex-col">
            <label>Short-term Goals:</label>
            <textarea
              name="shortTermGoals"
              value={formData.shortTermGoals}
              // onChange={handleWordCount}
              onChange={(e) =>
                setFormData({ ...formData, shortTermGoals: e.target.value })
              }
              placeholder="Enter your short-term goals"
              className="border-customPurpleLight w-full mt-1 rounded pl-2 pt-2"
            />
          </div>

          <div className="flex flex-col">
            <label>Long-term Goals:</label>
            <textarea
              name="longTermGoals"
              value={formData.longTermGoals}
              // onChange={handleWordCount}
              onChange={(e) =>
                setFormData({ ...formData, longTermGoals: e.target.value })
              }
              placeholder="Enter your long-term goals"
              className="border-customPurpleLight w-full mt-1 rounded pl-2 pt-2"
            />
          </div>

          <div>
            <TargetDomainDropdown
              formData={formData}
              setFormData={setFormData}
            />
          </div>

          <div className="flex flex-col">
            <label>Future Vision (Next Few Years):</label>
            <input
              type="text"
              name="futureVision"
              value={formData.futureVision}
              // onChange={handleWordCount}
              onChange={(e) =>
                setFormData({ ...formData, futureVision: e.target.value })
              }
              placeholder="Where do you see yourself in the coming years?"
              className="border-customPurpleLight w-full mt-1 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label>Expected Preparation Time:</label>
            <select
              name="preparationTime"
              value={formData.preparationTime}
              // onChange={handleWordCount}
              onChange={(e) =>
                setFormData({ ...formData, preparationTime: e.target.value })
              }
              className="border-customPurpleLight w-full mt-1 rounded px-3 py-2 text-[16px]"
            >
              <option value="">Select Duration</option>
              <option value="I do not have a fixed timeline">
                I do not have a fixed timeline
              </option>
              <option value="Up to 1 month">Up to 1 month</option>
              <option value="2 to 3 months">2 to 3 months</option>
              <option value="4 to 8 months">4 to 8 months</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>Dedication Hours per Week:</label>
            <input
              type="number"
              name="dedicationHours"
              value={formData.dedicationHoursPerWeek}
              // onChange={handleWordCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dedicationHoursPerWeek: e.target.value,
                })
              }
              placeholder="Enter how many hours you can dedicate"
              className="border-customPurpleLight w-full mt-1 rounded"
            />
          </div>

          {/* <div>
            <button
              type='submit'
              className='border-customPurple text-sm w-full p-2.5 lg:w-44 font-bold rounded  bg-customPurple hover:bg-[#4e2cd6] text-white'
            >
              Submit
            </button>
          </div> */}
        </div>
      </form>
    </div>
  );
}

export default PersonalObjectives;
