import React from 'react';
import PropTypes from 'prop-types';
import { FaRegClock } from 'react-icons/fa6';

const statusConfig = {
  available: {
    text: 'Available',
    dotClass: 'bg-green-500 animate-pulse',
    styles: 'bg-green-100 text-green-800 border border-green-300',
  },
  away: {
    text: 'Away',
    dotClass: 'bg-yellow-500',
    styles: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  },
  booked: {
    text: 'Schedule Full',
    dotClass: 'bg-red-500',
    styles: 'bg-red-100 text-red-800 border border-red-300',
  },
};

// Helper to format minutes
const formatResponseTime = (minutes) => {
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    return `${days} day${days > 1 ? 's' : ''}${remHours ? ` ${remHours} hr${remHours > 1 ? 's' : ''}` : ''}`;
  }
  return `${hours} hour${hours > 1 ? 's' : ''}${mins ? ` ${mins} min${mins > 1 ? 's' : ''}` : ''}`;
};

const MentorAvailabilityStatusAndResponseTime = ({ status, responseTime }) => {
  if (!statusConfig[status]) return null;

  const { text, dotClass, styles } = statusConfig[status];

  return (
    <div className="flex flex-wrap items-center gap-3 my-2 lg:my-4">
      {/* Availability Badge with Dot */}
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${styles}`}
        title={`Mentor is currently ${text.toLowerCase()}`}
      >
        <span className={`w-3 h-3 rounded-full ${dotClass}`} />
        <span>{text}</span>
      </div>

      {/* Response Time Badge with Clock Icon */}
      {typeof responseTime === 'number' && (
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-300"
          title="Average response time"
        >
          <FaRegClock className="text-blue-600 text-base" />
          <span>Responds in {formatResponseTime(responseTime)}</span>
        </div>
      )}
    </div>
  );
};

MentorAvailabilityStatusAndResponseTime.propTypes = {
  status: PropTypes.oneOf(['available', 'away', 'booked']),
  responseTime: PropTypes.number,
};

export default MentorAvailabilityStatusAndResponseTime;
