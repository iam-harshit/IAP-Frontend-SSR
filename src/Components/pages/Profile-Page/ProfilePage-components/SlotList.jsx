import React, { useState } from 'react';
import {
  FaPeopleArrows,
  FaRegClock,
  FaSpinner,
  FaLockOpen,
  FaLock,
} from 'react-icons/fa';
import { MdGroups } from 'react-icons/md';
import { FaArrowsDownToPeople } from 'react-icons/fa6';
import { SlCalender } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrderAndBookSlot } from '@/services/Operations/Razorpay/razorpay';

const getFormattedDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
  });

const getFormattedButtonDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  });

const SlotList = ({
  filteredSlots,
  loading,
  selectedSlot,
  setSelectedSlot,
  formatTo12Hour,
  reschedule,
  isMentor,
  isCurrentUser,
}) => {
  const navigate = useNavigate();
  const { username, _id: currentUserId } = useSelector(
    (state) => state.user.currentUser || {}
  );
  const isAuthenticated = !!username;
  const [bookedSlotIds, setBookedSlotIds] = useState([]);

  const handleSlotBooking = async (slot) => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }

    setSelectedSlot(slot);
    const res = await createOrderAndBookSlot(slot._id);

    if (res?.success) {
      setBookedSlotIds((prev) => [...prev, slot._id]);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const sessionIcon = (type) => {
    if (type === '1-1') return <FaPeopleArrows />;
    if (type === '1-n') return <FaArrowsDownToPeople />;
    return <MdGroups />;
  };

  return (
    <div className="mx-4 shadow-[0_4px_2px_rgba(0,0,0,0.2)] flex flex-col mb-4 gap-4 border p-3 rounded-lg bg-white h-[200px] max-h-[200px] lg:h-[230px] lg:max-h-[230px] xl:h-[200px] max-h-[200px] overflow-y-auto">
      {filteredSlots
        .filter((slot) => {
          const isSlotFull = slot.bookedUsers.length >= slot.maxCapacity;
          const isBookedByCurrentUser = slot.bookedUsers?.some(
            (user) =>
              user?.userId === currentUserId || user?._id === currentUserId
          );

          // Show if: slot not full, OR booked by user, OR mentor viewing their own slots
          return (
            !isSlotFull || isBookedByCurrentUser || (isMentor && isCurrentUser)
          );
        })
        .map((slot, index) => {
          const isThisSlotLoading = loading && selectedSlot?._id === slot._id;

          const isAlreadyBooked =
            bookedSlotIds.includes(slot._id) ||
            slot.bookedUsers?.some(
              (user) =>
                user?.userId === currentUserId || user?._id === currentUserId
            );

          const isSlotFull = slot.bookedUsers.length >= slot.maxCapacity;

          const buttonLabel = `${reschedule ? 'Reschedule' : 'Book'} : ${getFormattedButtonDate(
            slot.startDate
          )}, ${formatTo12Hour(slot.startTime)} - ${formatTo12Hour(
            slot.endTime
          )}`;

          return (
            <div
              key={slot._id || index}
              className={`flex flex-col items-start justify-between ${
                index === 1 ? 'mt-4' : 'mt-0'
              } text-gray-800`}
            >
              <div className="flex items-center justify-between w-full">
                <p className="font-bold capitalize">{slot.sessionTitle}</p>
                <span className="text-sm font-semibold">₹{slot.slotPrice}</span>
              </div>

              <p className="text-h6 font-medium mb-2">
                {slot.sessionDescription}
              </p>

              <div className="flex flex-row lg:flex-col xl:flex-row w-full  justify-between ">
                <div>
                  <div className="flex items-center gap-x-2 mb-1">
                    <SlCalender className="text-md text-black" />
                    <span className="text-sm text-gray-700">
                      {getFormattedDate(slot.startDate) ===
                      getFormattedDate(slot.endDate)
                        ? getFormattedDate(slot.startDate)
                        : `${getFormattedDate(slot.startDate)} - ${getFormattedDate(
                            slot.endDate
                          )}`}
                    </span>
                  </div>

                  <div className="flex items-center text-black gap-x-2 mb-1">
                    {sessionIcon(slot.sessionType)}
                    <span className="text-sm font-medium capitalize text-gray-700">
                      {slot.sessionType}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-x-2 mb-1">
                    <FaRegClock className="text-md text-black" />
                    <span className="text-sm text-gray-700">
                      {formatTo12Hour(slot.startTime)} -{' '}
                      {formatTo12Hour(slot.endTime)}
                    </span>
                  </div>

                  <div className="flex items-center gap-x-2 mb-1">
                    {slot.maxCapacity - slot.bookedUsers.length > 0 ? (
                      <>
                        <FaLockOpen className="text-md text-black" />
                        <span className="text-sm font-medium text-gray-700">
                          Openings: {slot.maxCapacity - slot.bookedUsers.length}
                        </span>
                      </>
                    ) : (
                      <>
                        <FaLock className="text-md text-red-500" />
                        <span className="text-sm font-medium text-red-500">
                          No Openings
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (
                    !isCurrentUser &&
                    !isAlreadyBooked &&
                    !isThisSlotLoading &&
                    !isSlotFull
                  ) {
                    handleSlotBooking(slot);
                  }
                }}
                disabled={
                  isCurrentUser ||
                  isAlreadyBooked ||
                  isThisSlotLoading ||
                  isSlotFull
                }
                className={`mt-2 text-[14px] xs2:text-h5 lg:text-[14px] xl:text-h5 font-semibold px-4 py-3 rounded-md w-full transition-colors duration-300
    ${
      isThisSlotLoading
        ? 'bg-gray-500 text-white cursor-wait'
        : isAlreadyBooked
          ? 'bg-green-300 text-green-900 border border-green-500 cursor-not-allowed'
          : isSlotFull && isCurrentUser && isMentor
            ? 'bg-green-100 text-green-900 border border-green-400 cursor-default'
            : isSlotFull
              ? 'bg-red-300 text-red-900 border border-red-400 cursor-not-allowed'
              : isCurrentUser
                ? 'bg-blue-100 text-blue-800 border border-blue-300 cursor-default'
                : 'bg-purple-600 text-white hover:bg-purple-700'
    }
    ${isCurrentUser ? 'opacity-100' : 'cursor-pointer'}
  `}
              >
                {isThisSlotLoading ? (
                  <FaSpinner className="animate-spin mx-auto" />
                ) : isCurrentUser && isMentor && isSlotFull ? (
                  `Fully Booked: ${slot.bookedUsers.length} ${
                    slot.bookedUsers.length === 1 ? 'person' : 'people'
                  } booked this slot`
                ) : isCurrentUser ? (
                  slot.bookedUsers.length > 0 ? (
                    `${slot.bookedUsers.length} ${
                      slot.bookedUsers.length === 1 ? 'person' : 'people'
                    } booked this slot`
                  ) : (
                    'No bookings yet'
                  )
                ) : isAlreadyBooked ? (
                  'Booked: See You on ' + getFormattedDate(slot.startDate)
                ) : isSlotFull ? (
                  'Slot Full'
                ) : (
                  buttonLabel
                )}
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default React.memo(SlotList);
