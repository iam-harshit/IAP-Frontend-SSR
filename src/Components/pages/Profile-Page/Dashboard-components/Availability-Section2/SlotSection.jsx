import React from 'react';
import NoSession from './Availability-Components/NoSession';
import TimingSlots from './TimingSlots';
import { useSelector } from 'react-redux';

const SlotSection = ({ date, setChanged, slots = {}, setSlots }) => {
  // const slots = useSelector((state) => state.availability.slots)

  const monthMap = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dev',
  };

  const formatDate = (date) => {
    return (
      date?.split('-')[0] +
      ' ' +
      monthMap[date?.split('-')[1]] +
      ', ' +
      date?.split('-')[2]
    );
  };

  return (
    <>
      <div className="flex justify-between items-center px-2 sm:px-8 mt-8">
        <h1 className="text-[18px] md:text-[23px] lg:text-[28px] text-customPurple font-semibold mt-4">
          Slots for {formatDate(date)}
        </h1>
      </div>
      {slots[date]?.length > 0 ? (
        <TimingSlots
          date={date}
          slots={slots}
          setChanged={setChanged}
          setSlots={setSlots}
        />
      ) : (
        <NoSession />
      )}
    </>
  );
};

export default SlotSection;
