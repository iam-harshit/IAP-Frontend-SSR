import React from 'react';
import Header from '../../common/Header';
import {
  FaTimesCircle,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaRegTimesCircle,
  FaHeadset,
} from 'react-icons/fa';
import Footer from '@/Components/common/Footer';

function CancellationAndRefund() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 h-[45px] xs:h-[55px] xs2:h-[90px] llg:h-[200px] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <h1 className="text-h5 xs2:text-h3  llg:text-h1  font-extrabold text-white">
            Cancellation & Refund Policy
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 py-8">
        <div className="space-y-7 llg:space-y-12">
          {/* Refund Eligibility */}
          <section className="flex items-start space-x-3 l-md:space-x-6">
            <div className="bg-purple-100 p-2 llg:p-4 rounded-xl">
              <FaTimesCircle className="text-purple-600 text-h4 llg:text-h3" />
            </div>
            <div>
              <h2 className="text-h4 llg:text-h3 font-bold text-gray-800 mb-4">
                Refund Eligibility
              </h2>
              <p className="text-gray-600 text-caption l-md:text-p leading-relaxed">
                Refunds are available based on the following conditions:
              </p>
              <ul className="text-caption l-md:text-p list-disc pl-6 mt-3 space-y-2 text-gray-600">
                <li>
                  <span className="font-semibold text-purple-600">
                    Cancellation within 24 Hours of Booking:
                  </span>{' '}
                  You are eligible for a full refund if the session is canceled
                  within 24 hours of booking and before the session starts.
                </li>
                <li>
                  <span className="font-semibold text-purple-600">
                    Cancellation by User:
                  </span>{' '}
                  If you cancel a scheduled session at least 24 hours in advance
                  of the session’s start time, you will receive a full refund.
                  Cancellations made within 24 hours of the session start time
                  are not eligible for a refund.
                </li>
                <li>
                  <span className="font-semibold text-purple-600">
                    No-Show or Late Cancellation:
                  </span>{' '}
                  If you do not attend the scheduled 1:1 session or cancel it
                  within 24 hours of the scheduled start time, no refund will be
                  provided.
                </li>
                <li>
                  <span className="font-semibold text-purple-600">
                    Technical Issues:
                  </span>{' '}
                  If technical difficulties prevent the session from taking
                  place, you are eligible for a full refund. Please contact us
                  within 24 hours after the scheduled session to initiate a
                  refund request.
                </li>
                <li>
                  <span className="font-semibold text-purple-600">
                    Special Considerations:
                  </span>{' '}
                  Refunds based on extenuating circumstances will be reviewed on
                  a case-by-case basis. Please contact us for such requests.
                </li>
              </ul>
            </div>
          </section>

          {/* How to Request a Refund */}
          <section className="flex items-start space-x-3 l-md:space-x-6">
            <div className="bg-blue-100 p-2 llg:p-4 rounded-xl">
              <FaExchangeAlt className="text-blue-600 text-h4 llg:text-h3" />
            </div>
            <div>
              <h2 className="text-h4 llg:text-h3 font-bold text-gray-800 mb-4">
                How to Request a Refund
              </h2>
              <p className="text-gray-600 leading-relaxed text-caption l-md:text-p">
                To request a refund, follow these steps:
              </p>
              <ul className="text-caption l-md:text-p list-disc pl-6 mt-3 space-y-2 text-gray-600">
                <li>
                  Contact our support team via email at{' '}
                  <a
                    href="mailto:support@inspirationapp.org"
                    className="text-blue-600 hover:underline"
                  >
                    support@inspirationapp.org
                  </a>
                  .
                </li>
                <li>
                  Provide the session details, including the mentor's name,
                  session date and time, and the reason for your refund request.
                </li>
                <li>
                  Once approved, your refund will be processed within 5-7
                  business days to the original payment method.
                </li>
              </ul>
            </div>
          </section>

          {/* Non-Refundable Items */}
          <section className="flex items-start space-x-3 l-md:space-x-6">
            <div className="bg-green-100 p-2 llg:p-4 rounded-xl">
              <FaMoneyBillWave className="text-green-600 text-h4 llg:text-h3" />
            </div>
            <div>
              <h2 className="text-h4 llg:text-h3 font-bold text-gray-800 mb-4">
                Refund Exclusions
              </h2>
              <p className="text-gray-600 leading-relaxed text-caption l-md:text-p">
                The following are non-refundable:
              </p>
              <ul className="text-caption l-md:text-p list-disc pl-6 mt-3 space-y-2 text-gray-600">
                <li>Sessions canceled after the 24-hour window.</li>
                <li>
                  Platform or service-related fees such as taxes and payment
                  processing charges.
                </li>
                <li>Sessions that have already been completed or commenced.</li>
              </ul>
            </div>
          </section>

          {/* Late or Missing Refunds */}
          <section className="flex items-start space-x-3 l-md:space-x-6">
            <div className="bg-red-100 p-2 llg:p-4 rounded-xl">
              <FaRegTimesCircle className="text-red-600 text-h4 llg:text-h3" />
            </div>
            <div>
              <h2 className="text-h4 llg:text-h3 font-bold text-gray-800 mb-4">
                Late or Missing Refunds
              </h2>
              <p className="text-gray-600 leading-relaxed text-caption l-md:text-p">
                If you have not received your refund within 7 business days
                after it was processed, please follow these steps:
              </p>
              <ul className="text-caption l-md:text-p list-disc pl-6 mt-3 space-y-2 text-gray-600">
                <li>
                  Check your bank account or payment provider for updates.
                </li>
                <li>
                  If the refund is still missing, please contact us at{' '}
                  <a
                    href="mailto:support@inspirationapp.org"
                    className="text-blue-600 hover:underline"
                  >
                    support@inspirationapp.org
                  </a>
                  .
                </li>
              </ul>
            </div>
          </section>

          {/* Exceptions */}
          <section className="flex items-start space-x-3 l-md:space-x-6">
            <div className="bg-yellow-100 p-2 llg:p-4 rounded-xl">
              <FaRegTimesCircle className="text-yellow-600 text-h4 llg:text-h3" />
            </div>
            <div>
              <h2 className="text-h4 llg:text-h3 font-bold text-gray-800 mb-4">
                Exceptions
              </h2>
              <p className="text-gray-600 leading-relaxed text-caption l-md:text-p">
                Refunds may not be issued in the following cases:
              </p>
              <ul className="text-caption l-md:text-p list-disc pl-6 mt-3 space-y-2 text-gray-600">
                <li>
                  After the cancellation window has passed (i.e., after the
                  24-hour window before the session).
                </li>
                <li>If the session has already been conducted or commenced.</li>
                <li>
                  If the session was missed due to failure to attend without
                  prior notice.
                </li>
              </ul>
            </div>
          </section>

          
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default CancellationAndRefund;
