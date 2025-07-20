import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEducationData,
  deleteEducationData,
  selectEducationData,
} from '../../../../../Reducers/ResumeBuilderFormDataSlice.js';
import { MdDelete } from 'react-icons/md';

export const EducationTab = ({
  idRef,
  schoolName,
  schoolLocation,
  startDate,
  endDate,
  degree,
  fieldOfStudy,
  description,
  deleteEduData,
}) => {
  return (
    <div className="rounded-lg border border-gray-400 w-[95%] my-2 px-4 py-4">
      <div className="flex flex-row justify-between">
        <h3 className="text-md font-semibold">
          {degree} in {fieldOfStudy} at{' '}
          <span className="text-gray-600">
            {schoolName} ({schoolLocation})
          </span>
        </h3>
        <div className="flex flex-row justify-center">
          <h3 className="text-md text-cyan-600">
            From {startDate} to {endDate}
          </h3>
          <MdDelete
            onClick={() => deleteEduData(idRef)}
            className="cursor-pointer mt-1 ml-2 w-4 text-red-700 flex-shrink-0"
          />
        </div>
      </div>
      <div className="py-2 max-w-[95%]">
        <p>{description}</p>
      </div>
    </div>
  );
};

const Education = () => {
  const { register, handleSubmit, reset } = useForm();
  const [successMsg, setSuccessMsg] = useState('');
  const dispatch = useDispatch();
  const userEduData = useSelector(selectEducationData);

  const [eduData, setEduData] = useState([]);
  useEffect(() => {
    if (userEduData) {
      setEduData(userEduData);
    }
  }, [userEduData]);

  const sumbitData = (data) => {
    let currData = [...eduData, data];
    setEduData(currData);

    dispatch(setEducationData(currData));
    setSuccessMsg('Data is updated.');
    reset();
  };

  const deleteEduData = (eduID) => {
    let currData = eduData.filter((_, index) => index !== eduID);
    setEduData(currData);
    dispatch(deleteEducationData(eduID));
  };

  return (
    <div>
      <div className="p-6  w-[100%] md:w-auto md:max-w-[500px] h-[100%] xl:h-[65%] border-[#9333ea] border-2 shadow-[#9333ea] shadow-md">
        <h2 className="text-2xl font-semibold inline-block border-b-4 pb-[5px] border-b-[#9333ea]">
          Add Education
        </h2>
        <p className="text-xs text-gray-500 w-[85%]">
          Add your most relevant education, including programs you're currently
          enrolled in.
        </p>
        <form
          className="flex flex-col md:flex-col"
          onSubmit={handleSubmit(sumbitData)}
        >
          <div className="flex flex-col md:flex-row justify-between w-[100%]">
            <div className="w-[100%] md:w-[45%]">
              <label>School Name</label>
              <input
                type="text"
                name="schoolName"
                placeholder="School Name"
                id="school-name"
                {...register('schoolName')}
                autoComplete="off"
                className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%]"
              />
            </div>
            <div className="w-[100%] md:w-[45%]">
              <label>School Location</label>
              <input
                type="text"
                name="schoolLocation"
                placeholder="School Location"
                id="school-location"
                autoComplete="off"
                {...register('schoolLocation')}
                className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%]"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between w-[100%]">
            <div className="w-[100%] md:w-[45%]">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                id="start-date"
                {...register('startDate')}
                autoComplete="off"
                className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%]"
              />
            </div>
            <div className="w-[100%] md:w-[45%]">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                id="end-date"
                {...register('endDate')}
                autoComplete="off"
                className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%]"
              />
              <div className="mt-1 text-xs text-slate-500 flex items-center gap-1">
                <label>I am currently studying here</label>
                <input
                  type="checkbox"
                  name="currentEmployed"
                  id="currentEmployed"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between w-[100%]">
            <div className="flex flex-col w-[100%] md:w-[45%]">
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                id="degree"
                autoComplete="off"
                {...register('degree')}
                className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%] "
              />
            </div>
            <div className="w-[100%] md:w-[45%]">
              <label>Field of Study</label>
              <input
                type="text"
                name="fieldOfStudy"
                id="fieldOfStudy"
                placeholder="Field of Study"
                {...register('fieldOfStudy')}
                autoComplete="off"
                className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%] "
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Description</label>
            <textarea
              id="message"
              rows="4"
              name="description"
              {...register('description')}
              className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%] "
              placeholder="e.g. Supported mentor teacher throughout lessons by preparing…"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded"
          >
            Save
          </button>
        </form>
      </div>
      {eduData && eduData.length > 0 ? (
        <div className="p-4 border border-gray-300 overflow-scroll h-auto w-[350px] md:w-auto md:max-w-[500px]">
          {eduData.map((e, index) => {
            return (
              <EducationTab
                key={index}
                idRef={index}
                schoolName={e.schoolName}
                schoolLocation={e.schoolLocation}
                startDate={e.startDate}
                endDate={e.endDate}
                degree={e.degree}
                fieldOfStudy={e.fieldOfStudy}
                description={e.description}
                deleteEduData={deleteEduData}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Education;
