import React from 'react';
import Header from '@/Components/common/Header';
import {
  FaShippingFast,
  FaTruck,
  FaBoxOpen,
  FaClock,
  FaInfoCircle,
} from 'react-icons/fa';

function ShippingAndDelivery() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="flex bg-black justify-center items-center h-[400px] shadow-md">
        <h1 className="text-6xl font-extrabold text-white text-center">
          Shipping & Delivery
        </h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-5xl p-10 mt-10 bg-white shadow-lg rounded-2xl">
        {/* Shipping Policy Section */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Shipping Policy
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed text-center mb-4">
          At Curious Business Solutions, we prioritize fast, secure, and
          reliable shipping to ensure your orders reach you in perfect
          condition.
        </p>

        <div className="space-y-8">
          {/* Section 1: Shipping Methods */}
          <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
              <FaTruck className="mr-2 text-blue-600" /> Shipping Methods
            </h2>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>
                <strong>Standard Shipping:</strong> 5-7 business days
              </li>
              <li>
                <strong>Express Shipping:</strong> 2-3 business days
              </li>
              <li>
                <strong>Overnight Shipping:</strong> 1 business day
              </li>
            </ul>
            <p className="text-gray-600 mt-3">
              Choose the best option that suits your needs at checkout. Please
              note that delivery times may vary based on location.
            </p>
          </section>

          {/* Section 2: Shipping Costs */}
          <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
              <FaBoxOpen className="mr-2 text-green-600" /> Shipping Costs
            </h2>
            <p className="text-gray-600 mt-3">
              Shipping costs are calculated at checkout based on your order's
              weight and selected shipping method. We also offer **FREE
              SHIPPING** for orders over **$50**.
            </p>
          </section>

          {/* Section 3: Order Processing */}
          <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
              <FaClock className="mr-2 text-yellow-600" /> Order Processing
            </h2>
            <p className="text-gray-600 mt-3">
              Orders are processed within **1-2 business days**. Once shipped,
              you will receive an email confirmation with a tracking number to
              monitor your order's journey.
            </p>
          </section>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 my-10" />

        {/* Delivery Policy Section */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Delivery Policy
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed text-center">
          We work with trusted shipping carriers to ensure **safe and timely
          delivery** of your orders.
        </p>

        <div className="space-y-8 mt-6">
          {/* Section 1: Delivery Times */}
          <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
              <FaShippingFast className="mr-2 text-red-600" /> Delivery Times
            </h2>
            <p className="text-gray-600 mt-3">
              While we strive for prompt delivery, factors like weather,
              holidays, and carrier delays may affect your delivery date. If
              your package is delayed, please reach out to us.
            </p>
          </section>

          {/* Section 2: Tracking Your Order */}
          <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
              <FaInfoCircle className="mr-2 text-purple-600" /> Tracking Your
              Order
            </h2>
            <p className="text-gray-600 mt-3">
              Once shipped, you will receive an email with a **tracking number**
              to monitor your order's journey in real time.
            </p>
          </section>

          {/* Section 3: Contact Us */}
          <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
              📞 Contact Us
            </h2>
            <p className="text-gray-600 mt-3">
              If you have any questions, feel free to reach out to our support
              team at:
              <br />
              <a
                href="mailto:support@curiousbusinesssolutions.com"
                className="text-blue-600 font-semibold"
              >
                support@curiousbusinesssolutions.com
              </a>
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-12 py-4 text-gray-500">
        © 2024 Curious Business Solutions. All rights reserved.
      </footer>
    </div>
  );
}

export default ShippingAndDelivery;
