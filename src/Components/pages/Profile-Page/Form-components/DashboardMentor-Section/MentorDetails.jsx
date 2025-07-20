import React, { useState } from 'react';
import MultiSelectInput from '../MultiSelectInput';
import { categories } from '@/Constants/Dashboard-Constants/Categories';
import { LanguagesList } from '@/Constants/Dashboard-Constants/Languages';
import { offeringsAvailable } from '@/Constants/Dashboard-Constants/Offerings';
import Select from '@/Components/common/Select';
import Input from '@/Components/common/Input';
import { FaSpinner } from 'react-icons/fa';
import { handleMentorUpdateProfileApi, handleMyProfileApi } from '@/services/Operations/ProfileOperation/ProfilePageApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, updateProfileDetails } from '@/Reducers/userSlice';
import { isValidUrl } from '../../../../../../utils/validUrl';
import DashboardFillerCard from '@/Components/pages/Profile-Page/Form-components/common/DashboardFillerCard';

const MentorDetails = () => {
  const {currentUser}= useSelector((state) => state.user);
  const {mentorDetails} = currentUser;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState(
    mentorDetails?.mentorshipCategory || []
  );
  const [offerings, setOfferings] = useState(mentorDetails?.offerings || []);
  const [languages, setLanguages] = useState(
    mentorDetails?.availableLanguages || []
  );
  const [availability, setAvailability] = useState(
    mentorDetails?.availabilityStatus || []
  );
  const [website, setWebsite] = useState(mentorDetails?.website || '');
  const [videoUrl, setVideoUrl] = useState(mentorDetails?.introVideoUrl || '');
  const [responseTime, setResponseTime] = useState(
    mentorDetails?.avgResponseTime || ''
  );
  const [loading, setLoading] = useState(false);

  const options = [
    { label: 'Available', name: 'available' },
    { label: 'Away', name: 'away' },
    { label: 'Booked', name: 'booked' },
  ];

  const hours = [
    {
      label: '3',
      name: '3',
    },
    {
      label: '6',
      name: '6',
    },
    {
      label: '9',
      name: '9',
    },
  ];

  
  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    mentorshipCategory: category || mentorDetails?.mentorshipCategory,
    offerings: offerings || mentorDetails?.offerings,
    availableLanguages: languages || mentorDetails?.availableLanguages,
    availabilityStatus: availability || mentorDetails?.availabilityStatus,
    website: website || mentorDetails?.website,
    introVideoUrl: videoUrl || mentorDetails?.introVideoUrl,
    avgResponseTime: responseTime || mentorDetails?.avgResponseTime,
  };

  const hasOneUpdate =
    category ||
    offerings ||
    languages ||
    availability ||
    website ||
    videoUrl ||
    responseTime;

  if (!hasOneUpdate) {
    toast.error('Please fill in all fields');
    return;
  }

  if (
    (website && !isValidUrl(website)) ||
    (videoUrl && !isValidUrl(videoUrl))
  ) {
    toast.error('Please enter a valid URL');
    return;
  }

  try {
    setLoading(true);

    const updateResponse = await handleMentorUpdateProfileApi(payload);

    if (updateResponse.status === 200) {
      toast.success('Profile updated successfully');

      // Fetch the latest profile after update
      const profileResponse = await handleMyProfileApi();
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
          Mentor Details
        </h1>
        <button
          type="submit"
          className="fixed top-32 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-customPurple text-white rounded-full shadow-lg hover:bg-[#4e2cd6] focus:ring-2 focus:ring-[#4e2cd6] transition-all duration-300"
          onClick={handleSubmit}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span>Update</span>
              <FaSpinner className="animate-spin" />
            </>
          ) : (
            <span>Update</span>
          )}
        </button>
      </div>
      <div className="my-4 flex flex-col lg:flex-row justify-between gap-6 md:ml-0 xl:ml-20">
        <div className="w-full sm:w-full md:w-full lg:w-1/2 relative">
          <Select
            name="Mentorship Needs"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Mentorship Needs"
            options={categories}
            className="mb-4"
            multiple={false}
          />

          <MultiSelectInput
            formName="Mentorship Offerings"
            formDesc="Select the offerings you provide"
            placeholder="Add an offering"
            ItemsArray={offeringsAvailable}
            itemSelected={offerings}
            setItemSelected={setOfferings}
            allowCustomAdd={true}
          />

          <MultiSelectInput
            formName="Available Languages"
            formDesc="Select the languages you are proficient in"
            placeholder="Add a language"
            ItemsArray={LanguagesList}
            itemSelected={languages}
            setItemSelected={setLanguages}
            allowCustomAdd={false}
          />

          <Select
            name="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="Select availability"
            options={options}
            className="mb-4"
            multiple={false}
          />

          <Input
            type="url"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mb-4"
          />

          <Input
            type="url"
            placeholder="Video URL"
            name="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="mb-4"
          />

          <Select
            name="responseTime"
            value={responseTime}
            onChange={(e) => setResponseTime(e.target.value)}
            placeholder="Response Time (In Hours)"
            options={hours}
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

export default MentorDetails;
