import React, { useState } from 'react';

const plans = [
  {
    month: '1 Month',
    price: '₹800',
    features: [
      '1x Sessions Per Week',
      'Only 5 Days per week Chat with Mentor',
      '15 Job Referrals per month',
    ],
  },
  {
    month: '6 Months',
    price: '₹600',
    features: [
      '3x Sessions Per Week',
      'Unlimited Chat with Mentor',
      '30 Job Referrals per month',
    ],
  },
  {
    month: '12 Months',
    price: '₹400',
    features: [
      '4x Sessions Per Week',
      'Unlimited Chat with Mentor',
      '60 Job Referrals per month',
    ],
  },
];

const MonthSelection = ({ onSelectPlan }) => {
  const [selectedButton, setSelectedButton] = useState('1 Month');

  const handlePlanSelect = (plan) => {
    setSelectedButton(plan.month);
    onSelectPlan(plan);
  };

  return (
    <div className="flex bg-white">
      {plans.map((plan) => (
        <button
          key={plan.month}
          type="button"
          className={`flex grow items-center justify-center border-y border-[#eceef3] py-3 text-xs font-semibold duration-200 first:rounded-l-lg last:rounded-r-lg odd:border-x border-b-4 ${
            selectedButton === plan.month
              ? 'border-b-[#6F00FF] text-[#6F00FF]'
              : 'text-black'
          }`}
          onClick={() => handlePlanSelect(plan)}
        >
          {plan.month}
        </button>
      ))}
    </div>
  );
};

export default MonthSelection;
