import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Career from '@/Components/pages/Profile-Page/Form-components/DashboardCareer-Section/Career';
import Education from '@/Components/pages/Profile-Page/Form-components/DashboardCareer-Section/Education';
import DisplayList from '@/Components/pages/Profile-Page/Form-components/common/DisplayList';
import { getMonthAndYear } from '../../../../../../utils/dateConverter';
import { FaSpinner } from 'react-icons/fa';
import {
  handleAddEntry,
  handleDeleteEntry,
  handleEditEntry,
} from '../../../../../../utils/handleEntries';
import DropDownMultiSelect from '../DashboardAbout-Section/DropDownMultiSelect';
import { ExpertiseList } from '@/Constants/Dashboard-Constants/SkillsList';
import DashboardFillerCard from '@/Components/pages/Profile-Page/Form-components/common/DashboardFillerCard';

const WorkCareerSection = ({
  formData,
  setFormData,
  career,
  education,
  onChange,
  onSubmit,
  loading,
}) => {
  // Fetch current user data from Redux store
  const { currentUser } = useSelector((state) => state.user);
  // State to manage work experience and education lists
  const [workDataList, setWorkDataList] = useState([]);
  const [eduList, setEduList] = useState([]);
  // State to track editing mode and indexes
  const [edit, setEdit] = useState(false);
  const [eduIndex, setEduIndex] = useState(null);
  const [workIndex, setWorkIndex] = useState(null);

  // Load initial work and education data from user profile
  useEffect(() => {
    // Initialize work data
    if (currentUser && currentUser?.experience) {
      setWorkDataList(currentUser?.experience);
    }

    // Initialize education data
    if (currentUser && currentUser?.education) {
      setEduList(currentUser?.education);
    }
  }, [currentUser]);

  // Get Previous Skills from formData
  const [expertise, setExpertise] = useState(
    formData?.skills?.length
      ? formData?.skills
      : currentUser?.userProfile?.about?.skills || []
  );

  // Update form data whenever workDataList or eduList changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      experience: workDataList,
      education: eduList,
    }));
  }, [workDataList, eduList]);

  // Function to render DisplayList For Both WorkExperience and Educaetion
  const renderDisplayList = (dataList, type, editHandler, deleteHandler) =>
    dataList.map((e, index) => (
      <DisplayList
        key={index}
        title={type === 'work' ? e.title : e.degree}
        subtitle={
          type === 'work'
            ? e.company
              ? e.company
              : e.company
            : e.institution
              ? e.institution
              : e.institution
        }
        startDate={
          type === 'work'
            ? `${getMonthAndYear(e.startDate)[0]} ${getMonthAndYear(e.startDate)[1]}`
            : `${e.startYear}`
        }
        endDate={
          type === 'work'
            ? e.endDate && e.endDate !== 'Present'
              ? `${getMonthAndYear(e.endDate)?.[0]} ${getMonthAndYear(e.endDate)?.[1]}`
              : 'Present'
            : `${e.endYear}`
        }
        image={`https://cdn-icons-png.flaticon.com/128/${type === 'work' ? '2098/2098316.png' : '15759/15759125.png'}`}
        onEdit={(event) => editHandler(event, index, e)}
        onDelete={(event) => deleteHandler(event, index)}
      />
    ));

  const workEdit = (event, index, updatedData) => {
    event.preventDefault();
    setEdit(true);
    setWorkIndex(index);
    setFormData((prev) => ({
      ...prev,
      company: updatedData?.company || '',
      title: updatedData?.title || '',
      companyWebsite: updatedData?.companyWebsite || '',
      c_startDate: updatedData?.startDate || '',
      c_endDate: updatedData?.endDate || '',
      currentlyWorking:
        updatedData?.endDate === 'Present' ? true : formData?.currentlyWorking,
    }));
  };

  const educationEdit = (event, index, updatedData) => {
    event.preventDefault();
    console.log(updatedData, 'updatedData');
    setEdit(true);
    setEduIndex(index);
    setFormData((prev) => ({
      ...prev,
      institution: updatedData?.institution || updatedData?.institution || '',
      degree: updatedData?.degree || '',
      startYear: updatedData?.startYear || '',
      endYear: updatedData?.endYear || '',
    }));
  };

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <h1 className="text-h2 lg:text-h2 leading-tight text-customPurple px-4 sm:px-8">
          Work Experience
        </h1>
        <div className="flex gap-2">
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
      </div>
      <form className="w-full mt-5 px-4 sm:px-8">
        <div className="my-4 flex flex-col lg:flex-row justify-between gap-6 md:ml-0">
          <div className="w-full lg:w-[60%]">
            <Career
              career={career}
              onChange={onChange}
              formData={formData}
              setFormData={setFormData}
            />
            {/* Work Experience Add Or Edit Button Logic */}
            {!edit ? (
              <button
                type="button"
                onClick={() =>
                  handleAddEntry(
                    'work',
                    formData,
                    setFormData,
                    setWorkDataList,
                    setEduIndex
                  )
                }
                className="bg-[#8800ff] mt-4 text-white text-xs px-4 py-2 rounded-md transition-all duration-300 ease-in-out 
             hover:bg-customPurple hover:shadow-lg hover:scale-105 transform"
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  handleEditEntry(
                    'work',
                    formData,
                    setFormData,
                    workIndex,
                    eduIndex,
                    workDataList,
                    setWorkDataList,
                    eduList,
                    setEduList,
                    setWorkIndex,
                    setEduIndex,
                    setEdit
                  )
                }
                className="bg-[#8800ff] mt-4 text-white text-xs px-4 py-2 rounded-md transition-all duration-300 ease-in-out 
             hover:bg-customPurple hover:shadow-lg hover:scale-105 transform"
              >
                Update
              </button>
            )}
            {/* Show Work Experience Cards */}
            <div className="my-3">
              {renderDisplayList(
                workDataList,
                'work',
                workEdit,
                (event, index) => {
                  event.preventDefault();
                  handleDeleteEntry('work', index, setWorkDataList, setEduList);
                }
              )}
            </div>
            <div className="w-100 mt-2">
              <h1 className="text-h2 lg:text-h2 font-semibold leading-tight text-customPurple  ">
                Education Section
              </h1>
              {/* All Education Related Fields */}
              <Education
                education={education}
                onChange={onChange}
                formData={formData}
                setFormData={setFormData}
              />
              {/* Education Add Or Edit Button Logic */}
              {!edit ? (
                <button
                  type="button"
                  onClick={() =>
                    handleAddEntry(
                      'education',
                      formData,
                      setFormData,
                      setWorkDataList,
                      setEduList
                    )
                  }
                  className="bg-[#8800ff] mt-4 text-white text-xs px-4 py-2 rounded-md transition-all duration-300 ease-in-out 
             hover:bg-customPurple hover:shadow-lg hover:scale-105 transform"
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    handleEditEntry(
                      'education',
                      formData,
                      setFormData,
                      workIndex,
                      eduIndex,
                      workDataList,
                      setWorkDataList,
                      eduList,
                      setEduList,
                      setWorkIndex,
                      setEduIndex,
                      setEdit
                    )
                  }
                  className="bg-[#8800ff] mt-4 text-white text-xs px-4 py-2 rounded-md transition-all duration-300 ease-in-out 
             hover:bg-customPurple hover:shadow-lg hover:scale-105 transform"
                >
                  Update
                </button>
              )}
              {/* Show Education Cards */}
              <div className="my-3">
                {renderDisplayList(
                  eduList,
                  'education',
                  educationEdit,
                  (event, index) => {
                    event.preventDefault();
                    handleDeleteEntry(
                      'education',
                      index,
                      setWorkDataList,
                      setEduList
                    );
                  }
                )}
              </div>
            </div>
            <DropDownMultiSelect
              formName="skills"
              formDesc={'Selected skills'}
              placeholder={'Select or add your Skills'}
              ItemsArray={ExpertiseList}
              itemSelected={expertise}
              setItemSelected={setExpertise}
              setFormData={setFormData}
            />
          </div>

          {/* Just Added For Design Point Of View */}
          <div className="w-full lg:w-[50%] hidden lg:flex flex-col gap-3 lg:sticky lg:top-4 mt-4">
            <DashboardFillerCard />
          </div>
        </div>
      </form>
    </>
  );
};

export default WorkCareerSection;
