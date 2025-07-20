export const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'Date not available';
    }
  };
  // Helper function to format time
 export const formatTime = (timeString) => {
    if (!timeString) return 'Time not available';
    try {
      const [hours, minutes] = timeString.split(':');
      if (!hours || !minutes) return timeString;
      const date = new Date();
      date.setHours(parseInt(hours) || 0, parseInt(minutes) || 0);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch (error) {
      return timeString || 'Time not available';
    }
  };
  // Helper function to get status color
export const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800 border-gray-200';

    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };