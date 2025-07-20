import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import {
  handleAddBankDetails,
  handleGetBankDetails,
  handleUpdateBankDetails,
} from '@/services/Operations/PricingOfferingOperation/PricingOfferingApi';
import toast from 'react-hot-toast';

const BankAccountDetails = ({ bankDetails, setBankDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [errors, setErrors] = useState({
    accountHolderName: null,
    accountNumber: null,
    ifsc: null,
    upiId: null,
  });

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    toast.dismiss();
    if (!isEditing) {
      toast.success('You can now edit details');
    } else {
      toast.error('Editing disabled');
      setHidePassword(true);
    }
  };

  const updateDetails = async () => {
    let res;

    const isCorrect = validateData();
    if (!isCorrect) {
      return;
    }
    if (isNew) {
      res = await handleAddBankDetails(bankDetails);
    } else {
      res = await handleUpdateBankDetails(bankDetails);
    }
    setIsEditing(false);
    toast.dismiss();
    if (!res.success) {
      toast.error(res?.errors[0]?.message || 'Invalid data');
    } else {
      toast.success(res.message);
    }
  };

  const validateData = () => {
    const accountNumberRegex = /^\d{9,18}$/;
    const ifscCodeRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const upiRegex = /^$|^[\w.-]+@[\w.-]+$/;

    const newError = {};

    let isCorrect = true;

    if (!bankDetails.accountHolderName) {
      newError.accountHolderName = 'Account holder name is required';
      isCorrect = false;
    } else if (bankDetails.accountHolderName?.length < 3) {
      newError.accountHolderName =
        'Account holder name must be at least 3 characters long';
      isCorrect = false;
    } else {
      newError.accountHolderName = null;
    }

    if (!accountNumberRegex.test(bankDetails.accountNumber)) {
      newError.accountNumber = 'Account number must be between 9-18 digits';
      isCorrect = false;
    } else {
      newError.accountNumber = null;
    }

    if (bankDetails?.ifsc === '') {
      newError.ifsc = 'ifsc code is required';
      isCorrect = false;
    } else if (!ifscCodeRegex.test(bankDetails.ifsc)) {
      newError.ifsc = 'Invalid ifsc code';
      isCorrect = false;
    } else {
      newError.ifsc = null;
    }

    if (!upiRegex.test(bankDetails.upiId)) {
      newError.upiId = 'Invalid upi id';
      isCorrect = false;
    } else {
      newError.upiId = null;
    }

    setErrors((prev) => ({ ...prev, ...newError }));

    return isCorrect;
  };

  useEffect(() => {
    getbankData();
  }, []);

  const getbankData = async () => {
    const res = await handleGetBankDetails();

    setBankDetails({
      accountHolderName: res.accountHolderName,
      accountNumber: res.accountNumber,
      ifsc: res.ifsc,
      upiId: res.upiId,
    });

    if (
      !(
        res.hasOwnProperty('accountHolderName') && res?.accountHolderName !== ''
      ) ||
      !(res.hasOwnProperty('accountNumber') && res?.accountNumber !== '') ||
      !(res.hasOwnProperty('ifsc') && res?.ifsc !== '')
    ) {
      setIsNew(true);
    }
  };

  return (
    <div className="container mx-auto p-2 sm:!p-4">
      <div className="w-full h-auto p-2 sm:p-4 border shadow rounded-xl">
        <div className="flex justify-between flex-col gap-2 md:flex-row sm:px-4">
          <div className="flex flex-col xs:flex-row xs:items-end">
            <p className="text-2xl font-semibold text-[#6F00FF]">
              Account Details
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="text-md items-center bg-[#6F00FF] text-white py-1 px-2 rounded-lg h-auto cursor-pointer flex gap-2"
              onClick={() => setHidePassword(!hidePassword)}
            >
              <p className="flex items-center">
                {hidePassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
              </p>
              <p>View details</p>
            </button>
            <button
              className="flex items-center gap-2 py-1 px-2 text-lg cursor-pointer border-2 border-black rounded-lg bg-gray-200"
              onClick={() => toggleEditing()}
            >
              <FaEdit size={20} /> <p>Edit</p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-w-[1300px] mx-auto gap-4 p-4">
          <div className="rounded">
            <div className="text-base font-medium mb-1 tracking-tighter flex gap-1">
              Account holder name
              <p className="text-xs text-red-500">*</p>
            </div>
            <div className="relative w-full">
              <input
                type={'text'}
                className={`w-full py-2 pl-2 pr-10 relative border rounded ${!isEditing && 'bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Enter name"
                value={bankDetails.accountHolderName}
                onChange={(e) => {
                  if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                    setBankDetails({
                      ...bankDetails,
                      accountHolderName: e.target.value,
                    });
                  } else {
                    toast.dismiss();
                    toast.error('Only characters allowed');
                  }
                }}
                disabled={isEditing ? false : true}
              />
            </div>
            {errors.accountHolderName && (
              <p className="text-red-500 text-sm">{errors.accountHolderName}</p>
            )}
          </div>
          <div className="rounded">
            <div className="text-base font-medium mb-1 tracking-tighter flex gap-1">
              Account number
              <p className="text-xs text-red-500">*</p>
            </div>
            <div className="relative w-full">
              <input
                type={hidePassword ? 'password' : 'text'}
                className={`w-full py-2 pl-2 pr-10 relative border rounded focus:outline-none ${!isEditing && 'bg-gray-200'} focus:ring-2 focus:ring-purple-500`}
                placeholder="Enter account number"
                value={bankDetails.accountNumber}
                onChange={(e) =>
                  setBankDetails({
                    ...bankDetails,
                    accountNumber: e.target.value,
                  })
                }
                disabled={isEditing ? false : true}
              />
            </div>
            {errors.accountNumber && (
              <p className="text-red-500 text-sm">{errors.accountNumber}</p>
            )}
          </div>
          <div className="rounded">
            <div className="text-base font-medium mb-1 tracking-tighter flex gap-1">
              IFSC code
              <p className="text-xs text-red-500">*</p>
            </div>
            <div className="relative w-full">
              <input
                type={hidePassword ? 'password' : 'text'}
                className={`w-full py-2 pl-2 pr-10 relative border rounded ${!isEditing && 'bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Enter IFSC code"
                value={bankDetails.ifsc}
                onChange={(e) =>
                  setBankDetails({
                    ...bankDetails,
                    ifsc: e.target.value,
                  })
                }
                disabled={isEditing ? false : true}
              />
            </div>
            {errors.ifsc && (
              <p className="text-red-500 text-sm">{errors.ifsc}</p>
            )}
          </div>
          <div className="rounded">
            <div className="text-base font-medium mb-1 tracking-tighter">
              UPI ID
            </div>
            <div className="relative w-full">
              <input
                type={hidePassword ? 'password' : 'text'}
                className={`w-full py-2 pl-2 pr-10 relative border rounded ${!isEditing && 'bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Enter UPI ID"
                onChange={(e) =>
                  setBankDetails({
                    ...bankDetails,
                    upiId: e.target.value,
                  })
                }
                value={bankDetails.upiId}
                disabled={isEditing ? false : true}
              />
            </div>
            {errors.upiId && (
              <p className="text-red-500 text-sm">{errors.upiId}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <button
              onClick={() => updateDetails()}
              className="px-6 py-2 bg-[#6F00FF] text-white font-semibold rounded-lg"
            >
              Update Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankAccountDetails;
