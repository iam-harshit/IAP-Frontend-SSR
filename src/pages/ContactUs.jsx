import React, { useEffect, useState } from 'react';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa'; // Import a spinner icon
import SEO from '@/Components/common/SEO';
import { supportEndPoints } from '@/services/BackendApis';
import axios from 'axios';
import ScrollToTop from '@/Components/common/ScrollToTop';
import { handleContactInfo } from '@/services/Operations/contact-operation/contactApi';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [confirmation, setConfirmation] = useState(false);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false)

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const payload = {
        name: `${formData.firstName} ${formData.lastName || ''}`.trim(),
        email: formData.email,
        phoneNumber: formData.phone,
        subject: formData.category,
        message: formData.message,
      };

      const response = await handleContactInfo(payload);

      if (response?.success) {
        setConfirmation(true);
        console.log(response.data.message)
        setTimeout(() => setConfirmation(false), 2000);
        reset();
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      if (error.response?.status === 429) {
        setWarning(true);
        setTimeout(() => setWarning(false), 2000);
      } else {
        console.error(
          'Error submitting form:',
          error.response?.data?.message || error.message
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Technology', 'Spirituality', 'Wellbeing', 'Business'];

  useEffect(()=>{
    setShow(true)
  }, [])

  return (
    <>
      <SEO
        title="Contact Us"
        description="Reach out to the InspirationApp team for inquiries, support, partnerships, or feedback. We're here to help you connect, learn, and grow."
        canonical="https://inspirationapp.org/contact-us"
      />
      {show && <ScrollToTop />}
      <div className="bg-gray-50">
        {/* Confirmation Modal */}
        {confirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
              <p className="text-center text-gray-800">
                Message Sent Successfully
              </p>
              <button
                onClick={() => setConfirmation(false)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Warning Modal */}
        {warning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
              <p className="text-center text-gray-800">
                You have reached the limit of messages you can send
              </p>
              <button
                onClick={() => setWarning(false)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-8 l-md:px-12 llg:px-4 py-8 l-md:py-12 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8 l-md:gap-12">
            {/* Contact Info */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-h5 l-md:text-h4 llg:text-h3 font-bold text-gray-800 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-indigo-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="text-6 l-md:text-5 font-medium text-gray-800">
                        Address
                      </h3>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Sri+Krishnakrupa+Govinapura+3rd+Cross+Tiptur+572201"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 text-caption l-md:text-h6 hover:text-indigo-600 mt-1 block"
                      >
                        Sri Krishnakrupa Govinapura
                        <br />
                        3rd Cross Tiptur 572201
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <FaPhone className="text-indigo-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 text-6 l-md:text-5">
                        Phone
                      </h3>
                      <a
                        href="tel:+919353493539"
                        className="text-gray-600 text-caption l-md:text-h6 hover:text-indigo-600 mt-1 block"
                      >
                        +91 9353493539
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-indigo-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium text-6 l-md:text-5 text-gray-800 ">
                        Email
                      </h3>
                      <a
                        href="mailto:support@cbsecosystem.org"
                        className="text-gray-600 text-caption l-md:text-h6 hover:text-indigo-600 mt-1 block"
                      >
                        support@cbsecosystem.org
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3 bg-white rounded-xl shadow-md p-8">
              <h2 className="text-h5 l-md:text-h4 llg:text-h3 font-bold text-gray-800 mb-6">
                Send us a message
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 l-md:space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 l-md:gap-6">
                  <div>
                    <label className="text-h6 l-md:text-h5 block font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register('firstName', {
                        required: 'First name is required',
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: 'Only alphabets are allowed',
                        },
                      })}
                      className="w-full text-caption l-md:text-h6 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                      placeholder="Your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-h6 l-md:text-h5 font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register('lastName', {
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: 'Only alphabets are allowed',
                        },
                      })}
                      className="w-full text-caption l-md:text-h6 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                      placeholder="Your last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 l-md:gap-6">
                  <div>
                    <label className="block text-h6 l-md:text-h5 font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email address',
                        },
                      })}
                      className="w-full text-caption l-md:text-h6 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-h6 l-md:text-h5 font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Enter a valid 10-digit phone number',
                        },
                      })}
                      className="w-full text-caption l-md:text-h6 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                      placeholder="1234567890"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-h6 l-md:text-h5 font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    {...register('category', {
                      required: 'Please select a category',
                    })}
                    className="w-full text-caption l-md:text-h6 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-h6 l-md:text-h5 font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows="5"
                    {...register('message', {
                      required: 'Message is required',
                    })}
                    className="w-full text-caption l-md:text-h6 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className="w-full bg-customColor text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <FaPaperPlane />
                      <p>Send Message</p>
                      <FaSpinner className="animate-spin" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FaPaperPlane />
                      <p className=" text-h6 l-md:text-h5 ">Send Message</p>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
