import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import {
  handlePaymentHistoryMentee,
  handlePaymentHistoryMentor,
} from '../../../../../services/Operations/PaymentOperation/PaymentApi';

// Extracted StatusIcon component for better reusability and performance
const StatusIcon = memo(({ status }) => {
  if (status === 'Successful') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 sm:h-4 sm:w-4 text-green-700"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  
  if (status === 'Pending') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-700"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v5a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V5z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  
  if (status === 'Failed') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 sm:h-4 sm:w-4 text-red-700"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2.293-7.293a1 1 0 011.414-1.414L10 10.586l1.293-1.293a1 1 0 011.414 1.414L11.414 12l1.293 1.293a1 1 0 01-1.414 1.414L10 13.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 12l-1.293-1.293z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  
  return null;
});

StatusIcon.displayName = 'StatusIcon';

// Badge component
const PlanBadge = memo(() => (
  <div className="w-[46px] h-[21px] rounded-3xl border-[1px] bg-[#F4E8FE] border-[#DFC5F8] flex items-center justify-center">
    <span className="tracking-widest font-semibold text-[8px] xs:text-[10px] leading-[12.1px] text-black text-center">
      1:1
    </span>
  </div>
));

PlanBadge.displayName = 'PlanBadge';

const PricingTable = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [visibleRows, setVisibleRows] = useState(6);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  const fetchPaymentHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response =
        currentUser?.role === 'mentor'
          ? await handlePaymentHistoryMentor()
          : await handlePaymentHistoryMentee();

      if (response?.data?.data) {
        setPaymentData(response.data.data);
      } else {
        console.error('Invalid API Response:', response);
      }
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
    setLoading(false);
  }, [currentUser?.role]);

  useEffect(() => {
    fetchPaymentHistory();
  }, [fetchPaymentHistory]);

  const handleSort = useCallback((key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedArray = [...paymentData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setPaymentData(sortedArray);
    setSortConfig({ key, direction });
  }, [paymentData, sortConfig]);

  const getSortIcon = useCallback((key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  }, [sortConfig]);

  const loadMoreRows = useCallback(() => {
    setVisibleRows((prev) => prev + 6);
  }, []);

  // Memoize the visible payment data to prevent unnecessary recalculations
  const visiblePaymentData = useMemo(() => {
    return paymentData.slice(0, visibleRows);
  }, [paymentData, visibleRows]);

  // Render card-style display for mobile
  const renderMobileView = useCallback(() => {
    return (
      <div className="md:hidden">
        {visiblePaymentData.map((item, idx) => (
          <div key={idx} className="bg-gray-50 mb-4 p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-medium">Full Name</span>
              <span className="font-medium">{item.fullName}</span>
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-medium">Amount</span>
              <span>{item.amount}</span>
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-medium">Billing Date</span>
              <span>{new Date(item.billingDate).toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-medium">Plan</span>
              <div className="inline-flex justify-center">
                <PlanBadge />
              </div>
            </div>

            {currentUser?.role === 'mentee' && (
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Payment Status
                </span>
                <div
                  className={`inline-flex items-center justify-center gap-1 text-xs font-medium rounded-full px-2 py-1 ${
                    item.paymentStatus === 'Successful'
                      ? 'bg-green-100 text-green-700 border border-green-600'
                      : item.paymentStatus === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-600'
                        : 'bg-red-100 text-red-700 border border-red-600'
                  }`}
                >
                  <StatusIcon status={item.paymentStatus} />
                  {item.paymentStatus}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }, [visiblePaymentData, currentUser?.role]);

  // Render table for desktop
  const renderDesktopView = useCallback(() => {
    return (
      <div className="hidden md:block">
        <div className="max-h-[400px] overflow-y-auto rounded">
          <table className="w-full border-collapse bg-gray-100 rounded min-w-[640px]">
            <thead className="bg-gray-200">
              <tr className="border-b border-gray-300">
                <th
                  className="text-left px-4 py-3 text-sm lg:text-base font-semibold cursor-pointer"
                  onClick={() => handleSort('fullName')}
                >
                  Full Name {getSortIcon('fullName')}
                </th>
                <th
                  className="text-center px-4 py-3 text-sm lg:text-base font-semibold cursor-pointer"
                  onClick={() => handleSort('amount')}
                >
                  Amount {getSortIcon('amount')}
                </th>
                <th
                  className="text-center px-4 py-3 text-sm lg:text-base font-semibold cursor-pointer"
                  onClick={() => handleSort('billingDate')}
                >
                  Billing Date {getSortIcon('billingDate')}
                </th>
                <th className="text-center px-4 py-3 text-sm lg:text-base font-semibold">
                  Plan
                </th>
                {currentUser?.role === 'mentee' && (
                  <th
                    className="text-center px-4 py-3 text-sm lg:text-base font-semibold cursor-pointer"
                    onClick={() => handleSort('paymentStatus')}
                  >
                    Payment Status {getSortIcon('paymentStatus')}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {visiblePaymentData.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="text-left px-4 py-3 text-xs sm:text-sm">
                    {item.fullName}
                  </td>
                  <td className="text-center px-4 py-3 text-xs sm:text-sm">
                    {item.amount}
                  </td>
                  <td className="text-center px-4 py-3 text-xs sm:text-sm">
                    {new Date(item.billingDate).toLocaleDateString()}
                  </td>

                  <td className="text-center px-4 py-3 text-xs sm:text-sm">
                    <div className="inline-flex justify-center w-full">
                      <PlanBadge />
                    </div>
                  </td>

                  {currentUser?.role === 'mentee' && (
                    <td className="text-center px-4 py-3 text-xs sm:text-sm">
                      <div
                        className={`mx-auto border flex items-center justify-center gap-1 text-xs font-medium rounded-full px-2 py-1 w-fit ${
                          item.paymentStatus === 'Successful'
                            ? 'bg-green-100 text-green-700 border-green-600'
                            : item.paymentStatus === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700 border-yellow-600'
                              : 'bg-red-100 text-red-700 border-red-600'
                        }`}
                      >
                        <StatusIcon status={item.paymentStatus} />
                        {item.paymentStatus}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }, [visiblePaymentData, currentUser?.role, handleSort, getSortIcon]);

  return (
    <div className="py-4 mt-1 mb-4 px-4">
      {loading ? (
        <p>Loading...</p>
      ) : paymentData.length === 0 ? (
        <p>No payment history available.</p>
      ) : (
        <>
          {renderDesktopView()}
          {renderMobileView()}
        </>
      )}

      {visibleRows < paymentData.length && (
        <div className="text-center py-4">
          <button
            onClick={loadMoreRows}
            className="px-4 py-2 bg-purple-100 text-purple-700 font-medium rounded shadow hover:bg-purple-200 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
const MemoizedPricingTable = memo(PricingTable);
MemoizedPricingTable.displayName = 'PricingTable';

export default MemoizedPricingTable;
