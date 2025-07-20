import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import {
  handleScheduleEvent,
  handleCancelEvent,
} from '@/services/Operations/EventOperation/EventApi';
import ConfirmDialog from '@/Components/ui/ConfirmDialog';

const EventCard = ({ event, tabType, onCancel }) => {
  const [isSchedule, setIsSchedule] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleSchedule = async (eventId) => {
    try {
      const res = await handleScheduleEvent(eventId);
      console.log('Response from handleScheduleEvent:', res?.success);
      if (res?.success) {
        setIsSchedule(true);
        toast.success('Event scheduled successfully!');
      } else {
        toast.error('Failed to schedule event');
      }
    } catch (error) {
      toast.error('Failed to schedule event');
    }
  };

  const handleCancel = async () => {
    setShowDialog(false);
    const res = await handleCancelEvent(event._id);
    if (res?.success) {
      toast.success('Event cancelled successfully!');
      if (onCancel) onCancel(event._id);
    } else {
      toast.error(res?.message || 'Failed to cancel event');
    }
  };

  return (
    <div className="min-h-screen pt-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-6 relative">
          <motion.h1
            className="text-lg font-bold mb-2 text-blue-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {event?.sessionTitle}
          </motion.h1>
          <motion.div
            className="flex items-center mb-4 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* <Icon icon="lucide:calendar" className="mr-2" /> */}
            <span>Start time: </span>
            <span>
              {event?.startDate} {event.startTime} (IST)
            </span>
          </motion.div>
          <motion.div
            className="flex items-center mb-4 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* <Icon icon="lucide:calendar" className="mr-2" /> */}
            <span>End time: </span>
            <span>
              {event?.endDate} {event.endTime} (IST)
            </span>
          </motion.div>
          {/* <motion.div
            className="flex items-center mb-6 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Icon icon="lucide:user" className="mr-2" />
            <span>by XYZ</span>
          </motion.div> */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center">
              <Icon icon="lucide:tag" className="mr-2 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold ">{event?.sessionCategory}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Icon icon="lucide:layers" className="mr-2 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Session Type</p>
                <p className="font-semibold">{event?.sessionType}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Icon icon="lucide:ticket" className="mr-2 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Slot Price</p>
                <p className="font-semibold">₹{event?.slotPrice}</p>
              </div>
            </div>
          </motion.div>
          <motion.p
            className="mb-6 text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {event?.sessionDescription}
          </motion.p>
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {event?.sessionType !== '1-1' && (
              <div className="flex items-center">
                <Icon icon="lucide:users" className="mr-2 text-blue-600" />
                <span className="text-lg font-semibold text-blue-900">
                  50 Registered
                </span>
              </div>
            )}
            {tabType === 'pending' ? (
              <>
                <div className="absolute bottom-6 right-6">
                  <button
                    className="px-4 py-2 rounded-lg text-white font-semibold bg-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDialog(true);
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <ConfirmDialog
                  open={showDialog}
                  onClose={(e) => {
                    e.stopPropagation();
                    setShowDialog(false);
                  }}
                  onConfirm={handleCancel}
                  title="Cancel Event"
                  message="Are you sure you want to cancel this event?"
                />
              </>
            ) : (
              <div className="absolute bottom-5 right-5 flex gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700"
                  onClick={() => navigate('/dashboard/manage-events')}
                >
                  View Schedule
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-white font-semibold ${
                    isSchedule
                      ? 'bg-green-500'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  onClick={() => handleSchedule(event._id)}
                  disabled={isSchedule}
                >
                  {isSchedule ? 'View Scheduled' : 'Schedule'}
                </button>
              </div>
            )}
          </motion.div>
          {/* {event?.sessionType !== '1-1' && (
            <motion.div
              className="mt-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${(registrationCount / 5000) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {5000 - registrationCount} spots remaining
              </p>
            </motion.div>
          )} */}
        </div>
      </motion.div>
    </div>
  );
};

export default EventCard;
