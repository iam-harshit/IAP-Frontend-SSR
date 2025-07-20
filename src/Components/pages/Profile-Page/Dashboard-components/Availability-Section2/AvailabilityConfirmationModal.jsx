import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO, parse } from 'date-fns';
// import CalendarIcon from './assets/Profile-Page/SlotsCalendarIcon.svg'
import CalendarIcon from '../../../../../assets/Profile-Page/SlotsCalendarIcon.svg';
import ClockIcon from '../../../../../assets/Profile-Page/SlotsClockIcon.svg';
import CalendarIcon2 from '../../../../../assets/Profile-Page/SlotsCalendarIcon2.svg';
import Session from '../../../../../assets/Profile-Page/Session.svg';
import TimingSlots from './TimingSlots';
import { useDispatch } from 'react-redux';
import { setSlots } from '../../../../../Reducers/availabilitySlice';
import { handleCreateSlots } from '../../../../../services/Operations/SlotsOperation/SlotsApi';
// import PaymentModal from './PaymentModal'
// import { handleBookSlots } from '../../../../services/Operations/SlotsOperation/SlotsApi'
// import { bookSlot } from '../../../../services/Operations/Razorpay/razorpay'

const AvailabilityConfirmationModal = ({
  isSlotClose,
  date,
  slots,
  setAvailabilityModalOpen,
  setChanged,
}) => {
  const modalRef = useRef(null);
  const [paymentVisible, setPaymentVisible] = useState(false);

  const dispatch = useDispatch();

  // console.log("date", date);

  const handleSlotSubmission = async () => {
    const formData = {
      date: date,
      showOnProfile: true,
      slots: slots[date] || [],
    };
    await handleCreateSlots(formData);
    setAvailabilityModalOpen(false);
    dispatch(setSlots(slots));
    setChanged(false);
  };

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
          className="p-3 bg-[#F5F3FF] flex flex-col max-w-[900px] border-[2px] rounded-[25px]"
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 10 }}
        >
          <div className="flex justify-center gap-5 pl-5 pt-2">
            <div className="flex flex-col gap-3 w-[60%]">
              <h1 className="font-semibold text-[30px] text-[#5C3FD4] mb-2">
                There are some unconfirmed slots
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
                  {date}
                </span>
              </div>

              <TimingSlots date={date} slots={slots} availabilityModal={true} />
            </div>

            <div className=" flex flex-col justify-between w-[40%]">
              <div className="mt-[30px]">
                <img
                  src={Session}
                  alt="Session"
                  className="w-[260px] h-[260px]"
                />
              </div>

              <div className="flex justify-end gap-3 mr-5 mb-6">
                <button
                  className="bg-[#F90C10E3] text-white px-4 py-2 rounded-md"
                  onClick={() => setAvailabilityModalOpen(false)}
                >
                  Edit slots
                </button>
                <button
                  className="bg-[#6F00FF] text-white px-4 py-2 rounded-md"
                  onClick={() => handleSlotSubmission()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AvailabilityConfirmationModal;
