import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TbPasswordUser } from 'react-icons/tb';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { handleResetPasswordApi } from '@/services/Operations/AuthenticationOperation/AuthenticationApi';

const NewPassword = ({ token }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!token) {
      toast.error('Token is missing! Please verify OTP again.');
      return;
    }

    try {
      const result = await handleResetPasswordApi(token, data.password);

      if (result?.data?.success) {
        toast.success('Password changed successfully!');
        navigate('/sign-in');
      } else {
        toast.error(result?.data?.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to reset password.');
      console.error(error);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col gap-6">
      <div className="flex justify-center">
        <div className="rounded-md border p-2 border-black text-xl">
          <TbPasswordUser height={48} width={48} />
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-semibold text-center">Set New Password</h1>
        <p className="text-center text-lg">
          Must be 8 characters long and alphanumeric.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-1 gap-3 mb-2">
            {/* Password Input */}
            <div>
              <label className="block font-medium mb-2">Password</label>
              <div className="relative w-full">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                      message:
                        'Must be 8+ chars, 1 uppercase, 1 number, 1 special char',
                    },
                  })}
                  type={hidePassword ? 'password' : 'text'}
                  className="w-full py-2 pl-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Create Password"
                />
                <button
                  type="button"
                  onClick={() => setHidePassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  {hidePassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block font-medium mb-2">Confirm Password</label>
              <div className="relative w-full">
                <input
                  {...register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: (value) =>
                      value === watch('password') || 'Passwords do not match',
                  })}
                  type={hideConfirmPassword ? 'password' : 'text'}
                  className="w-full py-2 pl-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Re-enter Password"
                />
                <button
                  type="button"
                  onClick={() => setHideConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  {hideConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
