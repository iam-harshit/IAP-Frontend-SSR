import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useAnimationControls } from 'framer-motion';
import { Button, Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import EventCard from './EventCard.jsx';
import EventModal from './EventModal.jsx';

const generateDates = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  return Array.from(
    { length: lastDay },
    (_, i) => new Date(year, month, i + 1)
  );
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const DatePicker = ({ events = [], loading = false, tabType }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [visibleEvents, setVisibleEvents] = useState(events);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dates = generateDates(new Date(), 30);
  const containerRef = useRef(null);

  const x = useMotionValue(0);
  const controls = useAnimationControls();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!events.length) {
      setSelectedDate(null);
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get all unique event dates (as ms)
    const eventDates = [
      ...new Set(
        events.map((event) => {
          const d = new Date(event.startDate);
          d.setHours(0, 0, 0, 0);
          return d.getTime();
        })
      ),
    ].sort((a, b) => a - b);

    // Find the first event date that is today or later
    let foundDate = null;
    for (let time of eventDates) {
      if (time >= today.getTime()) {
        foundDate = new Date(time);
        break;
      }
    }
    setSelectedDate(foundDate || new Date(eventDates[0]));
  }, [events]);

  useEffect(() => {
    setVisibleEvents(events);
  }, [events]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleDragEnd = (event, info) => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const maxScroll = -(dates.length * 84 - containerWidth);
    let newX = x.get() + info.offset.x;
    newX = Math.max(maxScroll, Math.min(0, newX));
    controls.start({
      x: newX,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    });
    setCurrentPage(Math.round(-newX / containerWidth));
  };

  const handleNavigation = (direction) => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const maxPage = Math.ceil((dates.length * 84) / containerWidth) - 1;
    let newPage = direction === 'prev' ? currentPage - 1 : currentPage + 1;
    newPage = Math.max(0, Math.min(newPage, maxPage));
    setCurrentPage(newPage);
    controls.start({
      x: -newPage * containerWidth,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    });
  };

  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    controls.start({
      x: -currentPage * containerWidth,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    });
  }, [currentPage, controls]);

  // Filter events for the selected date
  const filteredEvents = selectedDate
    ? visibleEvents.filter(
        (event) =>
          new Date(event.startDate).toDateString() ===
          selectedDate.toDateString()
      )
    : [];

  const handleCancel = (eventId) => {
    setVisibleEvents((prev) => prev.filter((e) => e._id !== eventId));
  };

  const handleCardClick = (event) => {
    if (tabType === 'pending') {
      setSelectedEvent(event);
      setModalOpen(true);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <Button
          isIconOnly
          variant="light"
          onPress={() => handleNavigation('prev')}
          isDisabled={currentPage === 0}
        >
          <Icon icon="lucide:chevron-left" className="w-6 h-6" />
        </Button>
        <div ref={containerRef} className="flex-1 overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{
              left: -(
                dates.length * 84 -
                (containerRef.current?.offsetWidth || 0)
              ),
              right: 0,
            }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            style={{ x }}
            animate={controls}
            className="flex space-x-2 cursor-grab active:cursor-grabbing"
          >
            {/* {dates.map((date) => (
              <Button
                key={date.toISOString()}
                color={
                  selectedDate?.toDateString() === date.toDateString()
                    ? 'primary'
                    : 'default'
                }
                variant={
                  selectedDate?.toDateString() === date.toDateString()
                    ? 'solid'
                    : 'bordered'
                }
                onPress={() => handleDateSelect(date)}
                className="w-20 h-20 flex-shrink-0 flex flex-col items-center justify-center"
              >
                <span className="text-sm font-semibold">
                  {formatDate(date).split(' ')[0]}
                </span>
                <span className="text-lg font-bold">{date.getDate()}</span>
                <span className="text-xs">
                  {formatDate(date).split(' ')[1]}
                </span>
              </Button>
            ))} */}
            {dates.map((date) => {
              const isActive =
                selectedDate?.toDateString() === date.toDateString();
              return (
                <Button
                  key={date.toISOString()}
                  onPress={() => handleDateSelect(date)}
                  className={`w-20 p-2 h-20 flex-shrink-0 flex flex-col items-center justify-center transition
        ${isActive ? 'bg-purple-600 text-white' : 'bg-white text-purple-700 border border-purple-200'}
        ${isActive ? '' : 'hover:bg-purple-100'}
        rounded-xl shadow-sm`}
                  style={{
                    border: isActive
                      ? '2px solid #7c3aed'
                      : '1px solid #e0e0e0',
                  }}
                >
                  <span className="text-sm font-semibold">
                    {formatDate(date).split(' ')[0]}
                  </span>
                  <span className="text-lg font-bold">{date.getDate()}</span>
                  <span className="text-xs">
                    {formatDate(date).split(' ')[1]}
                  </span>
                </Button>
              );
            })}
          </motion.div>
        </div>
        <Button
          isIconOnly
          variant="light"
          onPress={() => handleNavigation('next')}
          isDisabled={
            currentPage >=
            Math.ceil(
              (dates.length * 84) / (containerRef.current?.offsetWidth || 1)
            ) -
              1
          }
        >
          <Icon icon="lucide:chevron-right" className="w-6 h-6" />
        </Button>
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Loading events...</div>
      ) : selectedDate && filteredEvents.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {filteredEvents.map((event) => (
            <div
              key={event?._id}
              onClick={() => handleCardClick(event)}
              className={tabType === 'pending' ? 'cursor-pointer' : ''}
            >
              <EventCard
                event={event}
                tabType={tabType}
                onCancel={handleCancel}
              />
            </div>
          ))}
          <EventModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            event={selectedEvent}
          />
        </div>
      ) : selectedDate ? (
        <div className="text-center text-gray-400">
          No events for this date.
        </div>
      ) : null}
    </Card>
  );
};
