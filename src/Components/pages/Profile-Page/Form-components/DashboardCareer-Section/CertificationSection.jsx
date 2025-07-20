import React, { useState, useEffect, useRef } from 'react';
import Input from '@/Components/common/Input';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import { FaSpinner } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  FaGraduationCap,
  FaUniversity,
  FaCalendarAlt,
  FaHourglassEnd,
  FaIdBadge,
  FaLink,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const CertificationSection = ({
  formData,
  setFormData,
  certificateFields,
  loading,
  onSubmit,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState('');
  const [certificationList, setCertificationList] = useState(
    formData?.certifications?.length
      ? formData.certifications
      : currentUser?.certifications || []
  );
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const minDate = dayjs('1900-01-01');
  const maxDate = dayjs();

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
      setEditingIndex(null);
      setError('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStartDateChange = (newValue) => {
    const formatted = newValue ? newValue.toISOString() : '';
    if (
      formData.expirationDate &&
      dayjs(formatted).isAfter(dayjs(formData.expirationDate))
    ) {
      setError('Start Date cannot be after End Date!');
    } else {
      setError('');
      setFormData((prev) => ({ ...prev, issueDate: formatted }));
    }
  };

  const handleEndDateChange = (newValue) => {
    const formatted = newValue ? newValue.toISOString() : '';
    if (
      formData.issueDate &&
      dayjs(formatted).isBefore(dayjs(formData.issueDate))
    ) {
      setError('End Date cannot be before Start Date!');
    } else {
      setError('');
      setFormData((prev) => ({ ...prev, expirationDate: formatted }));
    }
  };

  const handleOpenAddModal = () => {
    setEditingIndex(null);
    setFormData({
      certificate_title: '',
      certificate_institution: '',
      credentialsId: '',
      credentialsURL: '',
      issueDate: '',
      expirationDate: '',
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleEditClick = (index) => {
    const certToEdit = certificationList[index];
    setEditingIndex(index);
    setFormData({
      certificate_title: certToEdit.title,
      certificate_institution: certToEdit.institution,
      credentialsId: certToEdit.credentialsId,
      credentialsURL: certToEdit.credentialsURL,
      issueDate: certToEdit.issueDate,
      expirationDate: certToEdit.expirationDate,
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleAddCertification = (e) => {
    e.preventDefault();
    const {
      certificate_title,
      certificate_institution,
      credentialsId,
      credentialsURL,
      issueDate,
      expirationDate,
    } = formData;

    if (
      !certificate_title ||
      !certificate_institution ||
      !issueDate ||
      !expirationDate ||
      !credentialsId ||
      !credentialsURL
    ) {
      setError('Title, Institution,  Credentials and both dates are required.');
      return;
    }

    const newCert = {
      title: certificate_title,
      institution: certificate_institution,
      credentialsId,
      credentialsURL,
      issueDate,
      expirationDate,
    };

    const updatedList = [...certificationList, newCert];
    toast.success('Certification Added');
    setCertificationList(updatedList);
    setFormData((prev) => ({
      ...prev,
      certifications: updatedList,
      certificate_title: '',
      certificate_institution: '',
      credentialsId: '',
      credentialsURL: '',
      issueDate: '',
      expirationDate: '',
    }));
    setIsModalOpen(false);
    setError('');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const {
      certificate_title,
      certificate_institution,
      credentialsId,
      credentialsURL,
      issueDate,
      expirationDate,
    } = formData;

    if (
      !certificate_title ||
      !certificate_institution ||
      !issueDate ||
      !expirationDate ||
      !credentialsId ||
      !credentialsURL
    ) {
      setError('Title, Institution, Credentials and both dates are required.');
      return;
    }

    const updated = [...certificationList];
    updated[editingIndex] = {
      title: certificate_title,
      institution: certificate_institution,
      credentialsId,
      credentialsURL,
      issueDate,
      expirationDate,
    };

    setCertificationList(updated);
    setFormData((prev) => ({
      ...prev,
      certifications: updated,
      certificate_title: '',
      certificate_institution: '',
      credentialsId: '',
      credentialsURL: '',
      issueDate: '',
      expirationDate: '',
    }));
    setEditingIndex(null);
    setIsModalOpen(false);
    toast.success('Certification Updated');
  };

  const handleDelete = (index) => {
    const updated = certificationList.filter((_, i) => i !== index);
    setCertificationList(updated);
    setFormData((prev) => ({ ...prev, certifications: updated }));
    toast.success('Certification Deleted');
  };

  return (
    <div className="flex flex-col gap-6 px-2 ">
      <div className="w-full">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-h2 lg:text-h2 leading-tight text-customPurple">
            Certification Details
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white"
            >
              Add
            </button>
            {certificationList.length > 0 && (
              <button
                type="button"
                onClick={onSubmit}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-5 py-2 rounded text-white font-semibold shadow-md bg-[#6C29CD] hover:bg-[#4e2cd6] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <p>Update</p>
                    <FaSpinner className="animate-spin" />
                  </>
                ) : (
                  <p>Update</p>
                )}
              </button>
            )}
          </div>
        </div>

        {certificationList.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
            <img
              src="https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-485.jpg"
              alt="No results"
              className="w-full max-w-xs mx-auto"
            />
            <h3 className="text-xl font-semibold text-gray-600">
              No certifications added
            </h3>
            <p className="text-gray-500">
              You haven't added any certifications yet. Click "Add" to get
              started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 px-4 sm:px-6 py-6 w-full max-w-7xl mx-auto">
            {certificationList.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative bg-white overflow-hidden rounded-2xl shadow-lg p-6 flex flex-col justify-between min-w-0 transition-all"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                  <svg
                    className="absolute right-0 bottom-0 w-40 h-40"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <defs>
                      <pattern
                        id="triangles"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path d="M 0 20 L 20 0 L 20 20 Z" fill="#A78BFA" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#triangles)" />
                  </svg>
                </div>

                {/* Header Icon */}
                <div className="z-10 w-12 h-12 mb-5 bg-purple-100 text-purple-600 flex items-center justify-center rounded-xl shadow-sm">
                  <FaGraduationCap className="text-xl" />
                </div>

                {/* Card Content */}
                <div className="z-10 flex-1">
                  <ul className="space-y-3 text-sm text-gray-700 break-words">
                    <li className="flex items-start gap-2">
                      <FaGraduationCap className="mt-1 text-gray-400" />
                      <span>
                        <strong>Title:</strong> {cert.title}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaUniversity className="mt-1 text-gray-400" />
                      <span>
                        <strong>Institution:</strong> {cert.institution}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCalendarAlt className="mt-1 text-gray-400" />
                      <span>
                        <strong>Issued:</strong>{' '}
                        {dayjs(cert.issueDate).format('DD MMM YYYY')}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaHourglassEnd className="mt-1 text-gray-400" />
                      <span>
                        <strong>Expires:</strong>{' '}
                        {dayjs(cert.expirationDate).format('DD MMM YYYY')}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaIdBadge className="mt-1 text-gray-400" />
                      <span>
                        <strong>ID:</strong> {cert.credentialsId}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaLink className="mt-1 text-gray-400" />
                      <span className="break-all">
                        <strong>URL:</strong>{' '}
                        <a
                          href={cert.credentialsURL}
                          className="text-purple-600 underline hover:text-purple-800 transition"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {cert.credentialsURL}
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="z-10 flex items-center gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEditClick(idx)}
                    className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition"
                    title="Edit"
                  >
                    <FaEdit />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(idx)}
                    className="p-2 rounded-full bg-red-100 text-purple-600 hover:bg-red-200 transition"
                    title="Delete"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-2 z-[110]"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className="bg-white w-full max-w-lg max-h-[90vh] rounded-lg shadow-xl overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-purple-700 mb-4">
              {editingIndex !== null ? 'Edit' : 'Add Certification'}
            </h2>
            <form
              onSubmit={
                editingIndex !== null ? handleSaveEdit : handleAddCertification
              }
              className="space-y-4"
            >
              {certificateFields.map((field, index) => (
                <Input
                  key={index}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                />
              ))}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box display="grid" gap={2}>
                  <DatePicker
                    label="Start Date"
                    value={
                      formData.issueDate ? dayjs(formData.issueDate) : null
                    }
                    onChange={handleStartDateChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    slotProps={{
                      textField: {
                        inputProps: { readOnly: true },
                        fullWidth: true,
                      },
                    }}
                  />
                  <DatePicker
                    label="End Date"
                    value={
                      formData.expirationDate
                        ? dayjs(formData.expirationDate)
                        : null
                    }
                    onChange={handleEndDateChange}
                    minDate={
                      formData.issueDate ? dayjs(formData.issueDate) : minDate
                    }
                    maxDate={maxDate}
                    slotProps={{
                      textField: {
                        inputProps: { readOnly: true },
                        fullWidth: true,
                      },
                    }}
                  />
                </Box>
              </LocalizationProvider>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
                >
                  {editingIndex !== null ? 'Save Changes' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingIndex(null);
                    setError('');
                  }}
                  className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationSection;
