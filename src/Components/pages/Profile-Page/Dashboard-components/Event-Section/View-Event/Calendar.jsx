import React, { useState } from 'react';
import './Calendar.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Data for the days of the week
const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Data for the months
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// Helper to get days in a month
function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

// Helper to get color based on category
const getCategoryColor = (category) => {
  const categoryColors = {
    technology: '#ff9500',
    'health & fitness': '#867aff',
    finance: '#ff61ad',
    spiritual: '#00c8c8',
    default: '#867aff',
  };
  return categoryColors[category?.toLowerCase()] || categoryColors.default;
};

export const CalendarSection = ({ tabType = 'booked', events }) => {
  console.log(events);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  // Filter events based on selected month/year and tab type
  const filteredEvents = events.filter((event) => {
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);

    // Check if event falls within selected month/year
    const isInRange =
      (eventStartDate.getMonth() === selectedMonth &&
        eventStartDate.getFullYear() === selectedYear) ||
      (eventEndDate.getMonth() === selectedMonth &&
        eventEndDate.getFullYear() === selectedYear);

    const isMatchingType =
      tabType === 'booked' ? event.isBooked : !event.isBooked;
    return isInRange && isMatchingType;
  });

  // Generate calendar weeks based on filtered events
  const generateCalendarWeeks = () => {
    const weeks = [];
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    let currentWeek = [];
    let currentDate = new Date(firstDay);

    // Helper function to check if an event should appear on a given date
    const getEventsForDate = (date) => {
      return filteredEvents.filter((event) => {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        // Check if the current date falls between start and end dates (inclusive)
        return date >= startDate && date <= endDate;
      });
    };

    // Fill in days before the first of the month
    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      const prevDate = new Date(firstDay);
      prevDate.setDate(prevDate.getDate() - (startDay - i));
      currentWeek.push({
        date: prevDate.getDate(),
        isCurrentMonth: false,
        events: getEventsForDate(prevDate),
      });
    }

    // Fill in days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      const currentDateObj = new Date(selectedYear, selectedMonth, day);
      currentWeek.push({
        date: day,
        isCurrentMonth: true,
        events: getEventsForDate(currentDateObj),
      });
    }

    // Fill in remaining days
    while (currentWeek.length < 7) {
      const nextDate = new Date(lastDay);
      nextDate.setDate(nextDate.getDate() + (currentWeek.length - 6));
      currentWeek.push({
        date: nextDate.getDate(),
        isCurrentMonth: false,
        events: getEventsForDate(nextDate),
      });
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const calendarWeeks = generateCalendarWeeks();

  // Handle month/year navigation
  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  // Generate mini calendar weeks
  const generateMiniCalendarWeeks = () => {
    const weeks = [];
    let week = [];
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    let startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);

    for (let i = 0; i < startOffset; i++) {
      week.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7 || day === daysInMonth) {
        weeks.push(week);
        week = [];
      }
    }

    while (week.length > 0 && week.length < 7) {
      week.push(null);
    }

    return weeks;
  };

  const miniCalendarWeeks = generateMiniCalendarWeeks();

  return (
    <Card className="w-full bg-[#f9f9f9] rounded-[28.83px] border-[0.96px] border-solid border-[#efeff4] overflow-hidden">
      {/* Month selector */}
      <div className="w-full h-[39px] bg-white border-b-[0.96px] border-solid border-[#efeff4]">
        <div className="w-full h-[39px] flex items-center px-4">
          <div className="flex w-full items-center">
            {/* Left year */}
            <div className="flex-1 flex items-center justify-start gap-2">
              <Button
                variant="ghost"
                className="h-[39px] p-1 hover:bg-transparent"
                onClick={handlePrevMonth}
              >
                <span className="text-[#666666] text-sm">‹</span>
              </Button>
              <span className="text-[#666666] font-normal text-[12.5px] font-['Inter']">
                {selectedYear}
              </span>
            </div>

            {/* Months */}
            {months.map((month, index) => (
              <div
                key={month}
                className={`flex-1 h-[39px] flex items-center justify-center px-3 cursor-pointer ${
                  index === selectedMonth ? 'bg-[#867aff33] rounded-md' : ''
                }`}
                onClick={() => setSelectedMonth(index)}
              >
                <span
                  className={`font-${
                    index === selectedMonth ? 'medium' : 'normal'
                  } text-[12.5px] font-['Inter'] ${
                    index === selectedMonth
                      ? 'text-[#867aff]'
                      : 'text-[#666666]'
                  }`}
                >
                  {month}
                </span>
              </div>
            ))}

            {/* Right year */}
            <div className="flex-1 flex items-center justify-end gap-2">
              <span className="text-[#666666] font-normal text-[12.5px] font-['Inter']">
                {selectedYear + 1}
              </span>
              <Button
                variant="ghost"
                className="h-[39px] p-1 hover:bg-transparent"
                onClick={handleNextMonth}
              >
                <span className="text-[#666666] text-sm">›</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Date and mini calendar */}
      <div className="w-full px-[22px] py-6">
        <div className="text-black font-normal text-[23.1px] mb-6 font-['Inter']">
          {new Date(
            selectedYear,
            selectedMonth,
            new Date().getDate()
          ).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>

        {/* Mini calendar weeks */}
        <div
          className="flex flex-row gap-6 overflow-x-auto px-1 mini-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
          onMouseEnter={(e) => (e.currentTarget.style.scrollbarWidth = 'auto')}
          onMouseLeave={(e) => (e.currentTarget.style.scrollbarWidth = 'none')}
        >
          {miniCalendarWeeks.map((weekArr, weekIdx) => (
            <React.Fragment key={weekIdx}>
              <div className="flex flex-col min-w-max">
                <div className="flex gap-4 mb-1">
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                    <div key={day} className="text-center min-w-[23px]">
                      <div className="text-[#8a8a8f] font-normal text-[12.5px] font-['Inter']">
                        {day}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  {weekArr.map((date, idx) => (
                    <div key={idx} className="text-center min-w-[23px]">
                      <div
                        className={`font-normal text-[12.5px] font-['Inter'] ${
                          date === new Date().getDate() &&
                          selectedMonth === new Date().getMonth() &&
                          selectedYear === new Date().getFullYear()
                            ? 'bg-[#00c8c8] text-white rounded-full w-[23px] h-[23px] flex items-center justify-center mx-auto'
                            : date
                              ? 'text-black'
                              : 'text-[#c8c7cc]'
                        }`}
                      >
                        {date || ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {weekIdx < miniCalendarWeeks.length - 1 && (
                <Separator
                  orientation="horizontal"
                  className="w-[2px] h-auto bg-[#c8c7cc] opacity-50 mx-3 self-stretch"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="w-full relative">
        <div className="w-full h-[39px] bg-white border-y-[0.96px] border-solid border-[#efeff4] flex">
          {weekDays.map((day) => (
            <div
              key={day}
              className="flex-1 flex items-center justify-center text-[#666666] font-normal text-[12.5px] font-['Inter'] min-w-0"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="w-full bg-[#f9f9f9] relative">
          <div className="absolute inset-0">
            <div className="flex h-full">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`vline-${index}`}
                  className="flex-1 border-r border-[#c8c7cc] border-opacity-50 last:border-r-0"
                />
              ))}
            </div>

            <div className="absolute inset-0">
              <div className="h-[185px] border-b border-[#c8c7cc] border-opacity-50" />
              <div className="h-[185px] border-b border-[#c8c7cc] border-opacity-50" />
              <div className="h-[183px]" />
            </div>
          </div>

          <div className="relative">
            {calendarWeeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="flex"
                style={{ height: weekIndex === 2 ? '183px' : '185px' }}
              >
                {week.map((day, dayIndex) => (
                  <div key={dayIndex} className="flex-1 relative">
                    <div className="absolute top-2 right-2 text-[#8a8a8f] text-[12.5px] font-normal font-['Inter']">
                      {day.date}
                    </div>

                    <div className="mt-6 space-y-1">
                      {day.events.map((event) => {
                        const startDate = new Date(event.startDate);
                        const endDate = new Date(event.endDate);
                        const currentDate = new Date(
                          selectedYear,
                          selectedMonth,
                          day.date
                        );

                        // Compare full dates instead of just day numbers
                        const isStartDate =
                          currentDate.getTime() ===
                          startDate.setHours(0, 0, 0, 0);
                        const isEndDate =
                          currentDate.getTime() ===
                          endDate.setHours(0, 0, 0, 0);
                        const isInRange =
                          currentDate >= startDate && currentDate <= endDate;

                        if (!isInRange) return null;

                        const eventColor = getCategoryColor(
                          event.sessionCategory
                        );
                        const styles = {
                          backgroundColor: eventColor,
                          borderRadius:
                            isStartDate && isEndDate
                              ? '14px' // Single day event
                              : `${isStartDate ? '14px' : '0'} ${isEndDate ? '14px' : '0'} ${isEndDate ? '14px' : '0'} ${isStartDate ? '14px' : '0'}`, // Multi-day event
                          marginLeft: isStartDate ? '0' : '-8px',
                          marginRight: isEndDate ? '0' : '-8px',
                          paddingLeft: isStartDate ? '12px' : '4px',
                          paddingRight: isEndDate ? '12px' : '4px',
                          width: '100%',
                          zIndex: isStartDate ? 2 : 1, // Add this to ensure proper layering
                          position: 'relative',
                        };

                        return (
                          <div
                            key={event._id}
                            className="relative h-[28px] flex items-center overflow-hidden"
                            style={styles}
                          >
                            <span className="text-[11px] font-normal font-['Inter'] text-black">
                              {event.sessionTitle}
                            </span>
                            {isEndDate && (
                              <img
                                className="absolute w-2 h-1 top-3.5 right-2 opacity-60"
                                alt="Icon"
                                src="/icon.svg"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
