import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleRescheduleSession } from '@/services/Operations/SessionsOperation/SessionApi';
import { fetchDashboardSessions } from '@/Reducers/sessionSlice';
import toast from 'react-hot-toast';
import { Calendar, Clock, X } from 'lucide-react';
import { createPortal } from 'react-dom';

const Reschedule = ({ setReschedule, session  }) => {
  const { currentUser } = useSelector((state) => state.user);
  const isMentor = currentUser?.role === 'mentor';
  const modalRef = useRef(null);
  // console.log('>>>>>>>>>>>',session._id)
  const [isRescheduling, setIsRescheduling] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    if (session?.slotDetails) {
      setFormData({
        startDate: session?.slotDetails?.startDate || '',
        endDate: session?.slotDetails?.endDate || '',
        startTime: session?.slotDetails?.startTime || '',
        endTime: session?.slotDetails?.endTime || '',
      });
    }
  }, [session]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setReschedule(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [setReschedule]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    if (field === 'startDate' && !formData.endDate) {
      setFormData((prev) => ({
        ...prev,
        endDate: value,
      }));
    }
  };

  // Calculate end time based on start time.
  const calculateEndTime = (startTime, duration) => {
    if (!startTime || !duration) return '';

    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + parseInt(duration);

    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;

    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  const handleStartTimeChange = (value) => {
    const duration = session?.slotDetails?.duration;
    const endTime = calculateEndTime(value, duration);
    setFormData((prev) => ({
      ...prev,
      startTime: value,
      endTime,
    }));
  };

  // Get minimum date
  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const validateForm = () => {
    const { startDate, endDate, startTime, endTime } = formData;

    if (!startDate || !endDate || !startTime || !endTime) {
      toast.error('All Fields are required.');
      return false;
    }
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    if (startDate < today) {
      toast.error('Please select a future date');
      return false;
    }

      if (startDate === today) {
    // Add 30-minute buffer from current time
    const bufferTime = new Date(now.getTime() + 30 * 60000);
    const currentTimeWithBuffer = bufferTime.getHours().toString().padStart(2, '0') + ':' + 
                                 bufferTime.getMinutes().toString().padStart(2, '0');
    
    if (startTime <= currentTimeWithBuffer) {
      toast.error('Please schedule the session at least 30 minutes from now.');
      return false;
    }
  }

    // Check if end time is after start time
    if (startTime >= endTime) {
      toast.error('End time must be after start time');
      return false;
    }
    return true;
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsRescheduling(true);
    try {
      const response = await handleRescheduleSession(session._id, formData);
      if (response && response?.success) {
        toast.success('Session rescheduled successfully');
        dispatch(fetchDashboardSessions('all'));
        setReschedule(false);
      } else {
        console.log('Error Log:', response);
        toast.error(response?.message || 'Failed to reschedule session');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to reschedule session';
      toast.error(errorMessage);
    } finally {
      setIsRescheduling(false);
    }
  };

  const rescheduleModal = (
    <AnimatePresence>
      <motion.div
        className="fixed -inset-y-4 inset-x-0 bg-black bg-opacity-50 z-[9990] flex justify-center items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          className="relative w-full max-w-[600px] max-h-[90vh] bg-[#F5F3FF] flex flex-col rounded-md overflow-hidden sm:mx-6 md:mx-8"
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 10 }}
        >
          {/* Loading Overlay */}
          {isRescheduling && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                <span className="ml-3 text-gray-700">Rescheduling...</span>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 sm:p-6 rounded-t-md">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold mb-1">
                  Reschedule Session
                </h2>
                <p className="text-purple-100 text-xs sm:text-sm truncate">
                  {session?.slotDetails?.sessionTitle ||
                    'Update session timing'}
                </p>
              </div>
              <button
                onClick={() => setReschedule(false)}
                className="flex-shrink-0 text-white hover:text-purple-200 transition-colors p-1"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <form
              onSubmit={(e) => handleRescheduleSubmit(e)}
              className="p-4 sm:p-6 space-y-4 sm:space-y-6"
            >
              {/* Current Session Info */}
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
                  Current Session
                </h3>
                <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">
                      {session?.slotDetails?.startDate || 'No date'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">
                      {session?.slotDetails?.startTime || 'No time'} -{' '}
                      {session?.slotDetails?.endTime || 'No time'}
                    </span>
                  </div>
                </div>
              </div>

              {/* New Date Section */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-medium text-gray-800 flex items-center text-sm sm:text-base">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500 flex-shrink-0" />
                  New Date
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Start Date */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        handleInputChange('startDate', e.target.value)
                      }
                      min={getMinDate()}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        handleInputChange('endDate', e.target.value)
                      }
                      min={formData.startDate || getMinDate()}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* New Time Section */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-medium text-gray-800 flex items-center text-sm sm:text-base">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500 flex-shrink-0" />
                  New Time
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Start Time */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleStartTimeChange(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* End Time */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) =>
                        handleInputChange('endTime', e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                    {session?.slotDetails?.duration && (
                      <p className="text-xs text-gray-500 mt-1">
                        Duration: {session.slotDetails.duration} minutes
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary */}
              {formData.startDate && formData.startTime && (
                <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2 text-sm sm:text-base">
                    New Schedule Summary
                  </h4>
                  <div className="text-xs sm:text-sm text-green-700 space-y-1">
                    <p>
                      <strong>Date:</strong>{' '}
                      <span className="break-words">
                        {new Date(formData.startDate).toLocaleDateString(
                          'en-US',
                          {
                            weekday: window.innerWidth < 640 ? 'short' : 'long',
                            year: 'numeric',
                            month: window.innerWidth < 640 ? 'short' : 'long',
                            day: 'numeric',
                          }
                        )}
                      </span>
                    </p>
                    <p>
                      <strong>Time:</strong> {formData.startTime} -{' '}
                      {formData.endTime}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 sticky bottom-0 bg-[#F5F3FF] pb-2">
                <button
                  type="button"
                  onClick={() => setReschedule(false)}
                  className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
                  disabled={isRescheduling}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 text-sm sm:text-base font-medium"
                  disabled={isRescheduling}
                >
                  {isRescheduling ? 'Rescheduling...' : 'Reschedule Session'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
  return createPortal(rescheduleModal, document.body);
};

export default Reschedule;
