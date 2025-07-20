import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import toast from 'react-hot-toast';
import MultiSelectInput from './MultiSelectInput.jsx';
import { LanguagesList } from '@/Constants/Dashboard-Constants/Languages.js';
import Input from '@/Components/common/Input.jsx';
import Select from '@/Components/common/Select.jsx';
import TextArea from '@/Components/common/TextArea.jsx';
import { FaPlus } from 'react-icons/fa6';
import { countries } from '@/Constants/countries.js';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { isValidUrl } from '../../../../../../utils/validUrl.js';
import DashboardFillerCard from '@/Components/pages/Profile-Page/Form-components/common/DashboardFillerCard.jsx';

/**
 * EditAbout Component - Allows users to edit their personal information,
 * including profile picture, country, social links, and skills.
 */

const EditAbout = ({
  formData,
  setFormData,
  onChange,
  fields,
  onSubmit,
  loading,
}) => {
  // Fetch current user data from Redux store
  const { currentUser } = useSelector((state) => state.user);

  const [currentPlatform, setCurrentPlatform] = useState('');
  const [currentLink, setCurrentLink] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  //  Get Previous Language Object from formData
  const [langSelected, setLangSelected] = useState(
    formData?.language?.length ? formData?.language : [] || []
  );
  //  Get Previous Social Links Values from formDate
  const [socialLinks, setSocialLinks] = useState(
    formData?.socialLinks?.length
      ? formData?.socialLinks
      : currentUser?.socialMedia?.length > 0
        ? currentUser?.socialMedia
        : [{ platform: '', link: '' }]
  );

  const options = [
    { name: 'instagram' },
    { name: 'linkedin' },
    { name: 'twitter' },
    { name: 'github' },
  ];

  // Update form data whenever workDataList or eduList changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      socialLinks: socialLinks,
    }));
  }, [socialLinks]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Restricted Image to 100kb
    if (file.size > 200 * 1024) {
      toast.error('Image size should not exceed 200KB');
      return;
    }
    try {
      setIsUploading(true);
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.097,
        maxWidthOrHeight: 800,
      });

      const reader = new FileReader();
      reader.onload = () =>
        setFormData({ ...formData, profile_picture_url: reader?.result });

      reader.readAsDataURL(compressedFile);

      toast.success('Profile picture uploaded successfully');
    } catch (error) {
      toast.error('Failed to update profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSocialLinkAddOrUpdate = (e) => {
    e.preventDefault();

    if (!currentPlatform || !currentLink) {
      return toast.error('Please select a platform and enter a link.');
    }

    if (!isValidUrl(currentLink)) {
      toast.error('Please enter a valid URL');
      return;
    }

    const newLink = { platform: currentPlatform, link: currentLink };

    if (editIndex !== null && editIndex >= 0) {
      // Properly handle update
      const updatedLinks = [...socialLinks];
      updatedLinks[editIndex] = newLink;
      setSocialLinks(updatedLinks);
      setEditIndex(null);
    } else {
      // Check for duplicates only when adding
      if (socialLinks.some((link) => link.platform === currentPlatform)) {
        return toast.error('This platform is already added.');
      }

      // Add new link
      setSocialLinks([...socialLinks, newLink]);
    }

    setCurrentPlatform('');
    setCurrentLink('');
  };

  return (
    <>
      <div className="flex justify-between items-center  mt-2">
        <h1 className="text-h2 lg:text-h2 leading-tight text-customPurple px-4 sm:px-8">
          Personal Information
        </h1>
        <button
          type="submit"
          className="fixed top-32 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-customPurple text-white rounded-full shadow-lg hover:bg-[#4e2cd6] focus:ring-2 focus:ring-[#4e2cd6] transition-all duration-300"
          onClick={onSubmit}
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
      <form className="w-full mt-5 px-4 sm:px-8">
        <div className="my-4 flex flex-col lg:flex-row justify-between gap-6">
          <div className="w-full lg:w-[65%]">
            {/* Profile image */}
            <div className="relative flex flex-col items-center mt-1 rounded">
              <div className="relative border flex justify-center items-center bg-[#ccc] p-2 rounded-full">
                {isUploading && (
                  <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 rounded-full">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                  </div>
                )}
                <img
                  src={
                    formData?.profile_picture_url ||
                    `https://api.dicebear.com/5.x/initials/svg?seed=${currentUser?.name?.trim().charAt(0)}`
                  }
                  alt="Profile"
                  className="h-[80px] w-[80px] border-4 border-white rounded-full object-cover shadow-lg drop-shadow-xl"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('picture').click();
                  }}
                  className="absolute shadow-2xl drop-shadow-2xl bottom-0 right-5 translate-x-1/2 translate-y-1/2 p-2 text-white font-semibold rounded-full  bg-[#8204ff] hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                >
                  <FaPlus className="text-lg" />
                </button>
              </div>

              <input
                accept="image/*"
                type="file"
                id="picture"
                name="ProfilePictureURL"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>

            {/* Personal Fields */}
            <div className="flex gap-4 w-full mt-10">
              <div className="w-full grid grid-cols-1 gap-1">
                {fields &&
                  fields?.map((field) => (
                    <Input
                      key={field?.name}
                      type={field?.type}
                      name={field?.name}
                      value={field?.value}
                      placeholder={field?.placeholder}
                      onChange={onChange}
                      className="w-full"
                    />
                  ))}
                {/* Select Field */}
                <div className="w-full">
                  <Select
                    name="country"
                    placeholder="Select Country"
                    value={formData?.country}
                    defaultValue={currentUser?.country}
                    onChange={onChange}
                    options={countries}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Description and Social Links */}
            <TextArea
              name="description"
              placeholder="Description"
              value={formData?.description}
              onChange={onChange}
              rows={3}
              cols={3}
            />

            {/* Social Links Section */}
            <div className="flex flex-col w-full">
              <div className="relative my-3 inline-flex items-center justify-left w-full">
                <hr className="w-100 h-0.5 my-3 bg-customPurple border-0" />
                <span className="absolute text-h6 uppercase bg-white font-semibold text-customPurple">
                  <h2>Social Links</h2>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                <Select
                  name="platform"
                  placeholder="Platform"
                  value={currentPlatform}
                  onChange={(e) => setCurrentPlatform(e.target.value)}
                  options={options}
                  className="w-full sm:w-[30%] min-w-[120px]"
                />
                <Input
                  type="url"
                  name="link"
                  placeholder="Enter Link"
                  value={currentLink}
                  onChange={(e) => setCurrentLink(e.target.value)}
                  className="w-full sm:w-[60%]"
                />
                <button
                  className="bg-customPurple text-white px-4 py-2 rounded hover:bg-[#4e2cd6]"
                  onClick={handleSocialLinkAddOrUpdate}
                >
                  {editIndex !== null ? 'Update' : 'Add'}
                </button>
              </div>

              {/* Display Existing Social Links */}
              {socialLinks?.some((item) => item?.platform && item?.link) && (
                <div className="mt-4 space-y-3">
                  {socialLinks?.map((item, index) => {
                    if (!item?.platform || !item?.link) return null;

                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 mb-3 rounded-2xl shadow-md border border-gray-200 bg-white hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex flex-col max-w-[75%]">
                          <span className="text-md font-semibold capitalize text-gray-800 mb-1">
                            {item?.platform.toUpperCase()}
                          </span>
                          <a
                            href={item?.link}
                            className="text-[#8800ff] hover:text-blue-700 hover:underline break-words text-h6 transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item?.link}
                          </a>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentPlatform(item?.platform);
                              setCurrentLink(item?.link);
                              setEditIndex(index);
                            }}
                            className="p-2 rounded-full transition duration-200"
                            title="Edit"
                          >
                            <FiEdit className="w-5 h-5 text-[#702DFF]" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const updated = socialLinks?.filter(
                                (_, i) => i !== index
                              );
                              setSocialLinks(updated);
                              if (editIndex === index) {
                                setEditIndex(null);
                                setCurrentPlatform('');
                                setCurrentLink('');
                              }
                            }}
                            className="p-2 rounded-full hover:bg-red-100 transition duration-200"
                            title="Delete"
                          >
                            <FiTrash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <MultiSelectInput
                formName={'language'}
                formDesc={'Selected Languages'}
                placeholder={'Select known languages'}
                ItemsArray={LanguagesList}
                itemSelected={langSelected}
                setItemSelected={setLangSelected}
                setFormData={setFormData}
              />
            </div>
          </div>
          <div className="w-full lg:w-[55%] hidden lg:flex flex-col gap-3 lg:sticky lg:top-4 mt-4">
            <DashboardFillerCard />
          </div>
        </div>
      </form>
    </>
  );
};

export default EditAbout;
