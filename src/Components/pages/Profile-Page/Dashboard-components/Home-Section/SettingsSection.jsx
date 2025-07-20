import React, { useEffect, useState } from 'react'
import { LiaToggleOnSolid, LiaToggleOffSolid } from 'react-icons/lia'
import { useSelector, useDispatch } from 'react-redux'
import { toggleEmailVisibility, togglePhoneVisibility } from '@/services/Operations/DashboardOperation/SettingsHandler'

const SettingsSection = () => {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [isEmailPublic, setIsEmailPublic] = useState(currentUser.showEmail === 1)
  const [isPhoneNoPublic, setIsPhoneNoPublic] = useState(currentUser.showPhoneNumber === 1)

  useEffect(() => {
    setIsEmailPublic(currentUser.showEmail === 1);
    setIsPhoneNoPublic(currentUser.showPhoneNumber === 1);
  }, [currentUser]);

  const SettingsData = [
    {
      id: 1,
      label: 'Email Visibility',
      isPublic: isEmailPublic,
      toggle: () => toggleEmailVisibility(currentUser, dispatch, setIsEmailPublic),
    },
    {
      id: 2,
      label: 'Phone Visibility',
      isPublic: isPhoneNoPublic,
      toggle: () => togglePhoneVisibility(currentUser, dispatch, setIsPhoneNoPublic),
    },
  ];

  return (
    <div className="flex flex-col justify-center bg-white border-[0.5px] border-[#680AFF] w-full shadow rounded-lg p-4">
      <h1 className="text-h4 mb-4">Hot Settings</h1>
      {SettingsData.map((item) => (
        <div
          key={item.id}
          className="flex flex-row items-center justify-between border-b border-gray-300 py-2"
        >
          <h1 className='text-[#686769] font-semibold text-h5'>{item.label}</h1>
          <button onClick={item.toggle} className='cursor-pointer'>
            {item.isPublic ? (
              <LiaToggleOnSolid size={35} color="#680AFF" />
            ) : (
              <LiaToggleOffSolid size={35} color="#A9A9A9" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SettingsSection;
