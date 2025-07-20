import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertTriangle, Calendar, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelSessionById } from '@/services/Operations/SessionsOperation/SessionApi';
import { fetchDashboardSessions } from '@/Reducers/sessionSlice';
import toast from 'react-hot-toast';

const CancelSession = ({ setShowCancelModal, session }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  
  const maxWords = 50;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowCancelModal(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowCancelModal(false);
      }
    };

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [setShowCancelModal]);

  // Handle textarea input with word limit
  const handleReasonChange = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    if (e.target.value.trim() === '' || words.length <= maxWords) {
      setCancelReason(e.target.value);
    }
  };

  // Get word count
  const getWordCount = () => {
    if (!cancelReason.trim()) return 0;
    return cancelReason.trim().split(/\s+/).length;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: window.innerWidth < 640 ? 'short' : 'long',
        year: 'numeric',
        month: window.innerWidth < 640 ? 'short' : 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return 'No time';
    try {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return timeString;
    }
  };

  // Handle form submission
  const handleCancelSession = async (e) => {
    e.preventDefault();
    
    if (!cancelReason.trim()) {
      toast.error('Please provide a reason for cancellation');
      return;
    }

    if (getWordCount() < 3) {
      toast.error('Please provide a more detailed reason (at least 3 words)');
      return;
    }

    setIsCancelling(true);

    try {
      const payload = {
        cancelReason: cancelReason.trim()
      };

      const response = await cancelSessionById(session._id, payload);
      
      if (response?.data?.success || response?.status) {
        toast.success('Session cancelled successfully');
        dispatch(fetchDashboardSessions('all')); // Refresh the sessions list
        setShowCancelModal(false);
      } else {
        toast.error(response?.data?.message || 'Failed to cancel session');
      }
    } catch (error) {
      console.error('Cancel session error:', error);
      toast.error('Failed to cancel session. Please try again.');
    } finally {
      setIsCancelling(false);
    }
  };

  // Render modal content
  const modalContent = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-[9990] flex justify-center items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9990
        }}
      >
        <motion.div
          ref={modalRef}
          className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[95vh] relative overflow-hidden flex flex-col sm:max-w-lg"
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 10 }}
        >
          {/* Loading Overlay */}
          {isCancelling && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-red-500"></div>
                <span className="ml-3 text-gray-700 text-sm sm:text-base">Cancelling...</span>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 flex-shrink-0">
            <div className="flex justify-between items-start gap-3">
              <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold">Cancel Session</h2>
                  <p className="text-red-100 text-xs sm:text-sm mt-1">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-white hover:text-red-200 transition-colors p-1 flex-shrink-0"
                disabled={isCancelling}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleCancelSession} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Session Details */}
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-red-500">
                <h3 className="font-medium text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">
                  Session Details
                </h3>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base break-words">
                    {session?.slotDetails?.sessionTitle || 'Session Title'}
                  </h4>
                  <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                      <span className="break-words">{formatDate(session?.slotDetails?.startDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                      <span className="break-words">
                        {formatTime(session?.slotDetails?.startTime)} - {formatTime(session?.slotDetails?.endTime)}
                      </span>
                    </div>
                    {session?.mentor && (
                      <div className="text-xs text-gray-500 mt-2">
                        <span className="font-medium">Mentor:</span> 
                        <span className="break-words ml-1">{session.mentor.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Warning Message */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm min-w-0 flex-1">
                    <p className="text-yellow-800 font-medium mb-1">Important Notice</p>
                    <p className="text-yellow-700 break-words">
                      Your {currentUser?.role === 'mentor' ? 'mentee' : 'mentor'} will be notified about this cancellation. 
                      Please provide a clear reason to help them understand.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cancellation Reason */}
              <div className="space-y-2">
                <label htmlFor="cancelReason" className="block text-xs sm:text-sm font-medium text-gray-700">
                  Reason for Cancellation <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="cancelReason"
                  value={cancelReason}
                  onChange={handleReasonChange}
                  placeholder="Please explain why you're cancelling this session (e.g., emergency, scheduling conflict, illness, etc.)"
                  className="w-full px-3 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  rows={4}
                  required
                  disabled={isCancelling}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Minimum 3 words required</span>
                  <span className={getWordCount() > maxWords ? 'text-red-500' : ''}>
                    {getWordCount()}/{maxWords} words
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Sticky Action Buttons */}
          <div className="flex-shrink-0 p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
                disabled={isCancelling}
              >
                Keep Session
              </button>
              <button
                type="submit"
                onClick={handleCancelSession}
                className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                disabled={isCancelling || !cancelReason.trim() || getWordCount() < 3}
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Session'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // createPortal to render modal at document root
  return createPortal(modalContent, document.body);
};

export default CancelSession;