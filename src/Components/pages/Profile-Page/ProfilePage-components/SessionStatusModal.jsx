import { format, parse } from 'date-fns';
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClockIcon from '@/assets/Profile-Page/SessionClock.svg';
import CancelIcon from '@/assets/Profile-Page/Cancel.svg';

const SessionStatusModal = ({
  title,
  image,
  message,
  buttonText,
  onButtonClick,
  isClose = () => {}, // Default function to prevent errors
  status, // Receive the status prop
  selectedSlotDetails,
  slotTopic,
  reason,
  email,
  role,
}) => {
  const modalRef = useRef(null);
  const formattedDate = format(
    new Date(selectedSlotDetails.selectedDay),
    'MMMM d, yyyy'
  );

  const [startTime, endTime] = selectedSlotDetails.selectedTime.split(' - ');
  const formattedTime = `${format(parse(startTime, 'HH:mm', new Date()), 'h:mm a')} - ${format(parse(endTime, 'HH:mm', new Date()), 'h:mm a')}`;
  // Conditional styles for the status image
  const imageSize =
    status === 'failed'
      ? 'w-[384px] h-[226px] -mb-2'
      : 'w-[156px] h-[156px] mb-3';

  const titleColor =
    status === 'cancelled'
      ? 'text-[#2A2B33]   text-[20px] '
      : 'text-[#5C3FD4]';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        isClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef} // Add ref here to detect outside clicks
          className="p-6 bg-white flex flex-col items-center w-full sm:w-[570px] rounded-2xl shadow-lg"
          initial={{ y: '-50%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-50%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 10 }}
        >
          {/* Close Button */}
          <button
            className="self-end text-gray-500 hover:text-gray-700"
            onClick={isClose}
          >
            <img src={CancelIcon} alt="cancel" className="w-[13px] h-[13px]" />
          </button>

          {/* Title */}
          <h2
            className={`${titleColor} text-[28px] font-semibold leading-[34px]`}
          >
            {title}
          </h2>

          {/* Status Image with conditional styles */}
          <img src={image} alt="status" className={`${imageSize} mt-3`} />

          {/* Message */}
          {message && (
            <p className="text-center w-fit sm:w-[520px] text-[18px] font-semibold leading-[28px] text-[#636269]">
              {message}
            </p>
          )}

          {/* Session Details */}
          <div
            className={`bg-gray-50 pt-2 mt-4 rounded-lg w-[490px] text-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${status === 'cancelled' ? 'pb-3' : 'pb-5'}`}
          >
            <h3 className="font-semibold text-[#58585D] text-[20px] leading-[29px] text-center  ">
              {status === 'cancelled'
                ? 'Cancelled Session Details'
                : 'Session Details'}
            </h3>
            {status === 'cancelled' ? null : (
              <div className="border-[1px] w-[184px] border-[#DFC5F8] mx-auto"></div>
            )}
            <div className="flex items-center justify-center gap-3 mt-3">
              <img src={ClockIcon} alt="Clock" className="w-[17px] h-[17px]" />
              <span className="text-[#65646B] text-[17px] leading-[25px] font-semibold -mt-1">
                {formattedDate}, {formattedTime}
              </span>
              {status === 'cancelled' ? null : (
                <div className="w-[55px] h-[19px] rounded-3xl border-[1px] bg-[#F4E8FE] border-[#6956E5] flex items-center justify-center">
                  <span className="font-semibold text-[12px] leading-[14px] text-[#000000]">
                    1:1
                  </span>
                </div>
              )}
            </div>
            <p className="text-[15px] font-semibold leading-[23px] text-[#69676E] my-2">
              <strong className="text-[15px] font-semibold leading-[23px] text-[#4C4C51]">
                Topic:
              </strong>{' '}
              {slotTopic || 'No topic selected'}
            </p>
            <p className="text-[16px] font-semibold leading-[25px] text-[#6B6A71] ">
              <strong className="text-[17px] font-semibold leading-[26px] text-[#46464D]">
                {role === 'mentee' ? 'Mentor' : 'Mentee'}:
              </strong>{' '}
              {email || 'xyz@gmail.com'}
            </p>

            {reason && (
              <p className="text-[15px] font-semibold leading-[23px] text-[#69676E] my-2">
                <strong className="text-[15px] font-semibold leading-[23px] text-[#4C4C51]">
                  Reason:
                </strong>{' '}
                {reason}
              </p>
            )}
          </div>

          {/* Action Button */}
          <button
            className="mt-4 bg-[#6F00FF] w-full text-[#FEFCFF] text-[17px] leading-[20px] font-semibold  py-[10px] rounded-[10px] hover:bg-[#5800cc] transition"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SessionStatusModal;
