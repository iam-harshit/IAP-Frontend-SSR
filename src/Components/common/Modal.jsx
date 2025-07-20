import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { handleSubmitSlotRequest } from '@/services/Operations/SlotsOperation/SlotsApi';
import { FaSpinner } from 'react-icons/fa';
import { handleError } from '../../../utils/profileImageFallback';

import linkedinImg from '@/assets/Profile-Page/linkedin-logo.png';
import githubImg from '@/assets/Profile-Page/github.png';
import twitterImg from '@/assets/Profile-Page/twitter.png';
import instagramImg from '@/assets/Profile-Page/instagram.png';
import { MdEmail } from 'react-icons/md';

const Modal = ({ isOpen, closeModal, type, data, currentUser }) => {
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState(data?.profilePicture);

  const [requestData, setRequestData] = useState({
    sessionDate: '',
    sessionTime: '',
    description: '',
    sessionType: '',
    sessionCategory: '',
    slotPrice: '',
  });

  useEffect(() => {
    if (!data?.profilePicture) {
      setImgSrc(
        `https://api.dicebear.com/5.x/initials/svg?seed=${data?.name?.trim().charAt(0)}`
      );
    } else {
      setImgSrc(data?.profilePicture);
    }
  }, [data?.profilePicture]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setRequestData({ ...requestData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      sessionDate,
      sessionTime,
      description,
      sessionType,
      sessionCategory,
      slotPrice,
    } = requestData;

    if (!sessionDate.trim()) return toast.error('Date is required!');
    if (!sessionTime.trim()) return toast.error('Time is required!');
    if (!description.trim()) return toast.error('Description is required!');

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(sessionDate);
    const selectedTime = new Date(`${sessionDate}T${sessionTime}`);

    if (selectedDate < today) return toast.error('Selected date is not valid!');
    if (
      selectedDate.toDateString() === today.toDateString() &&
      selectedTime < new Date()
    )
      return toast.error('Select a valid time!');

    setLoading(true);
    const category =
      requestData.sessionCategory === 'Other'
        ? requestData.customCategory
        : requestData.sessionCategory;
    try {
      const payload = {
        mentorId: data?.mentorDetails?._id,
        preferredDate: sessionDate,
        preferredTime: sessionTime,
        sessionType: sessionType,
        sessionCategory: category,
        question: description,
        slotPrice: Number(slotPrice),
      };

      const response = await handleSubmitSlotRequest(payload);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      toast.success(response?.data?.message);
      closeModal();
    } catch (error) {
      console.error('Error:', error);
      toast.dismiss();
      toast.error(error.message || 'Failed to request slot.');
    } finally {
      setLoading(false);
    }
  };

  const socialIcons = {
    instagram: <img src={instagramImg} className="h-7" alt="Instagram" />,
    twitter: <img src={twitterImg} className="h-6" alt="Twitter" />,
    linkedin: <img src={linkedinImg} className="h-7" alt="LinkedIn" />,
    github: <img src={githubImg} className="h-7" alt="GitHub" />,
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      >
        <motion.div
          className="bg-white w-full mx-3 max-w-md p-6 rounded-lg shadow-lg lg:mt-20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-lg font-semibold uppercase">
              {type === 'profile' ? 'Contact Info' : 'Request a Slot'}
            </h2>
            <button onClick={closeModal} className="text-xl font-bold">
              &times;
            </button>
          </div>

          {type === 'profile' && data && (
            <div className="text-center mt-4">
              <img
                src={
                  imgSrc ??
                  `https://api.dicebear.com/5.x/initials/svg?seed=${data.name.charAt(0)}`
                }
                alt="Profile"
                onError={() => handleError(setImgSrc, data.name.charAt(0))}
                className="w-20 h-20 mx-auto rounded-full shadow-md"
              />
              <p className="tracking-wide text-center mt-2 text-gray-900 text-h4 md:text-h3">
                {data?.name}
              </p>

              <div className="text-sm text-gray-700 space-y-1 flex flex-col xs:flex-row xs:gap-x-4 xs:justify-center items-center">
                {data?.email && (
                  <div className="flex items-center gap-2">
                    <MdEmail className="text-blue-400 text-lg sm:text-xl" />
                    <a
                      href={`mailto:${data?.email}`}
                      className="text-blue-600 hover:underline break-all font-medium sm:text-lg"
                    >
                      {data?.email}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4 mt-3">
                {data?.userProfile?.about?.socialLinks?.map((link) =>
                  link.link ? (
                    <a
                      key={link.platform}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-full shadow-md hover:bg-purple-200 transition"
                    >
                      {socialIcons[link.platform.toLowerCase()] || (
                        <span className="text-gray-500">{link.platform}</span>
                      )}
                    </a>
                  ) : null
                )}
              </div>
            </div>
          )}

          {type === 'request' && (
            <div className="mt-4 max-h-[40vh] sm:max-h-[60vh]  overflow-y-auto scrollbar-hide">
              <label className="block mb-1">Select Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded mt-1"
                name="sessionDate"
                value={requestData.sessionDate}
                onChange={handleChange}
              />

              <label className="block mt-4">Select Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded mt-1"
                name="sessionTime"
                value={requestData.sessionTime}
                onChange={handleChange}
              />

              <label className="block mt-4">Description</label>
              <textarea
                placeholder="Enter details about your request..."
                className="w-full p-2 border rounded mt-1 h-24 resize-none"
                name="description"
                value={requestData.description}
                onChange={handleChange}
              ></textarea>

              <label className="block mt-4">Session Type</label>
              <select
                name="sessionType"
                value={requestData.sessionType}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              >
                <option value="">Select type</option>
                <option value="1-1">1-on-1</option>
                <option value="1-n">1 to Many</option>
                <option value="group">Group Session</option>
                <option value="workshop">Workshop</option>
              </select>

              <label className="block mt-4">Category</label>
              <select
                name="sessionCategory"
                value={requestData.sessionCategory}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Spirituality">Spirituality</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>

              {requestData.sessionCategory === 'Other' && (
                <input
                  type="text"
                  name="customCategory"
                  placeholder="Enter custom category"
                  className="w-full p-2 border rounded mt-2"
                  value={requestData.customCategory || ''}
                  onChange={(e) =>
                    setRequestData({
                      ...requestData,
                      customCategory: e.target.value,
                    })
                  }
                />
              )}

              <label className="block mt-4">Slot Price (₹)</label>
              <input
                type="number"
                name="slotPrice"
                min="0"
                placeholder="Enter price or 0 for free"
                className="w-full p-2 border rounded mt-1"
                value={requestData.slotPrice}
                onChange={handleChange}
              />

              <button
                className="w-full bg-indigo-800 text-white py-2 mt-6 rounded hover:opacity-90 flex items-center justify-center gap-2"
                onClick={handleSubmit}
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
