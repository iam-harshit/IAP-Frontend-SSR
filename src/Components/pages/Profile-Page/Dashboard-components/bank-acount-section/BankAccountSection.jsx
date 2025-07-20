import React, { useState } from 'react';
import FormHeader from '@/Components/pages/Profile-Page/Form-components/common/FormHeader';
import BankAccountCardDetails from './BankAccountCardDetails';
import BankAccountAddNew from './BankAccountAddNew';

function BankAccountSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleAddNewAccount = () => {
    setIsModalOpen(true);
    setModalTitle('Add New Account');
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleEditAccountBankDetails = () => {
    setIsModalOpen(true);
    setModalTitle('Edit Account Details');
  };
  return (
    <>
      <div className="flex justify-between items-center ">
        <FormHeader
          title={'Bank Account Details'}
          currentPath={'bank-details'}
          step={3}
          desc={'Provide your bank account details.'}
        />
        <button
          onClick={handleAddNewAccount}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 sm:px-6 rounded-lg flex items-center gap-2 transition-colors duration-200 h-[60%] text-sm sm:text-base"
        >
          <span className="text-base sm:text-lg">+</span>
          <span className="hidden xs:inline sm:inline">Add Account</span>
          <span className="xs:hidden sm:hidden">Add A/C</span>
        </button>
      </div>
      {/* main code  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 ">
        <BankAccountCardDetails
          handleEditAccountBankDetails={handleEditAccountBankDetails}
        />
        <BankAccountCardDetails
          handleEditAccountBankDetails={handleEditAccountBankDetails}
        />
      </div>
      <BankAccountAddNew
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
      />
    </>
  );
}

export default BankAccountSection;
