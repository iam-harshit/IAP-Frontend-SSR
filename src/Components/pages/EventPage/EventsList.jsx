import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import EventCard from './EventCard';
import EventFilters from './EventFilters';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { parseISO, isBefore, isAfter } from 'date-fns';

const EventsList = ({ events }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filterOptions = [
    { label: 'All Events', value: 'all' },
    { label: 'Upcoming Events', value: 'upcoming' },
    { label: 'Live Sessions', value: 'live' },
    { label: 'Completed', value: 'completed' },
  ];

  const getEventStatus = (event) => {
    if (
      !event.startDate ||
      !event.endDate ||
      !event.startTime ||
      !event.endTime
    ) {
      return 'unknown';
    }

    const now = new Date();

    const eventStartDate = parseISO(event.startDate);
    const eventEndDate = parseISO(event.endDate);

    if (isBefore(now, eventStartDate)) return 'upcoming';
    if (isAfter(now, eventEndDate)) return 'completed';

    const [startHour, startMinute] = event.startTime.split(':').map(Number);
    const [endHour, endMinute] = event.endTime.split(':').map(Number);

    const todayStart = new Date(now);
    todayStart.setHours(startHour, startMinute, 0, 0);

    const todayEnd = new Date(now);
    todayEnd.setHours(endHour, endMinute, 0, 0);

    if (now >= todayStart && now <= todayEnd) {
      return 'live';
    } else if (now < todayStart) {
      return 'upcoming';
    } else {
      return 'completed';
    }
  };

  const eventsWithStatus = useMemo(() => {
    return events.map((event) => ({
      ...event,
      computedStatus: getEventStatus(event),
    }));
  }, [events]);

  useEffect(() => {
    let baseEvents = eventsWithStatus;

    if (activeFilter !== 'all') {
      baseEvents = baseEvents.filter(
        (event) => event.computedStatus === activeFilter && event.slotsRemaining !== 0
      );
    }

    if(activeFilter === 'all') {
      baseEvents = baseEvents.filter(
        (event) => event.computedStatus !== 'completed' && event.slotsRemaining !== 0
      );
    }

    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      baseEvents = baseEvents.filter((event) => {
        return (
          (event.sessionTitle && event.sessionTitle.toLowerCase().includes(lowerSearch)) ||
          (event.sessionType && event.sessionType.toLowerCase().includes(lowerSearch))
        );
      });
    }
    setFilteredEvents(baseEvents);
  }, [ activeFilter, searchTerm, eventsWithStatus]);

  return (
    <div className="w-full overflow-x-hidden mb-6" id="events-section">
      <div className="flex flex-wrap flex-col justify-center items-center gap-4 mb-6 mx-10">
        <div className="flex items-center gap-4 w-full justify-center">
          <div className="relative">
            {isFilterOpen && (
              <EventFilters
                events={filteredEvents}
                setFilteredEvents={setFilteredEvents}
                originalEvents={eventsWithStatus}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            )}
            {/* {events && events.map((event) => (
              <div key={event._id} className='bg-slate-200 p-8'>{event.sessionTitle}</div>
            ))} */}
          </div>

          <div className="relative  mt-4 flex md:flex-row flex-col gap-2">
            <div>
              <FiSearch
                className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by type & name "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px] pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 h-10
                rounded-lg w-28 shadow-md hover:bg-purple-700 transition-colors duration-200"
            >
              <FiFilter size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap justify-center w-full">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`text-sm font-medium rounded-lg px-4 py-2 border transition ${
                activeFilter === option.value
                  ? 'bg-purple-100 text-purple-600 border-purple-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
              aria-pressed={activeFilter === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center  text-purple-400 text-6xl font-semibold py-12">
          <p>No Events found</p>
        </div>
      ) : (
        <div className="flex gap-6 flex-wrap justify-center mx-auto">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              status={event.computedStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

EventsList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      sessionTitle: PropTypes.string.isRequired,
      sessionType: PropTypes.string,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventsList;
