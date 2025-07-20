import TagInput from '@/Components/common/TagInput';
import React, { useState } from 'react';
import MultiSelectInput from '../MultiSelectInput';
import { LanguagesList } from '@/Constants/Dashboard-Constants/Languages';
import { handleMenteeUpdateProfileApi, handleMyProfileApi } from '@/services/Operations/ProfileOperation/ProfilePageApi';
import { FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '@/Reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Select from '@/Components/common/Select';
import { categories } from '@/Constants/Dashboard-Constants/Categories';
import DashboardFillerCard from '@/Components/pages/Profile-Page/Form-components/common/DashboardFillerCard';
// import { categories } from '@/Constants/Home-Constants/categories';

const MenteeDetails = () => {
  const {currentUser}= useSelector((state) => state.user);
  const {menteeDetails} = currentUser;


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mentorshipNeeds, setMentorshipNeeds] = useState(
    menteeDetails?.mentorshipNeeds || []
  );
  const [goals, setGoals] = useState(menteeDetails?.learningGoals || []);
  const [languages, setLanguages] = useState(
    menteeDetails?.languagePreference || []
  );
  const [category, setCategory] = useState(
    menteeDetails?.preferredMentorCategory || ''
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      mentorshipNeeds: mentorshipNeeds || menteeDetails?.mentorshipNeeds,
      learningGoals: goals || menteeDetails?.learningGoals,
      languagePreference: languages || menteeDetails?.languagePreference,
      preferredMentorCategory:
        '663f84f13625742b2c8341d3' || menteeDetails?.preferredMentorCategory,
      // preferredMentorCategory: category, // Ensure this is set correctly
    };

    const hasOneUpdate = mentorshipNeeds || goals || languages;

    if (!hasOneUpdate) {
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await handleMenteeUpdateProfileApi(payload);

      if (response.status === 200) {
  toast.success('Profile updated successfully');

      // Fetch the latest profile after update
      const profileResponse = await handleMyProfileApi();
      console.log(profileResponse);
      if (profileResponse.status === 200) {
        dispatch(signInSuccess(profileResponse?.data?.data));
      } else {
        toast.error('Profile updated but failed to fetch latest profile data');
      }

      navigate('/dashboard');
    } else {
      toast.error('Failed to update profile, please try again');
      console.warn('Update failed:', updateResponse);
    }
  } catch (error) {
    toast.error('Something went wrong, please try again later');
    console.error('Update error:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div className="flex justify-between items-center  mt-2 xl:ml-20">
        <h1 className="text-h2 lg:text-h2 leading-tight text-customPurple">
          Mentee Details
        </h1>

        <button
          type="submit"
          className="fixed top-32 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-customPurple text-white rounded-full shadow-lg hover:bg-[#4e2cd6] focus:ring-2 focus:ring-[#4e2cd6] transition-all duration-300"
          onClick={handleSubmit}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <p>Update</p>
              <FaSpinner className="animate-spin" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p>Update</p>
            </div>
          )}
        </button>
      </div>
      <div className="my-4 flex flex-col lg:flex-row justify-between gap-6 md:ml-0 xl:ml-20">
        <div className="w-full sm:w-full md:w-full lg:w-1/2 relative">
          <TagInput
            label="Mentorship Needs"
            tags={mentorshipNeeds}
            setTags={setMentorshipNeeds}
          />

          {/* Learning Goals - Styled Tag Input */}
          <TagInput label="Learning Goals" tags={goals} setTags={setGoals} />

          {/* Language Preference Dropdown */}

          <MultiSelectInput
            formName="Language Preference"
            formDesc="Select your preferred languages"
            placeholder="Add a language"
            ItemsArray={LanguagesList}
            itemSelected={languages}
            setItemSelected={setLanguages}
          />

          {/* Preferred Mentor Category Dropdown */}
          <Select
            name="Preferred Mentor Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Preferred Mentor Category"
            options={categories}
            className="mb-4"
            multiple={false}
          />
        </div>
        {/* Just Added For Design Point Of View */}
        <div className="w-full lg:w-[45%] hidden lg:flex flex-col gap-3 lg:sticky lg:top-4 mt-4">
          <DashboardFillerCard />
        </div>
      </div>
    </>
  );
};

export default MenteeDetails;
