import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUserData } from '../../../../../../Reducers/ResumeBuilderFormDataSlice.js';
import { selectUserData } from '../../../../../../Reducers/ResumeBuilderFormDataSlice.js';
const CertificatesForm = () => {
  const certificateData = useSelector(
    (store) => store.resumeFormData?.userData?.certificates
  );

  const dispatch = useDispatch();
  const userInputData = useSelector(selectUserData);
  const { reset, register, handleSubmit } = useForm();
  const [AddedCertificates, setCertficate] = useState(certificateData || []);
  function onSubmit(data) {
    let certificateData = [...AddedCertificates, data];
    setCertficate(certificateData);
    const updatedData = {
      ...userInputData,
      certificates: certificateData,
    };
    dispatch(setUserData(updatedData));
    reset();
  }

  function handleDeleteCertificate(itemID) {
    let currList = [...AddedCertificates];
    currList.splice(itemID, 1);
    setCertficate(currList);
    const updatedData = {
      ...userInputData,
      certificates: currList,
    };
    dispatch(setUserData(updatedData));
  }

  return (
    <div>
      <div className=" md:p-4 max-w-[440px]  mx-auto md:max-w-none">
        <h2 className="font-semibold text-2xl">Add Certificates</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="my-4">
          <label>Certificate Name</label>
          <input
            placeholder="Add Certificate Name"
            type="text"
            className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-full"
            {...register('Certificate_Name', {
              required: ' Certificate Name Required!',
            })}
          ></input>
          <label>Certificate Link</label>
          <input
            placeholder="Add Certificate Link"
            type="text"
            className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-full"
            {...register('Certificate_Link')}
          ></input>
          <div className="flex flex-row gap-6">
            <div className="flex flex-col">
              <label>Institution</label>
              <input
                className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-full"
                type="text"
                {...register('Institute', {
                  required: 'Required!',
                })}
              ></input>
            </div>
            <div className="flex flex-col">
              <label>Date</label>
              <input
                type="date"
                name="startDate"
                id="start-date"
                {...register('startDate')}
                autoComplete="off"
                className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-auto"
              />
            </div>
          </div>
          <button
            type="submit"
            className=" w-full my-4 bg-indigo-700 text-white py-2 px-3 rounded-md flex flex-row justify-center cursor-pointer "
          >
            Submit
          </button>
        </form>
      </div>
      <div className="mb-4 md:w-auto max-w-[440px] md:max-w-[500px] h-[100%] xl:h-[65%]  overflow-scroll">
        {AddedCertificates.map((data, index) => {
          return (
            <div
              key={index}
              className=" p-1 my-2 border border-l-4 border-l-purple-800 px-2 "
            >
              <div className="text-xl font-semibold flex flex-row justify-between ">
                <h2> {data.Certificate_Name}</h2>{' '}
                <h3 className="text-sm text-cyan-600 cursor-pointer">
                  {data.Certificate_Link}
                </h3>
                <div className="mt-2 text-red-700 cursor-pointer">
                  <MdDelete onClick={() => handleDeleteCertificate(index)} />{' '}
                </div>
              </div>
              <div>
                {data.Institute} &middot; {data.startDate}{' '}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CertificatesForm;
