import React from 'react';
import { format, parseISO } from 'date-fns';
import SessionTypeBadge from './SessionTypeBadge';
import { CiCalendarDate, CiTimer } from 'react-icons/ci';
import { createOrderAndBookSlot } from '@/services/Operations/Razorpay/razorpay';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EventCard = ({ event, status }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  let isAuthenticated = false;
  if (user?.currentUser) {
    let { username } = user.currentUser;
    if (username) {
      isAuthenticated = !!username;
    }
  }
  const {
    sessionTitle,
    sessionDescription,
    sessionType,
    slotPrice,
    hostName,
    startDate,
    endDate,
    startTime,
    endTime,
  } = event;

  const lightColors = [
    '#FFEEEE',
    '#EEFFEE',
    '#EEEEFF',
    '#FFFFEE',
    '#FFEEFF',
    '#EEFFFF',
  ];
  const randomColor =
    lightColors[Math.floor(Math.random() * lightColors.length)];

  const handleProceedToBook = async () => {
    if (isAuthenticated) {
      await createOrderAndBookSlot(event._id);
    } else {
      navigate('/sign-in');
    }
  };
  const temp = true;

  const formattedDate =
    startDate && endDate
      ? startDate === endDate
        ? `${format(parseISO(startDate), 'dd MMM')}`
        : `${format(parseISO(startDate), 'dd MMM')} - ${format(parseISO(endDate), 'dd MMM')}`
      : format(parseISO(startDate), 'dd MMM');

  console.log(`Formatted Date >> ${formattedDate}`);

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(':');
    const timeDate = new Date(2000, 0, 1, Number(hour), Number(minute));
    return format(timeDate, 'h:mm a');
  };

  const formattedTime =
    startTime && endTime
      ? `${formatTime(startTime)} - ${formatTime(endTime)}`
      : startTime;

  return (
    <div
      className="relative w-[295px] md:w-[300px] md:mx-4
      max-h-lg p-4 border rounded-lg flex flex-col flex-wrap items-start justify-start gap-2 shadow-md
      hover:shadow-lg transition-shadow duration-300 bg-white"
    >
      <div
        className="relative rounded-lg px-4 py-2 h-40 w-full"
        style={{ backgroundColor: randomColor }}
      >
        <div className="flex items-center justify-between mb-2">
          <SessionTypeBadge sessionType={sessionType} />
          {/* <div className='-top-2 right-5 text-xs font-semibold -mt-2 -mr-2 border border-neutral-100 rounded-2xl px-4 p-1 bg-amber-200'>{`${event.slotsRemaining} slots left`}</div> */}
        </div>
        <h2 className="text-lg font-bold mb-2 line-clamp-1">{sessionTitle}</h2>
        <p className="text-xs mb-2 line-clamp-2">{sessionDescription}</p>
        <p className="absolute bottom-2 w-full text-xs mt-4 font-bold line-clamp-1 overflow-hidden">{`Hurry! Only ${event.slotsRemaining} ${event.slotsRemaining === 1 ? 'Slot' : 'Slots'} Remaining`}</p>
      </div>
      <div>
        <div className="flex justify-between w-[270px] mb-6 relative">
          <div>
            <div className="flex items-center mb-1 gap-2">
              <CiCalendarDate className="text-xl" />
              <span className="text-xs">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <CiTimer className="text-xl" />
              <span className="text-xs">{formattedTime}</span>
            </div>
          </div>
          <span className="font-semibold text-sm absolute right-3 bottom-1">
            <br />₹{slotPrice}
          </span>
        </div>

        <div className="flex relative w-full justify-between items-center pt-2 border border-t-1 border-b-0 border-l-0 border-r-0 mb-2">
          <span className="text-sm ml-2 font-bold line-clamp-1 max-w-[90%]">{`Host: ${hostName}`}</span>
          <div>
            {status === 'live' && (
              <button
                onClick={() => {}}
                className="right-1 border py-2
                      rounded-full text-white px-4 bg-purple-600
                      text-xs font-medium"
              >
                {temp ? 'Join Now' : 'Book Now'}
              </button>
            )}
            {status === 'upcoming' && (
              <button
                onClick={() =>
                  event.bookedByMe ? () => {} : handleProceedToBook()
                }
                className="text-white border-none
                py-2 px-4 rounded-full text-xs font-medium bg-purple-600"
              >
                {event.bookedByMe ? 'Booked' : 'Book Now'}
              </button>
            )}
            {status === 'completed' && (
              <button
                className="text-black border-none border-gray-700
                py-2 px-4 rounded-full text-xs font-medium bg-gray-200"
              >
                Completed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EventCard);
