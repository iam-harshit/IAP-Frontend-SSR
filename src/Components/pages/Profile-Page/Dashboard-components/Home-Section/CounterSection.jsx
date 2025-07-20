import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

const CounterSection = ({ nextSessionRes, role, fetchNextSession }) => {
  const session = nextSessionRes[0];
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const upcomingSessionTime = {
    date: format(parseISO(session.sessionDate), 'dd/MM/yyyy'), // Convert to DD/MM/YYYY
    time: format(
      parseISO(`${session.sessionDate}T${session.sessionTime}`),
      'hh:mm a'
    ),
  };
  useEffect(() => {
    let hasFetchedNextSession = false
    const parseDateTime = (date, time) => {
      if (!date || !time) return null;

      const formattedDate = date.split('/').reverse().join('-');
      const [hourPart, minutePart] = time.split(':');
      const minutes = minutePart.slice(0, 2);
      const isPM = time.includes('PM');

      let hours = parseInt(hourPart, 10);
      hours =
        isPM && hours !== 12 ? hours + 12 : !isPM && hours === 12 ? 0 : hours;

      const formattedTime = `${String(hours).padStart(2, '0')}:${minutes}`;
      return new Date(`${formattedDate}T${formattedTime}`);
    };

    const sessionStart = parseDateTime(
      upcomingSessionTime.date,
      upcomingSessionTime.time
    );
    if (!sessionStart) return;

    const sessionEnd = new Date(sessionStart.getTime() + 60 * 60 * 1000);

    const calculateTimeLeft = () => {
      const now = new Date();

      if (now >= sessionStart && now <= sessionEnd) {
        //CASE-01 : Session ongoing
        setHasStarted(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else if (now < sessionStart) {
        //CASE-02 : Session not started yet
        const difference = sessionStart - now;
        setHasStarted(false);
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        //CASE-02 : Session Over
        setHasStarted(false)
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        if (!hasFetchedNextSession && fetchNextSession) {
          hasFetchedNextSession = true
          fetchNextSession()
        }
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [upcomingSessionTime]);

  const timeLabels = [
    { label: 'Hours', key: 'hours' },
    { label: 'Minutes', key: 'minutes' },
    { label: 'Seconds', key: 'seconds' },
  ];

  return (
    <div className='w-full flex flex-col lg:flex-row bg-[#F7F5FF] border-[0.5px] border-[#680AFF] rounded-2xl p-4 gap-5 justify-between'>
      <div className='flex flex-col gap-2'>
        <span className='border-b border-[#7A7EFF21] w-fit pb-2 font-semibold text-xl'>
          {session?.sessionName}
        </span>
        <span>
          <b>{role === 'mentor' ? 'Hosted With' : 'Hosted By'}</b>{' '}
          {session?.name}
        </span>

        <span>
          <b className='text-[#5E5E5E]'>Description:</b>{' '}
          {session?.sessionDescription}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        {/* COUNTER SECTION */}
        {!hasStarted && (
          <div className='flex flex-row gap-1 sm:gap-4 bg-[#545454] text-white p-1 sm:p-2 rounded-lg'>
            {timeLabels?.map(({ label, key }) => (
              <div
                key={key}
                className="flex flex-col items-center px-3 sm:px-6"
              >
                <span className="text-5xl font-bold">{timeLeft[key]}</span>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        )}
        <a
          href={hasStarted ? session.meetingLink || '#' : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-6 py-2 rounded-full shadow font-medium text-center transition-all duration-300
    ${
      hasStarted
        ? 'bg-[#D9DEFF] text-[#0011FF] hover:bg-[#680AFF] hover:text-white cursor-pointer'
        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    }`}
          onClick={(e) => {
            if (!hasStarted) e.preventDefault();
          }}
        >
          Join Now
        </a>
      </div>
    </div>
  );
};

export default CounterSection;
