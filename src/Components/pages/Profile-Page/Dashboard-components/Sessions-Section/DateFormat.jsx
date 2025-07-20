export const formatFullDate = (isoDate, isotime) => {
  const date = new Date(isoDate);
  const weekday = date.toLocaleString('en-US', { weekday: 'long' });
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const time = isotime?.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return `${weekday} ${month} ${day}, ${time}`;
};

export const formatMonthAndDay = (isoDate) => {
  const date = new Date(isoDate);
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // Month in uppercase
  const day = String(date.getDate()).padStart(2, '0'); // Ensure day has two digits (e.g., "01", "05")
  return (
    <div className="flex flex-col items-center">
      {/* Month */}
      <div className="text-[#505050] font-medium w-[62.99px] h-[17.36px] text-[13px] leading-[19px] text-center ">
        {month}
      </div>

      {/* Day */}
      <div className="text-[#505050] font-semibold w-[62.99px] h-[17.36px] text-[24px] leading-[28px] text-center ">
        {day}
      </div>
    </div>
  ); // Returns in "MONTH DAY" format (e.g., "MAY 01", "DEC 05")
};
