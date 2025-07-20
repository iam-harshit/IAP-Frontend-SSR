import React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import { setEditing, setSection } from '../../../../Reducers/userSlice'

import { PiArrowSquareRightFill } from 'react-icons/pi';
import { PiArrowSquareLeftFill } from 'react-icons/pi';
import { setEditing, setSection } from '../../../../../Reducers/userSlice';

const SectionNavigator = ({ back, next }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeSection = useCallback((newSection) => {
    dispatch(setEditing(true));
    dispatch(setSection(newSection));
    navigate(`/dashboard/${newSection}`); // Navigating to section with edit mode
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-center">
        {back ? (
          <PiArrowSquareLeftFill
            onClick={() => changeSection(back)}
            className="text-[42px] md:text-[48px] text-[#5D3FD3] bg-white-600 cursor-pointer"
          />
        ) : (
          <PiArrowSquareLeftFill className="text-[42px] md:text-[48px] text-gray-300" />
        )}
        {next ? (
          <PiArrowSquareRightFill
            onClick={() => changeSection(next)}
            className="text-[42px] md:text-[48px] text-[#5D3FD3] cursor-pointer"
          />
        ) : (
          <PiArrowSquareRightFill className="text-[42px] md:text-[48px] text-gray-300" />
        )}
      </div>
    </div>
  );
};

export default SectionNavigator;
