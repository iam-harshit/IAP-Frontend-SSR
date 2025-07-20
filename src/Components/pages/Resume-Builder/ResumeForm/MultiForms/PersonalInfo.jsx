import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUserData,
  selectUserData,
} from '../../../../../Reducers/ResumeBuilderFormDataSlice.js';

export default function PersonaIInfo() {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [successMsg, setSuccessMsg] = useState('');

  // useEffect(() => {
  //   if (userData) {
  //     Object.keys(userData).forEach((key) => {
  //       setValue(key, userData[key])
  //     })
  //   }
  // }, [userData, setValue])

  function sumbitData(data) {
    dispatch(setUserData(data));
    setSuccessMsg('Data is updated.');
    reset();
  }

  return (
    // <div className="p-6 mt-[20px] w-[90%]  h-[100%]  lg:w-[100%] xl:h-[65%] xl:w-[100%] border-[#9333ea] border-2 shadow-[#9333ea] shadow-md">
    <div className="p-6 mt-[20px] w-[100%]  md:w-auto md:max-w-[500px] h-[100%] xl:h-[65%]  border-[#9333ea] m-0 border-2 shadow-[#9333ea] shadow-md">
      {successMsg && (
        <p className=" absolute right-10 top-8 font-bold p-0 bg-green-600 px-3 py-0.5 rounded-tr-xl rounded-bl-xl inline-block text-white text-sm">
          {successMsg}
        </p>
      )}
      <h2 className="text-xl md:text-2xl md:w-[230px] font-semibold leading-7 text-gray-900 border-b-4 border-[#9333ea] pb-[5px]  w-[200px] ">
        Personal Information
      </h2>
      <p className="my-1.5 text-base leading-6 text-gray-500">
        Get started with the basics: your name and contact information
      </p>
      <form
        className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6"
        onSubmit={handleSubmit(sumbitData)}
      >
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-normal leading-6 text-gray-900 "
          >
            First Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              id="first-name"
              {...register('firstName', {
                required: 'enter your first name please!!',
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: 'name should contain only characters.',
                },
              })}
              autoComplete="off"
              className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%] "
            />
            {errors.firstName && (
              <p className="text-red-600 py-0 mx-0 font-sans text-sm ">
                {errors.firstName.message}
              </p>
            )}
          </div>
        </div>

        {/*  */}

        {/*  */}
        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-normal leading-6 text-gray-900"
          >
            Last name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="last-name"
              placeholder="Last Name"
              id="last-name"
              autoComplete="off"
              {...register('last-name', {
                required: 'enter your last name please!!',
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: 'name should contain only characters.',
                },
              })}
              className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%] "
            />
            {errors['last-name'] && (
              <p className="text-red-600 py-0 mx-0 font-sans text-sm ">
                {errors['last-name'].message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="email-address"
            className="block text-sm font-normal leading-6 text-gray-900"
          >
            Email Address
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email-address"
              placeholder="Email"
              id="email-address"
              {...register('email-address', {
                required: 'email is required',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'enter the vaild email',
                },
              })}
              autoComplete="off"
              className="border  my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%] "
            />
            {errors['email-address'] && (
              <p className="text-red-600 py-0 mx-0 font-sans text-sm ">
                {errors['email-address'].message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="address"
            className="block text-sm font-normal leading-6 text-gray-900"
          >
            Address
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="address"
              placeholder="Address"
              id="address"
              autoComplete="off"
              {...register('address')}
              className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%] "
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="city"
            className="block text-sm font-normal leading-6 text-gray-900"
          >
            City
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="city"
              placeholder="City"
              id="city"
              {...register('city')}
              autoComplete="off"
              className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%] "
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="city-code"
            className="block text-sm font-normal leading-6 text-gray-900"
          >
            City Code
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="city-code"
              placeholder="Pincode"
              id="city-code"
              {...register('city-code')}
              autoComplete="off"
              className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%] "
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="state"
            className="block text-sm font-normal leading-6 text-gray-900"
          >
            State
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="state"
              placeholder="State"
              id="state"
              {...register('state')}
              autoComplete="off"
              className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%] "
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="country"
            className="block text-sm font-normal leading-6 text-gray-900"
          >
            Country
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="country"
              placeholder="Country"
              id="country"
              {...register('country')}
              autoComplete="off"
              className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%] "
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-normal text-gray-900 "
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Add Profile Description"
            rows="4"
            name="description"
            {...register('description')}
            className="border my-2 bg-slate-100 p-1 border-purple-400 rounded-sm w-[100%] "
          ></textarea>
        </div>

        <div className="flex px-2">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-1 px-3   rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
