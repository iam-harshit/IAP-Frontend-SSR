import { useState, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill.css';
import DOMPurify from 'dompurify';
import { MdDelete } from 'react-icons/md';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUserData } from '../../../../../../Reducers/ResumeBuilderFormDataSlice.js';
import { selectUserData } from '../../../../../../Reducers/ResumeBuilderFormDataSlice.js';

const CustomFormTab = ({ data, DeletCustomTab, idForCustom }) => {
  const description = data.description;
  const SantizedHtml = DOMPurify.sanitize(description);

  return (
    <div className="rounded-lg border border-gray-400 w-[95%]  my-2 px-2 md:px-4 py-4">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl">{data.Custom_Heading}</h2>
        <MdDelete
          onClick={() => DeletCustomTab(idForCustom)}
          className=" cursor-pointer mt-1 ml-2 w-4 text-red-700"
        />
      </div>
      <div className="py-2">
        <div dangerouslySetInnerHTML={{ __html: SantizedHtml }}></div>
      </div>
    </div>
  );
};

const CustomForm = () => {
  const customData = useSelector(
    (store) => store.resumeFormData?.userData?.customData
  );
  const quill = useRef();
  const dispatch = useDispatch();
  const userInputData = useSelector(selectUserData);

  const [submittedData, setSubmitted] = useState(customData || []);
  const [customDescription, setCustomDes] = useState('');
  const { reset, register, handleSubmit } = useForm();

  function SubmitHandler(data) {
    data.description = customDescription;
    data.id = nanoid();
    const listData = [...submittedData, data];
    setSubmitted(listData);
    const updatedData = {
      ...userInputData,
      customData: listData,
    };
    dispatch(setUserData(updatedData));
    reset();
    setCustomDes('');
  }
  function DeletCustomTab(cust_id) {
    const TempCustomData = [...submittedData];
    TempCustomData.splice(cust_id, 1);
    setSubmitted(TempCustomData);
    const storedData = [...userInputData.customData];
    storedData.splice(cust_id, 1);
    const updatedData = {
      ...userInputData,
      customData: storedData,
    };
    dispatch(setUserData(updatedData));
  }

  return (
    <div className="px-1 md:p-4 md:w-auto max-w-[440px] md:max-w-[500px] h-[100%] xl:h-[65%]  m-0 ">
      {/* Input Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Custom Section</h2>
        <form onSubmit={handleSubmit(SubmitHandler)}>
          <label className="">Custom Heading</label>
          <input
            placeholder="Add Heading."
            className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-full"
            type="text"
            name="Content"
            {...register('Custom_Heading', {
              required: ' Heading Required! ',
              pattern: {
                message: 'Custom Heading',
              },
            })}
          ></input>

          <label>Add Description.</label>
          <ReactQuill
            ref={(el) => (quill.current = el)}
            className="border my-3  bg-slate-100 border-purple-400"
            value={customDescription}
            onChange={(content) => {
              setCustomDes(content);
            }}
          />
          <button
            type="submit"
            className=" bg-indigo-700 text-white py-2 px-3 rounded-md flex flex-row justify-center cursor-pointer "
          >
            Submit
          </button>
        </form>
      </div>
      {/* Output section */}
      <div className=" md:w-auto max-w-[500px]  ">
        {submittedData.map((e, index) => {
          return (
            <CustomFormTab
              key={index}
              data={e}
              idForCustom={index}
              DeletCustomTab={DeletCustomTab}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CustomForm;
