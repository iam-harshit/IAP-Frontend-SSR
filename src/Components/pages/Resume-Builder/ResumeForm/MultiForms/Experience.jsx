import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import FormStepper from "./FormStepper/FormStepper.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { setExperienceData } from '../../../../../Reducers/ResumeBuilderFormDataSlice.js';
import DOMPurify from 'dompurify';
import { MdDelete } from 'react-icons/md';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill.css';

export const ExperienceTab = ({
  idRef,
  jobRole,
  companyName,
  startDate,
  endDate,
  expDescription,
  deleteExpData,
}) => {
  const sanitizedHtml = DOMPurify.sanitize(expDescription);

  return (
    <>
      {/* <div className="border border-gray-200 p-4 my-4"> */}

      <div className="rounded-lg border border-gray-400  w-[95%]  my-2 px-4 py-4">
        <div className="flex flex-row justify-between ">
          <h3 className="text-md font-semibold">
            {jobRole} at <span className="text-gray-600">{companyName}</span>
          </h3>
          <div className="flex flex-row justify-center ">
            <h3 className="text-md text-cyan-600 ">
              From {startDate} to {endDate}
            </h3>
            <MdDelete
              onClick={() => deleteExpData(idRef)}
              className=" cursor-pointer mt-1 ml-2 w-4 text-red-700"
            />
          </div>
        </div>
        <div className="py-2 max-w-[95%] ">
          <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
        </div>
      </div>
    </>
  );
};

const Experience = () => {
  const userExpData = useSelector(
    (store) => store.resumeExperience?.experienceData
  );

  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [ExpDesc, setExpDes] = useState('');

  const [expData, setExpData] = useState(userExpData || []);

  function sumbitData(data) {
    data.description = ExpDesc;
    let currData = [...expData, data];
    setExpData(currData);

    // Dispatcher here
    dispatch(setExperienceData(currData));
    // setSuccessMsg("Data is updated.");
    setExpDes('');
    reset();
  }

  function deleteExpData(expID) {
    let currData = [...expData];
    currData.splice(expID, 1);
    setExpData(currData);
    dispatch(setExperienceData(currData));
  }

  return (
    <div>
      <div className="p-6 w-[100%]  md:w-auto md:max-w-[500px] h-[100%]  xl:h-[65%]  border-[#9333ea] border-2 shadow-[#9333ea] shadow-md">
        <h2 className="text-2xl font-semibold  inline-block  border-b-4  pb-[5px] border-b-[#9333ea] ">
          Add Experience.
        </h2>

        <form
          className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6"
          onSubmit={handleSubmit(sumbitData)}
        >
          <div className="sm:col-span-3">
            <div className="flex flex-col">
              <label>Job Title</label>
              <input
                className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm  "
                placeholder="Job Title"
                autoComplete="off"
                type="text"
                {...register('Job_Title', {
                  required: 'Required!',
                })}
              ></input>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label>Company Name</label>
            <input
              className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%]"
              placeholder="Company Name"
              autoComplete="off"
              type="text"
              {...register('Company_Name', {
                required: 'Required!',
              })}
            ></input>
          </div>

          {/* 2 */}
          <div className="sm:col-span-3">
            <div className="flex flex-col">
              <label>Start Date</label>
              <input
                type="month"
                name="WorkstartDate"
                id="start-date"
                {...register('WrkStartDate')}
                autoComplete="off"
                className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-auto"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <div className="flex flex-col">
              <label>End Date</label>
              <input
                type="month"
                name="WorkendDate"
                id="end-date"
                {...register('WrkEndDate')}
                autoComplete="off"
                className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-auto"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <ReactQuill
              value={ExpDesc}
              onChange={(e) => {
                setExpDes(e);
              }}
              className="border my-5  bg-slate-100 border-purple-400"
            />
          </div>
          <button
            type={'submit'}
            className=" bg-indigo-700 text-white py-2 px-3 rounded-md flex flex-row justify-center cursor-pointer "
          >
            Save
          </button>
        </form>
      </div>
      {expData && expData.length > 0 ? (
        <div className="p-4 border border-gray-300 overflow-scroll h-auto w-[350px]  md:w-auto  md:max-w-[500px] max-w-[590px]">
          {expData.map((e, index) => {
            return (
              <ExperienceTab
                key={index}
                idRef={index}
                jobRole={e.Job_Title}
                companyName={e.Company_Name}
                startDate={e.WrkStartDate}
                endDate={e.WrkEndDate}
                expDescription={e.description}
                deleteExpData={deleteExpData}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Experience;
