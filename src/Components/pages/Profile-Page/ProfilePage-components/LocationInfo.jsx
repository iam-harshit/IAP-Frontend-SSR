import React from 'react';
import Modal from '@/Components/common/Modal';

const LocationInfo = ({ location, isCurrentUser, openModal, isOpen, closeModal, userData }) => (
  (location.city || location.state || location.country) && (
    <div className="flex flex-col md:flex-wrap items-start md:items-start mt-1">
      <div className="flex items-start">
        <p className="text-gray-400 text-h6">
          {`${location.city ? location.city + ', ' : ''}${location.state ? location.state + ', ' : ''}${location.country ? location.country : ''}`}
          {isCurrentUser && (
            <span
              className="text-blue-500 text-h5 hover:cursor-pointer pl-2"
              onClick={openModal}
            >
              Contact info
            </span>
          )}
        </p>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            type="profile"
            data={userData}
          />
        )}
      </div>
    </div>
  )
);

export default LocationInfo;