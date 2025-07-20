import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill.css';
// Above css is for Rich Text editor component.
import DOMPurify from 'dompurify';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUserData } from '../../../../../../Reducers/ResumeBuilderFormDataSlice.js';
import { selectUserData } from '../../../../../../Reducers/ResumeBuilderFormDataSlice.js';
import { nanoid } from 'nanoid';

export const ProjectsTab = ({
  Heading,
  Link,
  Description,
  idRef,
  HandleDeleteItem,
}) => {
  const sanitizedHtml = DOMPurify.sanitize(Description);

  return (
    <>
      {/* <div className="border border-gray-200 p-4 my-4"> */}

      <div className="rounded-lg border border-gray-400 w-[95%]  my-2 px-4 py-4">
        <div className="flex flex-row justify-between">
          <h3 className="text-2xl">{Heading}</h3>
          <div className="flex flex-row justify-center ">
            <h3 className="text-md text-cyan-600 cursor-pointer"> {Link}</h3>
            <MdDelete
              onClick={() => HandleDeleteItem(idRef)}
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

const ProjectsForm = () => {
  const projectData = useSelector(
    (store) => store.resumeFormData?.userData?.projects
  );
  const dispatch = useDispatch();
  const userInputData = useSelector(selectUserData);

  const [submittedData, setSubmittedData] = useState(projectData || []);
  const [description, setDescription] = useState('');

  const { register, handleSubmit, reset } = useForm();
  function DesHandler(value) {
    setDescription(value);
  }

  function onSubmit(data) {
    data.description = description;
    data.id = nanoid();
    const prevData = [...submittedData, data];
    setSubmittedData(prevData);

    const updatedData = {
      ...userInputData,
      projects: prevData,
    };
    // console.log(updatedData);
    dispatch(setUserData(updatedData));
    reset();
    setDescription('');
  }

  function HandleDeleteItem(idValue) {
    let tempData = [...submittedData];
    tempData.splice(idValue, 1);
    setSubmittedData(tempData);
    let storedTempData = [...userInputData.projects];
    storedTempData.splice(idValue, 1);
    const updatedData = {
      ...userInputData,
      projects: storedTempData,
    };
    dispatch(setUserData(updatedData));
  }

  return (
    <div>
      {/* Form Section */}
      <div className="px-1  mx-auto md:p-4 md:pt-1 md:w-auto max-w-[440px] md:max-w-[500px] h-[100%] xl:h-[65%]">
        <h2 className="text-2xl font-semibold mb-3"> Add Projects.</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Project Heading</label>
          <input
            placeholder="Project Name"
            className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-full"
            type="text"
            name="Project_Name"
            {...register('Heading', {
              required: 'Enter Project Name!!',
              pattern: {
                message: 'Heading..',
              },
            })}
          ></input>
          <label>Project Link</label>
          <input
            className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-full"
            type="text"
            name="link"
            {...register('Link')}
          ></input>

          <label>Project Description</label>

          {/* Some styles for below Quill Editor are imported from quill.css file. */}

          <ReactQuill
            value={description}
            onChange={DesHandler}
            className="border my-3  bg-slate-100 border-purple-400"
          />

          <button
            type="submit"
            className=" bg-indigo-700 text-white py-2 px-3 rounded-md flex flex-row justify-center cursor-pointer "
          >
            Submit
          </button>
        </form>
      </div>
      {/* Results Section */}
      <div className="mx-auto   md:w-auto  md:max-w-[500px] h-[100%] xl:h-[65%] ">
        {submittedData.map((e, index) => {
          return (
            <ProjectsTab
              key={e.id}
              idRef={index}
              Heading={e.Heading}
              HandleDeleteItem={HandleDeleteItem}
              Link={e.Link}
              Description={e.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsForm;
