// import {useState} from 'react';
import './stepper.css';

const FormStepper = ({ Newnum, setForm }) => {
  const steps = ['Personal', 'Education', 'Experience', 'Skills', 'Additional'];
  return (
    <>
      {/* Stepper with Completion-Green */}

      {/* Without Completion-Not Green */}
      <div className="flex justify-between my-2 w-[270px] bg-blue static z-0 ">
        {steps.map?.((step, i) => (
          <div
            key={i}
            className={` step-item ${Newnum + 1 >= i + 1 && 'active-form'} `}
          >
            <div className="step cursor-pointer" onClick={() => setForm(i)}>
              {' '}
              {i + 1}{' '}
            </div>
            <p className="text-gray-500 text-[10px] "> {step} </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center align-middle m-2"></div>
    </>
  );
};

export default FormStepper;
