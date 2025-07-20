import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  DollarSign,
  Tag,
  FileText,
  ChevronDown,
  ChevronUp,
  Edit,
} from 'lucide-react';
import Reschedule from './Reschedule';
import CancelSession from './CancelSession';
import AttendeesModal from './AttendeesModal';
import { CgNotes } from 'react-icons/cg';
import SessionUpdateModal from './UpdateSessionModal';
import { formatDate, formatTime, getStatusColor } from './helpers/sessionCardHelper.js'

const SessionCard = ({ session, userId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false); // State for reschedule modal
  const [showCancelModal, setShowCancelModal] = useState(false); // State for cancel modal
  const [showAttendeesModal, setShowAttendeesModal] = useState(false); // State for attendees modal
  const [showUpdateModal, setUpdateModal] = useState(false);
  const [updateField, setUpdateField] = useState(''); //State for activeupdate field
  const canUpdate =
    userId === session?.mentor?._id && session?.status == 'scheduled';
    console.log(session?.mentor?._id )
    console.log(userId)

  // Above condition will check wheter user has right to update ,base on his id and whether the session is scheduled.
  if (!session) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <p className="text-gray-500">Session data not available</p>
      </div>
    );
  }
  // Helper function to get session title based on type
  const getSessionTitle = () => {
    const sessionType = session?.slotDetails?.sessionType;
    const sessionTitle = session?.slotDetails?.sessionTitle;
    if (sessionType === '1-1' && session?.attendees?.length > 0) {
      const attendeeName = session.attendees[0]?.name;
      return attendeeName
        ? `1-1 Session with ${attendeeName}`
        : sessionTitle || 'Untitled Session';
    }
    return sessionTitle || 'Untitled Session';
  };
  // Helper function to get subtitle for 1-1 sessions
  const getSessionSubtitle = () => {
    const sessionType = session?.slotDetails?.sessionType;
    const sessionTitle = session?.slotDetails?.sessionTitle;

    if (sessionType === '1-1') {
      return sessionTitle || null;
    }
    return null;
  };
  // Helper function to copy meeting link
  const handleCopyLink = () => {
    const meetingLink = session?.slotDetails?.meetingLink;
    if (!meetingLink) {
      return;
    }

    try {
      navigator.clipboard.writeText(meetingLink);
      toast.success("Link Copied!")
    } catch (error) {
      toast.error("Failed to Copy link!")
    }
  };

  // Handler for reschedule button
  const handleReschedule = () => {
    setShowReschedule(true);
  };

  // Handler for cancel button
  const handleCancel = () => {
    setShowCancelModal(true);
  };

  // Handler for attendees click
  const handleAttendeesClick = () => {
    const attendeesCount = session?.attendees?.length || 0;
    if (attendeesCount > 1) {
      setShowAttendeesModal(true);
    }
  };
  const handleCloseUpdateModal = () => {
    setUpdateModal(false);
    setUpdateField('');
  };
  const handleOpenEditModal = (field) => {
    setUpdateField(field);
    console.log(field);
    setUpdateModal(true);
  };

  const UpdatableField = ({ fieldName, className }) => {
    if (!canUpdate) {
      return null;
    }
    return (
      <Edit
        className={`w-4 h-4 ml-2 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors duration-200 ${className}`}
        onClick={() => handleOpenEditModal(fieldName)}
      />
    );
  };
  // Get attendees count
  const attendeesCount = session?.attendees?.length || 0;
  const isAttendeesClickable = attendeesCount > 1;
  return (
    <>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Main Card Content */}
        <div className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {getSessionTitle()}
                </h3>
                <UpdatableField fieldName={'title'} className="mb-1" />
              </div>

              {getSessionSubtitle() && (
                <p className="text-sm text-gray-600 mb-2">
                  {getSessionSubtitle()}
                </p>
              )}
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(session?.status)}`}
            >
              {session?.status
                ? session.status.charAt(0).toUpperCase() +
                  session.status.slice(1)
                : 'Unknown'}
            </span>
          </div>
          {/* Session Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Session Type */}
            <div className="flex items-center text-sm text-gray-600">
              <Tag className="w-4 h-4 mr-2 text-purple-500" />
              <span className="font-medium">Type:</span>
              <span className="ml-1 capitalize">
                {session?.slotDetails?.sessionType || 'N/A'}
              </span>
            </div>
            {/* Date */}
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              <span className="font-medium">Date:</span>
              <span className="ml-1">
                {formatDate(session?.slotDetails?.startDate)}
              </span>
            </div>
            {/* Attendees Count */}
            <div
              className={`flex items-center text-sm text-gray-600 ${
                isAttendeesClickable ? 'cursor-pointer  transition-colors' : ''
              }`}
              onClick={handleAttendeesClick}
              title={isAttendeesClickable ? 'Click to view all attendees' : ''}
            >
              <Users className="w-4 h-4 mr-2 text-green-500" />
              <span className="font-medium">Attendees:</span>
              <span className={`ml-1 ${isAttendeesClickable ? '' : ''}`}>
                {attendeesCount}
                {isAttendeesClickable && (
                  <span className="ml-1 text-xs text-blue-500">
                    (click to view)
                  </span>
                )}
              </span>
            </div>
            {/* Time */}
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-orange-500" />
              <span className="font-medium">Time:</span>
              <span className="ml-1">
                {formatTime(session?.slotDetails?.startTime)} -{' '}
                {formatTime(session?.slotDetails?.endTime)}
              </span>
            </div>
          </div>
        </div>
        {/* Expanded Details Section */}
        {isExpanded && (
          <div className="border-t border-gray-200 bg-gray-50">
            <div className="p-3 md:p-6">
              {/* Action Buttons */}
              {canUpdate && (
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={handleReschedule}
                    className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors duration-100"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
              {/* Detailed Information */}
              <div className="space-y-4">
                {/* Session Description */}
                <div>
                  <div className="flex items-center mb-2">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium text-gray-700">
                      Description
                    </span>
                    <UpdatableField fieldName={'description'} />
                  </div>
                  <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border">
                    {session?.slotDetails?.sessionDescription ||
                      'No description available'}
                  </p>
                </div>
                {/* Additional Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="flex items-center mb-1">
                      <Tag className="w-4 h-4 mr-2 text-purple-500" />
                      <span className="font-medium text-gray-700">
                        Category
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 capitalize">
                      {session?.slotDetails?.sessionCategory || 'Uncategorized'}
                    </p>
                  </div>
                  {/* Duration */}
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="flex items-center mb-1">
                      <Clock className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="font-medium text-gray-700">
                        Duration
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {session?.slotDetails?.duration || 'N/A'} minutes
                    </p>
                  </div>
                  {/* Price */}
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                      <span className="font-medium text-gray-700">Price</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      ₹{session?.slotDetails?.slotPrice || '0'}
                    </p>
                  </div>
                  {/* Meeting Link */}
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="flex items-center mb-1">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium text-gray-700">
                        Meeting Link
                      </span>
                      <UpdatableField fieldName={'meetingLink'} />
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600 truncate flex-1">
                        {session?.slotDetails?.meetingLink ||
                          'No meeting link available'}
                      </p>
                      {session?.slotDetails?.meetingLink && (
                        <button
                          onClick={handleCopyLink}
                          className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
                        >
                          Copy
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <div className="flex items-center mb-1">
                    <CgNotes className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium text-gray-700">
                      Resources & Notes
                    </span>
                    <UpdatableField fieldName={'resources'} />
                  </div>
                  <div>
                    {session?.slotDetails?.resources &&
                    session?.slotDetails?.resources?.length > 0 ? (
                      <ol className="list-decimal list-inside space-y-1">
                        {session?.slotDetails?.resources?.map((item, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 truncate flex-1"
                          >
                            {item}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="pt-2 text-sm text-gray-600 truncate flex-1">
                        No Resources available
                      </p>
                    )}
                  </div>
                </div>
                {/* Attendees List */}
                {session?.attendees && session?.attendees?.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-green-500" />
                        <span className="font-medium text-gray-700">
                          Attendees ({session?.attendees?.length})
                        </span>
                      </div>
                      {session?.attendees?.length > 1 && (
                        <button
                          onClick={handleAttendeesClick}
                          className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                        >
                          View All
                        </button>
                      )}
                    </div>
                    <div className="bg-white p-3 rounded-lg border">
                      {session?.attendees?.length === 1 ? (
                        // Show single attendee details
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {session?.attendees[0]?.name || 'Unknown'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {session?.attendees[0]?.email || 'No email'}
                            </p>
                          </div>
                        </div>
                      ) : (
                        // Show summary for multiple attendees
                        <div className="py-3 text-center">
                          <button
                            onClick={handleAttendeesClick}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium underline"
                          >
                            Click to view {session?.attendees?.length} attendees
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Mentor Information */}
                {session?.mentor && (
                  <div>
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 mr-2 text-purple-500" />
                      <span className="font-medium text-gray-700">Mentor</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border">
                      <p className="text-sm font-medium text-gray-700">
                        {session?.mentor?.name || 'Unknown'}
                      </p>
                      <p className="text-xs text-gray-500">
                        @{session?.mentor?.username || 'No username'}
                      </p>
                    </div>
                  </div>
                )}
                {/* Cancellation Info (if cancelled) */}
                {session?.status === 'cancelled' && session?.cancelReason && (
                  <div>
                    <div className="flex items-center mb-2">
                      <FileText className="w-4 h-4 mr-2 text-red-500" />
                      <span className="font-medium text-gray-700">
                        Cancellation Details
                      </span>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <p className="text-sm text-red-700 mb-1">
                        <span className="font-medium">Cancelled by:</span>{' '}
                        {session?.cancelledBy || 'Unknown'}
                      </p>
                      <p className="text-sm text-red-700">
                        <span className="font-medium">Reason:</span>{' '}
                        {session?.cancelReason}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* View More Details Button*/}
        <div className="px-6 pb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-56 m-auto flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <span className="mr-2">
              {isExpanded ? 'Hide Details' : 'View More Details'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      {/* Reschedule Modal */}
      {showReschedule && (
        <Reschedule setReschedule={setShowReschedule} session={session} />
      )}
      {/* Cancel Modal */}
      {showCancelModal && (
        <CancelSession
          setShowCancelModal={setShowCancelModal}
          session={session}
        />
      )}
      {/* Attendees Modal */}
      {showAttendeesModal && (
        <AttendeesModal
          attendees={session?.attendees || []}
          isOpen={showAttendeesModal}
          onClose={() => setShowAttendeesModal(false)}
          sessionTitle={getSessionTitle()}
        />
      )}
      {showUpdateModal && (
        <SessionUpdateModal
          session={session}
          handleClose={handleCloseUpdateModal}
          field={updateField}
        />
      )}
    </>
  );
};
export default SessionCard;
