import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SessionStatusModal from './SessionStatusModal'; // Import the modal component
import confirmedImg from '@/assets/Profile-Page/SessionConfirmed.svg';
import failedImg from '@/assets/Profile-Page/PaymentFailed.svg';

const PaymentModal = ({
  userData,
  isClose,
  selectedSlotDetails,
  slotTopic,
}) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [status, setStatus] = useState(); // State to track success/failure
  const email = userData?.email;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        isClose(false);
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
          ref={modalRef}
          className="p-3 bg-[#F5F3FF] flex flex-col max-w-[868px] border-[2px] rounded-[25px]"
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 10 }}
        >
          {/* Conditionally Render Modals */}
          {status === 'success' && (
            <SessionStatusModal
              title="Session Confirmed"
              image={confirmedImg}
              message="Your mentor has been notified about the session."
              buttonText="Redirect to My Session"
              onButtonClick={() =>
                navigate('manage-events')
              }
              isClose={() => setStatus(null)}
              status={status} // Pass status prop
              selectedSlotDetails={selectedSlotDetails} // Pass selectedSlotDetails
              slotTopic={slotTopic}
              email={email} // Pass email
            />
          )}

          {status === 'failed' && (
            <SessionStatusModal
              title="Payment Failed"
              image={failedImg}
              message=""
              buttonText="Redirect to My Session"
              onButtonClick={() =>
                navigate('manage-events')
              }
              isClose={() => setStatus(null)}
              status={status} // Pass status prop
              selectedSlotDetails={selectedSlotDetails} // Pass selectedSlotDetails
              slotTopic={slotTopic}
              email={email} // Pass email
            />
          )}

          {/* Show Buttons Only When No Modal is Selected */}
          {!status && (
            <div className="flex justify-end gap-3 m-3">
              <button
                className="bg-[#F90C10E3] text-white px-4 py-2 rounded-md"
                onClick={() => setStatus('failed')}
              >
                Failed
              </button>
              <button
                className="bg-[#6F00FF] text-white px-4 py-2 rounded-md"
                onClick={() => setStatus('success')}
              >
                Successful
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
