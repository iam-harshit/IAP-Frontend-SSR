import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Edit3, Calendar, Clock, FileText, Link, Hash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
// import { updateSessionById } from '@/services/Operations/SessionsOperation/SessionApi';
import { fetchDashboardSessions } from '@/Reducers/sessionSlice';
import toast from 'react-hot-toast';
ResourcesInput;
import TopicsInput from './UpdateTopicsInput.jsx';
import ResourcesInput from './UpdateResourceInput.jsx';
import { handleUpdateSession } from '@/services/Operations/SessionsOperation/SessionApi.js';

const SessionUpdateModal = ({ session, handleClose, field }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [formData, setFormData] = useState('');
  const [topicsArray, setTopicsArray] = useState([]);
  const [resourcesArray, setResourcesArray] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    switch (field) {
      case 'title':
        setFormData(session?.slotDetails?.sessionTitle || '');
        break;
      case 'description':
        setFormData(session?.slotDetails?.sessionDescription || '');
        break;
      case 'meetingLink':
        setFormData(session?.slotDetails?.meetingLink || '');
        break;
      case 'resources':
        // setResourcesArray(session?.slotDetails?.resources || []);
        const initialResources = Array.isArray(session?.slotDetails?.resources)
          ? session?.slotDetails?.resources
          : [];
        setResourcesArray(initialResources);
        break;
      case 'topics':
        setTopicsArray(session?.slotDetails?.sessionTopics || []);
        break;
    }
  }, [field, session]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    }
    function handleKeyDown(event) {
      if (event.key == 'Escape') {
        handleClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  const getFieldConfig = () => {
    switch (field) {
      case 'title':
        return {
          title: 'Update Session Title',
          icon: Edit3,
          placeholder: 'Enter session title...',
          maxLength: 100,
          type: 'input',
        };
      case 'description':
        return {
          title: 'Update Session Description',
          icon: FileText,
          placeholder: 'Describe what this session will cover...',
          maxLength: 500,
          type: 'textarea',
        };
      case 'topics':
        return {
          title: 'Update Session Topics',
          icon: Hash,
          placeholder: 'Add a topic and press Enter',
          type: 'topics',
        };
      case 'resources':
        return {
          title: 'Update Session Resources',
          icon: Link,
          placeholder: 'Add resource URL',
          type: 'resources',
        };
      case 'meetingLink':
        return {
          title: 'Update Meeting Link',
          icon: Link,
          placeholder:
            'https://zoom.us/j/123456789 or https://meet.google.com/...',
          type: 'input',
        };
      default:
        return {
          title: 'Update Session',
          icon: Edit3,
          placeholder: '',
          type: 'input',
        };
    }
  };
  const fieldConfig = getFieldConfig();

  // Handle topics management
  const addTopic = (topicText) => {
    if (topicText.trim() && !topicsArray.includes(topicText.trim())) {
      setTopicsArray([...topicsArray, topicText.trim()]);
    }else{
      toast.error("Duplicate topics are not allowed")
    }
  };
  const removeTopic = (index) => {
    setTopicsArray(topicsArray.filter((_, i) => i !== index));
  };
  const addResource = (resourceUrl) => {
    if (resourceUrl.trim() && !resourcesArray.includes(resourceUrl.trim())) {
      setResourcesArray([...resourcesArray, resourceUrl.trim()]);
    }else{
      toast.error('Duplicate Links not Allowed')
    }
  };
  const removeResource = (index) => {
    setResourcesArray(resourcesArray.filter((_, i) => i !== index));
  };
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No Date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: window.innerWidth < 640 ? 'short' : 'long',
        year: 'numeric',
        month: window.innerWidth < 640 ? 'short' : 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };
  const formatTime = (timeString) => {
    if (!timeString) return 'No time';
    try {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return timeString;
    }
  };

  const handleFormUpdateSession = async (e) => {
    e.preventDefault();
    switch (field) {
      case 'title':
        if (!formData.trim()) {
          toast.error('Session Title is required');
          return;
        }
        if (formData.trim().length < 4) {
          toast.error('Title should be atleast 4 characters.');
          return;
        }
        break;
      case 'description':
        if (!formData.trim()) {
          toast.error('Session Description is required');
          return;
        }
        if (formData.trim().length < 10) {
          toast.error('Session Description must be atleast 10 characters.');
          return;
        }
        break;
      case 'topics':
        if (topicsArray.length === 0) {
          toast.error('At least one topic is required');
          return;
        }
        break;
      case 'meetingLink':
        if (!formData.trim()) {
          toast.error('Meeting list is required');
        }
        try {
          new URL(formData.trim());
        } catch {
          toast.error('Please enter a valid URL');
          return;
        }
        break;
      case 'resources':
        break;
    }
    setIsUpdating(true);
    try {
      let payload = {};
      switch (field) {
        case 'title':
          payload = { sessionTitle: formData.trim() };
          break;
        case 'description':
          payload = { sessionDescription: formData.trim() };
          break;
        case 'topics':
          payload = { sessionTopics: topicsArray };
          break;
        case 'resources':
          payload = { resources: resourcesArray };
          break;
        case 'meetingLink':
          payload = { meetingLink: formData.trim() };
          break;
      }
      console.log(payload);
      // console.log(">>>M>M>",session)
      const response = await handleUpdateSession(session._id, payload);
      if (response.success) {
        toast.success(response?.message);
        console.log(session)
        // dispatch(fetchDashboardSessions('all',session?.slotDetails?.startDate));
        dispatch(fetchDashboardSessions({ 
  status: 'all', 
  date: session?.slotDetails?.startDate 
}));
        handleClose();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Update session error:', error);
      toast.error('Failed to update session, Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };
  // Render Field Specific Input
  const renderFieldInput = () => {
    switch (field) {
      case 'title':
      case 'meetingLink':
        return (
          <div className="space-y-2">
            <label
              htmlFor="fieldInput"
              className="block text-xs sm:text-sm font-medium text-gray-700"
            >
              {fieldConfig.title.replace('Update ', '')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="fieldInput"
              type="text"
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              placeholder={fieldConfig.placeholder}
              maxLength={fieldConfig.maxLength}
              className="w-full px-3 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isUpdating}
            />
            {fieldConfig.maxLength && (
              <div className="text-xs text-gray-500 text-right">
                {formData.length}/{fieldConfig.maxLength}
              </div>
            )}
          </div>
        );

      case 'description':
        return (
          <div className="space-y-2">
            <label
              htmlFor="fieldInput"
              className="block text-xs sm:text-sm font-medium text-gray-700"
            >
              Session Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="fieldInput"
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              placeholder={fieldConfig.placeholder}
              maxLength={fieldConfig.maxLength}
              className="w-full px-3 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              required
              disabled={isUpdating}
            />
            <div className="text-xs text-gray-500 text-right">
              {formData.length}/{fieldConfig.maxLength}
            </div>
          </div>
        );

      case 'topics':
        return (
          <TopicsInput
            topics={topicsArray}
            onAddTopic={addTopic}
            onRemoveTopic={removeTopic}
            disabled={isUpdating}
          />
        );

      case 'resources':
        return (
          <ResourcesInput
            resources={resourcesArray}
            onAddResource={addResource}
            onRemoveResource={removeResource}
            disabled={isUpdating}
          />
        );

      default:
        return null;
    }
  };
  const IconComponent = fieldConfig.icon;

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
          zIndex: 9990,
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
          {isUpdating && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-700 text-sm sm:text-base">
                  Updating...
                </span>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 sm:p-6 flex-shrink-0">
            <div className="flex justify-between items-start gap-3">
              <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold">
                    {fieldConfig.title}
                  </h2>
                  <p className="text-blue-100 text-xs sm:text-sm mt-1">
                    Make changes to improve your session
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:text-blue-200 transition-colors p-1 flex-shrink-0"
                disabled={isUpdating}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <form
              onSubmit={handleFormUpdateSession}
              className="p-4 sm:p-6 space-y-4 sm:space-y-6"
            >
              {/* Session Details */}
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-purple-500">
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
                      <span className="break-words">
                        {formatDate(session?.slotDetails?.startDate)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                      <span className="break-words">
                        {formatTime(session?.slotDetails?.startTime)} -{' '}
                        {formatTime(session?.slotDetails?.endTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Field-specific Input */}
              {renderFieldInput()}
            </form>
          </div>

          <div className="flex-shrink-0 p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleFormUpdateSession}
                className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update Session'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default SessionUpdateModal;
