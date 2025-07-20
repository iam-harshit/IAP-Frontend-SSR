import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO, parse } from 'date-fns';
import CalendarIcon from '@/assets/Profile-Page/SlotsCalendarIcon.svg';
import ClockIcon from '@/assets/Profile-Page/SlotsClockIcon.svg';
import CalendarIcon2 from '@/assets/Profile-Page/SlotsCalendarIcon2.svg';
import Session from '@/assets/Profile-Page/Session.svg';
import PaymentModal from './PaymentModal';
import { bookSlot } from '@/services/Operations/Razorpay/razorpay';
import { useNavigate } from 'react-router-dom';

const SlotModal = ({ userData, isSlotClose, selectedSlotDetails }) => {
  const { selectedDay } = selectedSlotDetails;
  const modalRef = useRef(null);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [slotTopic, setSlotTopic] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling when modal opens
    document.body.style.overflow = 'hidden';

    const handleClickOutside = (event) => {
      // If PaymentModal is open, do NOT close SlotModal
      if (paymentVisible) return;

      if (modalRef.current && !modalRef.current.contains(event.target)) {
        isSlotClose(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup: Re-enable scrolling when modal closes
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSlotClose, paymentVisible]);

  const formattedDate = format(
    parseISO(selectedSlotDetails.selectedDay),
    'EEEE MMM dd yyyy'
  );
  // Split the selectedTime into start and end times
  const [startTime, endTime] = selectedSlotDetails.selectedTime.split(' - ');

  // Format the times to 12-hour format with AM/PM
  const formattedTime = `${format(parseISO(`2025-01-01T${startTime}`), 'hh:mm a')} - ${format(parseISO(`2025-01-01T${endTime}`), 'hh:mm a')}`;

  const formatTimeRange = (startTime, endTime) => {
    const parsedStartTime = parse(startTime, 'HH:mm', new Date());
    const parsedEndTime = parse(endTime, 'HH:mm', new Date());

    return `${format(parsedStartTime, 'HH:mm:ss')} - ${format(parsedEndTime, 'HH:mm:ss')}`;
  };
  const formattedTimeForApi = formatTimeRange(startTime, endTime);

  const maxTopicWords = 3;
  const maxDescriptionWords = 20;

  // Function to handle word limit
  const handleInputChange = (e, setter, maxWords) => {
    const words = e.target.value.split(/\s+/).filter(Boolean); // Removes empty strings properly
    if (words.length <= maxWords) {
      setter(e.target.value);
    }
  };

  const handleProceed = async () => {
    const username = userData?.userName;
    const formData = {
      sessionName: slotTopic,
      sessionDate: selectedDay,
      sessionTime: formattedTimeForApi,
      sessionDescription: description,
    };

    await bookSlot(username, formData, navigate);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          className="p-3 bg-[#F5F3FF] flex flex-col md:w-[700px] max-w-[900px] border-[2px] rounded-[25px]"
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 10 }}
        >
          <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-5 pl-5 pt-2">
            <div className="flex flex-col gap-3">
              <h1 className="font-semibold text-[30px] text-[#5C3FD4] mb-2">
                Choose your session preferences
              </h1>

              <div className="flex items-center gap-4">
                <div className="relative -mt-2">
                  <img
                    src={CalendarIcon2}
                    alt="Calendar"
                    className="w-[25px] h-[8.75px]"
                  />
                  <img
                    src={CalendarIcon}
                    alt="Calendar"
                    className="w-[25px] h-[29px] absolute -top-1 left-0"
                  />
                </div>
                <span className="font-semibold text-[17px] text-[#000000] mr-5">
                  {formattedDate}
                </span>
                <div className="w-[80px] h-[30px] rounded-3xl border bg-[#F4E8FE] border-[#6956E5] flex items-center justify-center">
                  <span className="font-semibold text-[16px] text-[#000000]">
                    1:1
                  </span>
                </div>
              </div>

              <div className="flex items-center mt-2 gap-3">
                <img
                  src={ClockIcon}
                  alt="Clock"
                  className="w-[28px] h-[28px]"
                />
                <span className="font-semibold text-[17px] text-[#000000]">
                  {formattedTime} IST
                </span>
              </div>

              <p className="mt-2 font-semibold text-[16px] text-[#404040]">
                Preferences for session:
              </p>
              {/* Topic Input */}
              <div>
                <label
                  htmlFor="topic"
                  className="block text-[15px] leading-[17px] font-semibold text-[#404040] mb-2"
                >
                  Topic:
                </label>
                <input
                  id="topic"
                  type="text"
                  className="rounded-[3px] h-[28px] w-full bg-[#FEFEFE] border-[2px] border-[#E8EAEF]
                        placeholder:text-[10px] placeholder:leading-[11.5px] placeholder:text-[#B0B4BE] placeholder:font-semibold p-3 "
                  placeholder="Describe the Agenda of session in less than 3 words (e.g., Placement preparation)"
                  value={slotTopic}
                  onChange={(e) =>
                    handleInputChange(e, setSlotTopic, maxTopicWords)
                  }
                />
              </div>

              {/* Description Input */}
              <div className="mb-2">
                <label
                  htmlFor="description"
                  className="block text-[15px] leading-[17px] font-semibold text-[#404040] mb-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  className="rounded-[3px] w-full bg-[#FEFEFE] border-[2px] border-[#E8EAEF]
                      placeholder:text-[10px] placeholder:leading-[11.5px] placeholder:text-[#B0B4BE] placeholder:font-semibold placeholder:pt-2 pl-2 "
                  placeholder="Enter a brief description regarding the agenda mentioned above in around 20 words."
                  value={description}
                  onChange={(e) =>
                    handleInputChange(e, setDescription, maxDescriptionWords)
                  }
                  rows={3}
                />
              </div>
            </div>

            <div className=" flex flex-col justify-between ">
              <div className="mt-[30px] hidden md:block">
                <img
                  src={Session}
                  alt="Session"
                  className="w-[260px] h-[260px]"
                />
              </div>

              <div className="flex justify-end gap-3 mr-5 mb-6">
                <button
                  className="bg-[#F90C10E3] text-white px-4 py-2 rounded-md"
                  onClick={() => isSlotClose(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#6F00FF] text-white px-4 py-2 rounded-md"
                  onClick={() => handleProceed()}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Payment Modal */}
      <AnimatePresence>
        {paymentVisible && (
          <PaymentModal
            isClose={setPaymentVisible}
            selectedSlotDetails={selectedSlotDetails}
            slotTopic={slotTopic}
            userData={userData}
          />
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default SlotModal;
