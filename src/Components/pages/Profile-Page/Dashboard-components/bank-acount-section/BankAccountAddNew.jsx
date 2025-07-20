import React, { useState, useEffect } from 'react';
import { validateBankForm } from './../../../../../../utils/validateBankDetails';

const BankAccountAddNew = ({ isOpen, onClose, title }) => {
  const [formData, setFormData] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: '',
    accountLabel: '',
  });

  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      // Delay content animation to create a nice staggered effect
      setTimeout(() => setShowContent(true), 200);
    } else {
      setIsClosing(true);
      setShowContent(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();

    const validationErrors = validateBankForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form is valid', formData);

      // Here you would typically make your API call
      alert('Account saved successfully!');

      // Reset form
      setFormData({
        accountHolderName: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        upiId: '',
        accountLabel: '',
      });
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  const handleCancel = () => {
    // Reset form data and errors
    setFormData({
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      upiId: '',
      accountLabel: '',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black p-4 transition-all duration-600 ease-in-out ${
        isClosing
          ? 'bg-opacity-0 backdrop-blur-none '
          : 'bg-opacity-25 backdrop-blur-sm'
      }`}
      onClick={handleCancel}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl p-4 sm:p-6 max-h-[90vh] transition-all duration-600 ease-out transform ${
          isClosing
            ? 'transition-all duration-500 delay-200 ease-in-out transform scale-75 opacity-0 translate-y-16 '
            : showContent
              ? 'scale-100 opacity-100 rotate-0 translate-y-0'
              : 'scale-90 opacity-0 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2
            className={`text-xl sm:text-2xl font-bold text-gray-900 transition-all duration-700 ease-out transform ${
              isClosing
                ? 'opacity-0 -translate-x-8'
                : showContent
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
            }`}
          >
            {title}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-red-500 text-xl sm:text-2xl ml-2 sm:ml-4 flex-shrink-0 transition-all duration-300 hover:rotate-180 hover:scale-125 hover:bg-red-50 rounded-full w-10 h-10 flex items-center justify-center"
          >
            &times;
          </button>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Account Holder Name */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                isClosing
                  ? 'opacity-0 translate-y-8 scale-95'
                  : showContent
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-90'
              }`}
              style={{ transitionDelay: showContent ? '0.1s' : '0s' }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-1000 hover:text-purple-600">
                Account Holder Name{' '}
                <span className="text-red-500 animate-pulse">*</span>
              </label>
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleInputChange}
                placeholder="Enter account holder name"
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 hover:border-purple-300 transition-all duration-300 text-sm sm:text-base transform hover:scale-105 focus:scale-105 hover:shadow-lg hover:animate-pulse ${
                  errors.accountHolderName
                    ? 'border-red-500 bg-red-50 animate-bounce'
                    : 'border-gray-300 hover:bg-purple-50'
                }`}
              />
              {errors.accountHolderName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 animate-pulse">
                  {errors.accountHolderName}
                </p>
              )}
            </div>

            {/* Bank Name */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                isClosing
                  ? 'opacity-0 translate-y-8 scale-95'
                  : showContent
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-90'
              }`}
              style={{ transitionDelay: showContent ? '0.2s' : '0s' }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-1000 hover:text-purple-600">
                Bank Name <span className="text-red-500 animate-pulse">*</span>
              </label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                placeholder="Enter bank name"
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 hover:border-purple-300 transition-all duration-300 text-sm sm:text-base transform hover:scale-105 focus:scale-105 hover:shadow-lg hover:animate-pulse ${
                  errors.bankName
                    ? 'border-red-500 bg-red-50 animate-bounce'
                    : 'border-gray-300 hover:bg-purple-50'
                }`}
              />
              {errors.bankName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 animate-pulse">
                  {errors.bankName}
                </p>
              )}
            </div>

            {/* Account Number */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                isClosing
                  ? 'opacity-0 translate-y-8 scale-95'
                  : showContent
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-90'
              }`}
              style={{ transitionDelay: showContent ? '0.3s' : '0s' }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-1000 hover:text-purple-600">
                Account Number{' '}
                <span className="text-red-500 animate-pulse">*</span>
              </label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                placeholder="Enter account number"
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 hover:border-purple-300 transition-all duration-300 text-sm sm:text-base transform hover:scale-105 focus:scale-105 hover:shadow-lg hover:animate-pulse ${
                  errors.accountNumber
                    ? 'border-red-500 bg-red-50 animate-bounce'
                    : 'border-gray-300 hover:bg-purple-50'
                }`}
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 animate-pulse">
                  {errors.accountNumber}
                </p>
              )}
            </div>

            {/* IFSC Code */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                isClosing
                  ? 'opacity-0 translate-y-8 scale-95'
                  : showContent
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-90'
              }`}
              style={{ transitionDelay: showContent ? '0.4s' : '0s' }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-1000 hover:text-purple-600">
                IFSC Code <span className="text-red-500 animate-pulse">*</span>
              </label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                placeholder="Enter IFSC code (e.g., SBIN0001234)"
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 hover:border-purple-300 transition-all duration-300 text-sm sm:text-base transform hover:scale-105 focus:scale-105 hover:shadow-lg hover:animate-pulse ${
                  errors.ifscCode
                    ? 'border-red-500 bg-red-50 animate-bounce'
                    : 'border-gray-300 hover:bg-purple-50'
                }`}
              />
              {errors.ifscCode && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 animate-pulse">
                  {errors.ifscCode}
                </p>
              )}
            </div>

            {/* UPI ID */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                isClosing
                  ? 'opacity-0 translate-y-8 scale-95'
                  : showContent
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-90'
              }`}
              style={{ transitionDelay: showContent ? '0.5s' : '0s' }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-1000 hover:text-purple-600">
                UPI ID
              </label>
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleInputChange}
                placeholder="Enter UPI ID (e.g., user@paytm)"
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 hover:border-purple-300 transition-all duration-300 text-sm sm:text-base transform hover:scale-105 focus:scale-105 hover:shadow-lg hover:animate-pulse ${
                  errors.upiId
                    ? 'border-red-500 bg-red-50 animate-bounce'
                    : 'border-gray-300 hover:bg-purple-50'
                }`}
              />
              {errors.upiId && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 animate-pulse">
                  {errors.upiId}
                </p>
              )}
            </div>

            {/* Account Label */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                isClosing
                  ? 'opacity-0 translate-y-8 scale-95'
                  : showContent
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-90'
              }`}
              style={{ transitionDelay: showContent ? '0.6s' : '0s' }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-1000 hover:text-purple-600">
                Account Label
              </label>
              <input
                type="text"
                name="accountLabel"
                value={formData.accountLabel}
                onChange={handleInputChange}
                placeholder="e.g. Primary Account, Workshop Payments"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 hover:border-purple-300 transition-all duration-300 text-sm sm:text-base transform hover:scale-105 focus:scale-105 hover:shadow-lg hover:bg-purple-50 hover:animate-pulse"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 transition-all duration-700 ease-out transform ${
              isClosing
                ? 'opacity-0 translate-y-8 scale-95'
                : showContent
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-90'
            }`}
            style={{ transitionDelay: showContent ? '0.7s' : '0s' }}
          >
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-300 text-sm sm:text-base order-2 sm:order-1 transform hover:scale-110 active:scale-95 hover:shadow-lg hover:rotate-1"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAccount}
              className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-xl transition-all duration-300 text-sm sm:text-base order-1 sm:order-2 transform hover:scale-110 active:scale-95 hover:shadow-xl hover:-rotate-1 animate-pulse"
            >
              Save Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccountAddNew;
