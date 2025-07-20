import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const EventModal = ({ open, onClose, event }) => {
  if (!open || !event) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          onClick={onClose}
        />
        {/* Modal */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="ml-auto h-full w-full max-w-2xl bg-white shadow-2xl p-8 overflow-y-auto relative"
          style={{ width: '50vw', minWidth: 350 }}
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
            onClick={onClose}
          >
            <Icon icon="lucide:x" />
          </button>
          <h2 className="text-2xl font-bold mb-4">{event.sessionTitle}</h2>
          <div className="mb-2 text-gray-600">{event.sessionDescription}</div>
          <div className="mb-2">
            <span className="font-semibold">Category:</span>{' '}
            {event.sessionCategory}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Topics:</span>{' '}
            {event.sessionTopics?.join(', ')}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Type:</span> {event.sessionType}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Date:</span> {event.startDate}{' '}
            {event.startTime} - {event.endDate} {event.endTime}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Duration:</span> {event.duration}{' '}
            min
          </div>
          <div className="mb-2">
            <span className="font-semibold">Slot Price:</span> ₹
            {event.slotPrice}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Meeting Link:</span>{' '}
            <a
              href={event.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {event.meetingLink}
            </a>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Max Capacity:</span>{' '}
            {event.maxCapacity}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Booked Mentees:</span>{' '}
            {event.bookedMentees?.length}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Created At:</span>{' '}
            {new Date(event.createdAt).toLocaleString()}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Updated At:</span>{' '}
            {new Date(event.updatedAt).toLocaleString()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventModal;
