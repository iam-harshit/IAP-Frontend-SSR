import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../../../Reducers/ResumeBuilderFormDataSlice.js';
import { selectUserData } from '../../../../../Reducers/ResumeBuilderFormDataSlice.js';
import { useSelector } from 'react-redux';
function RemoveSkillTag(Id_num, array, setSkillArray, dispatch, userInputData) {
  const New_Array = [...array];
  New_Array.splice(Id_num, 1);
  setSkillArray(New_Array);
  const updatedData = {
    ...userInputData,
    skills: New_Array,
  };
  dispatch(setUserData(updatedData));
}
function AddSkillTag(
  skillArray,
  skillText,
  setSkillArray,
  addSkill,
  skillLevel,
  setSkillLevel,
  userInputData,
  dispatch
) {
  let skillAndLevel = [skillText, skillLevel];
  let newArray = [...skillArray, skillAndLevel];
  setSkillArray(newArray);
  const updatedData = {
    ...userInputData,
    skills: newArray,
  };
  dispatch(setUserData(updatedData));

  addSkill('');
  setSkillLevel('');
}

const SkillTag = ({ value, Id_num, array, setSkillArray }) => {
  const dispatch = useDispatch();
  const userInputData = useSelector(selectUserData);
  return (
    <div className="flex justify-center align-middle mr-2   ">
      <h2 className="bg-purple-500 text-white inline-block rounded-md  my-1 p-2 w-auto">
        {value}%
        <span
          className="cursor-pointer inline-block"
          onClick={() => {
            RemoveSkillTag(
              Id_num,
              array,
              setSkillArray,
              dispatch,
              userInputData
            );
          }}
        >
          <GrClose className="ml-2 text-[12px] " />
        </span>
      </h2>
    </div>
  );
};

const SkillsForm = () => {
  const skills = useSelector((store) => store.resumeFormData?.userData?.skills);
  const [skillArray, setSkillArray] = useState(skills || []);
  const [skillLevel, setSkillLevel] = useState(0);
  const [skillText, addSkill] = useState('');
  const dispatch = useDispatch();
  const userInputData = useSelector(selectUserData);

  return (
    // <div className="flex flex-col  items-center p-4 my-8 border-[#9333ea] border-2 shadow-[#9333ea] shadow-md h-auto w-[300px] md:w-[460px] lg:w-[400px]  max-w-[590px]">
    <div className="flex flex-col  w-[100%]  md:w-auto md:max-w-[480px]  items-center p-4 mb-8 border-[#9333ea] border-2 shadow-[#9333ea] shadow-md h-auto ">
      <h2 className="text-2xl font-semibold mb-3"> Add Skills & Expertise.</h2>

      <div className="flex flex-col md:flex-row md:items-center my-4 gap-4">
        <div className="skill-field flex  items-center gap-[20px]">
          <label className=" text-lg" id="skill">
            Skill
          </label>
          <input
            className="block w-[50%]  rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-400 sm:text-sm sm:leading-6"
            type="text"
            value={skillText}
            placeholder="Add Skills"
            name="skill"
            onChange={(e) => addSkill(e.target.value)}
          />
        </div>

        <div className="skill-level flex items-center gap-[10px]">
          <label className="Expertise text-lg">Expertise</label>
          <div className="skill-bar flex gap-[20px] items-center justify-center w-[130px]  h-[2px] bg-gray-300 relative z-0">
            <span
              className="point cursor-pointer skill-rating-1 bg-[rgb(82,88,100)] p-[5px] rounded-lg inline-block  hover:bg-purple-500 hover:p-[7px]"
              onClick={() => setSkillLevel('40')}
            ></span>
            <span
              className="point  cursor-pointer skill-rating-2 bg-[rgb(82,88,100)] p-[5px] rounded-lg inline-block  hover:bg-purple-500 hover:p-[7px]"
              onClick={() => setSkillLevel('50')}
            ></span>
            <span
              className="point cursor-pointer skill-rating-3 bg-[rgb(82,88,100)] p-[5px] rounded-lg inline-block  hover:bg-purple-500 hover:p-[7px]"
              onClick={() => setSkillLevel('70')}
            ></span>
            <span
              className="point  cursor-pointer skill-rating-4 bg-[rgb(82,88,100)] p-[5px] rounded-lg inline-block  hover:bg-purple-500 hover:p-[7px]"
              onClick={() => setSkillLevel('100')}
            ></span>
          </div>
        </div>
      </div>
      <button
        className="bg-purple-900 rounded-lg px-3 py-2 text-white "
        onClick={() => {
          AddSkillTag(
            skillArray,
            skillText,
            setSkillArray,
            addSkill,
            skillLevel,
            setSkillLevel,
            userInputData,
            dispatch
          );
        }}
      >
        Add Skill
      </button>
      <div className="flex flex-row flex-wrap">
        {skillArray.map((e, index) => {
          return (
            <SkillTag
              array={skillArray}
              setSkillArray={setSkillArray}
              key={index}
              Id_num={index}
              value={e}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SkillsForm;
