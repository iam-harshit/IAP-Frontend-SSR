import React from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const BankAccountCardDetails = ({ handleEditAccountBankDetails }) => {
  const handleEditBankAccountDetails = () => {
    handleEditAccountBankDetails();
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Primary Account</h3>
        <div className="flex items-center gap-3">
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <AiOutlineEye className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={handleEditBankAccountDetails}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <AiOutlineEdit className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <AiOutlineDelete className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Bank Name */}
      <p className="text-gray-600 mb-6">HDFC Bank</p>

      {/* Account Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Account Number</p>
          <p className="text-gray-900 font-medium">XXXX XXXX 1234</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">IFSC Code</p>
          <p className="text-gray-900 font-medium">HDFC0001234</p>
        </div>
      </div>
    </div>
  );
};

export default BankAccountCardDetails;
