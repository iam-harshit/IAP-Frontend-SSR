import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FiCalendar, FiBook, FiAlignLeft } from 'react-icons/fi';
import SessionTypeSelector from './SessionCategpryAndType';
import HeaderSection from './Header';
import DurationDisplay from './Duration';
import PreviewEventModel from './PreviewEventModel';
import toast from 'react-hot-toast';
import { handleCreateEvent } from '@/services/Operations/EventOperation/EventApi';
import EventDate from './Date';
import EventTime from './EventTime';
import PricingSection from './EventPricing&Meet';
import ResourceLinks from './Resources';
import { validateForm } from '@/Constants/Dashboard-Constants/EventFormValidation';
import ActionButtons from './ActionButtons';


const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    sessionType: 'workshop',
    sessionTitle: '',
    sessionDescription: '',
    meetingLink: '',
    duration: '',
    slotPrice: '',
    maxCapacity: '10',
    sessionCategory: 'generic',
    sessionTopics: [],
    resourceLinks: [],
  });
  const [showPreview, setShowPreview] = useState(false);
  const [resourceInput, setResourceInput] = useState('');


  // Add this utility function at the top of your file
  const calculateDuration = (startDate, endDate, startTime, endTime) => {
    if (!startDate || !endDate || !startTime || !endTime) return '';
    // Parse times (handle both 12-hour and 24-hour formats)
    const parseTime = (timeStr) => {
      let [hours, minutes] = timeStr.split(':').map(Number);
      const isPM = timeStr.toLowerCase().includes('pm') && hours < 12;
      const isAM = timeStr.toLowerCase().includes('am') && hours === 12;

      if (isPM) hours += 12;
      if (isAM) hours = 0;

      return { hours, minutes };
    };

    const start = parseTime(startTime);
    const end = parseTime(endTime);

    // Calculate daily duration in hours
    let dailyHours = (end.hours - start.hours) + (end.minutes - start.minutes) / 60;

    // Handle overnight duration (if end time is earlier than start time in 24-hour format)
    if (dailyHours < 0) {
      dailyHours += 24;
    }

    // Calculate number of days (inclusive)
    const startDay = new Date(startDate);
    const endDay = new Date(endDate);
    const daysCount = Math.floor((endDay - startDay) / (1000 * 60 * 60 * 24)) + 1;

    // Return total hours rounded to 2 decimal places
    const totalHours = dailyHours * daysCount;
    return totalHours % 1 === 0 ? totalHours : totalHours.toFixed(2);
  };

  // In your CreateEventPage component
  useEffect(() => {
    if (formData.startDate && formData.endDate && formData.startTime && formData.endTime) {
      const totalHours = calculateDuration(
        formData.startDate,
        formData.endDate,
        formData.startTime,
        formData.endTime
      );
      setFormData(prev => ({ ...prev, duration: totalHours }));
    }
  }, [formData.startDate, formData.endDate, formData.startTime, formData.endTime]);

  const handleChange = (e) => {
    if (e.target.name === 'slotPrice' && e.target.value > 100000) return;
    setFormData(prev => ({
      ...prev, [e.target.name]: e.target.value,
      ...(e.target.name === 'startTime' || e.target.name === 'endTime' ? { duration: '' } : {})
    }));
  };
  const handleAddResource = () => {
    if (resourceInput.trim() && !formData.resourceLinks.includes(resourceInput.trim())) {
      setFormData(prev => ({ ...prev, resourceLinks: [...prev.resourceLinks, resourceInput.trim()] }));
      setResourceInput('');
    }
  };

  const handleRemoveResource = (index) => {
    setFormData(prev => ({ ...prev, resourceLinks: prev.resourceLinks.filter((_, i) => i !== index) }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day (midnight)
    const selectedDate = new Date(value);
    // Check if selected date is before today (not including today)
    if (selectedDate < today) {
      toast.error('Cannot select dates before today');
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value,
      duration: '' // Reset duration when dates change
    }));
  };

  const handleAddLink = () => setFormData(prev => ({ ...prev, resourceLinks: [...prev.resourceLinks, ''] }));


  const handleRemoveLink = (index) => {
    setFormData(prev => ({ ...prev, resourceLinks: prev.resourceLinks.filter((_, i) => i !== index) }));
  };

  const handleLinkChange = (index, value) => {
    setFormData(prev => {
      const updatedLinks = [...prev.resourceLinks];
      updatedLinks[index] = value;
      return { ...prev, resourceLinks: updatedLinks }
    });
  };

  const handleViewEvent = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleScheduleEvent = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    try {
      const payload = {
        sessionTitle: formData.sessionTitle,
        sessionDescription: formData.sessionDescription,
        sessionCategory: formData.sessionCategory,
        sessionType: formData.sessionType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        duration: formData.duration,
        slotPrice: formData.slotPrice,
        maxCapacity: formData.maxCapacity,
        notesLink: formData.notesLink,
        meetingLink: formData.meetingLink,
        sessionTopics: formData.sessionTopics || [],

      };
      const response = await handleCreateEvent(payload);
      console.log("response?.response?.data?.message ", response?.message, "response.status ", response)
      if (response.success === true) {
        toast.success(response?.message || 'Event created successfully!');
        setFormData({
          startDate: '',
          endDate: '',
          startTime: '',
          endTime: '',
          sessionType: 'workshop',
          sessionTitle: '',
          sessionDescription: '',
          meetingLink: '',
          duration: '',
          slotPrice: '',
          maxCapacity: '10',
          sessionCategory: 'generic',
          sessionTopics: [],
          notesLink: '',
        });
        setShowPreview(false);
        return;
      }
      else {
        console.log("response", response.response?.data?.message)
        if (response?.status >= 400) {
          const isSlotConflict = /time|slot|schedule|conflict|exists/i.test(response.data?.message || '');
          toast.error(isSlotConflict ? 'Slot already exists for the given time. Please choose a different time slot.' : response?.response?.data?.message
          );
          return;
        }
      }
    } catch (error) {
      toast.error(error.message || "Internal Server Error")
      if (error.response) {
        if (error.response.status === 409) {
          toast.error('Slot already exists for the given time. Please choose a different time slot.');
        } else {
          toast.error(error?.response?.response?.data?.message || `Failed to create event (Status: ${error?.response?.status})`);
        }
      } else {
        toast.error(error.message || 'An unexpected error occurred while creating the event');
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <HeaderSection />
        <div className="overflow-hidden">
          <div className="px-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <label className="flex items-center text-md font-semibold text-indigo-800 mb-1">
                <FiBook className="mr-2 text-purple-600 text-md" /> Event Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="sessionTitle"
                  value={formData.sessionTitle}
                  onChange={handleChange}
                  placeholder="e.g., Advanced Python Workshop"
                  className="w-full px-5 py-3 text-md rounded-xl border border-purple-600 outline-none"
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="flex items-center text-md font-semibold text-indigo-800 mb-1">
                <FiAlignLeft className="mr-2 text-purple-600 text-md" /> Description
              </label>
              <div className="relative">
                <textarea
                  name="sessionDescription"
                  value={formData.sessionDescription}
                  onChange={handleChange}
                  placeholder="Describe what participants will learn..."
                  rows={4}
                  className="pl-4 w-full px-5 py-3 text-md rounded-xl border border-purple-600 outline-none"
                  required
                />
              </div>
            </div>
            <SessionTypeSelector formData={formData} setFormData={setFormData} handleChange={handleChange} />
            <EventDate formData={formData} setFormData={setFormData} handleDateChange={handleDateChange} />
            <EventTime formData={formData} handleChange={handleChange} setFormData={setFormData} />
            <DurationDisplay formData={formData} />
            <PricingSection formData={formData} handleChange={handleChange} handleAddLink={handleAddLink} handleRemoveLink={handleRemoveLink} handleLinkChange={handleLinkChange} />
            <ResourceLinks resourceInput={resourceInput} setResourceInput={setResourceInput} handleAddResource={handleAddResource} resources={formData.resourceLinks} handleRemoveResource={handleRemoveResource} />
            <ActionButtons handleViewEvent={handleViewEvent} handleScheduleEvent={handleScheduleEvent} />
          </div>
        </div>
      </div>
      {/* Preview Modal */}
      <AnimatePresence>
        {
          showPreview && <PreviewEventModel formData={formData} setShowPreview={setShowPreview} handleScheduleEvent={handleScheduleEvent} />
        }
      </AnimatePresence>
    </div>
  );
};

export default CreateEventPage;