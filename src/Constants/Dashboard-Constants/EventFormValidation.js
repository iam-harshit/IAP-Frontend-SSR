import toast  from "react-hot-toast"

export const validateForm = (formData) => {
    // Title validation
    if (!formData.sessionTitle.trim()) {
      toast.error('Event title is required');
      return false;
    } else if (formData.sessionTitle.trim().split(/\s+/).length > 4) {
      toast.error('Title must be 4 words or less');
      return false;
    }

    // Description validation
    if (!formData.sessionDescription.trim()) {
      toast.error('Description is required');
      return false;
    } else if (formData.sessionDescription.trim().split(/\s+/).length > 13) {
      toast.error('Description must be 13 words or less');
      return false;
    }

    // Topics validation
    if (formData.sessionTopics.length === 0) {
      toast.error('At least one topic is required');
      return false;
    }

    // Date validation
    if (!formData.startDate) {
      toast.error('Start date is required');
      return false;
    }
    if (!formData.endDate) {
      toast.error('End date is required');
      return false;
    } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error('End date cannot be before start date');
      return false;
    }

    // Time validation
    if (!formData.startTime) {
      toast.error('Start time is required');
      return false;
    }
    if (!formData.endTime) {
      toast.error('End time is required');
      return false;
    } else if (formData.startDate === formData.endDate && formData.startTime >= formData.endTime) {
      toast.error('End time must be after start time');
      return false;
    }

    // Price validation
    if (!formData.slotPrice) {
      toast.error('Price is required');
      return false;
    } else if (formData.slotPrice < 0) {
      toast.error('Price cannot be negative');
      return false;
    } else if (formData.slotPrice > 100000) {
      toast.error('Price cannot exceed ₹100000');
      return false;
    }

    // Capacity validation
    if (!formData.maxCapacity) {
      toast.error('Capacity is required');
      return false;
    } else if (formData.maxCapacity < 1) {
      toast.error('Capacity must be at least 1');
      return false;
    }

    // Meeting link validation
    if (!formData.meetingLink) {
      toast.error('Meeting link is required');
      return false;
    } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.meetingLink)) {
      toast.error('Please enter a valid Meeting URL');
      return false;
    }
    return true;
  };