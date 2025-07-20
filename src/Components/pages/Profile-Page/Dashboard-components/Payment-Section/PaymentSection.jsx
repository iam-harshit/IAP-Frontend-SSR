/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import PriceGraph from './PriceGraph';
import PricingTable from './PricingTable';
import { useSelector } from 'react-redux';

const PaymentSection = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isMentor = currentUser?.role === 'mentor';

  return (
    <div>
      {isMentor && (
        <>
          <h1 className="text-[28px] md:text-[28px] lg:text-[33px] text-customPurple font-semibold my-3 ml-6">
            Payments Record
          </h1>
          <PriceGraph />
        </>
      )}
      <h1 className="text-[25px] lg:text-[28px] text-customPurple font-semibold mt-4 -mb-2 ml-6">
        Payments History
      </h1>
      <PricingTable />
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
const MemoizedPaymentSection = memo(PaymentSection);
MemoizedPaymentSection.displayName = 'PaymentSection';

export default MemoizedPaymentSection;
