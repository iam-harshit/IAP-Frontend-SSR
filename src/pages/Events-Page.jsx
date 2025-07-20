/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo } from 'react';
// import { events } from '@/Constants/eventpagedata';
import EventsList from '@/Components/pages/EventPage/EventsList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSlots, selectSlots } from '@/Reducers/eventsSlice';

const Events = () => {
  const dispatch = useDispatch();
  const slots = useSelector(selectSlots);

  const memoizedSlots = useMemo(() => slots, [slots]);

  useEffect(() => {
    dispatch(fetchSlots());
  }, [dispatch]);

  return (
    <div className="relative
     bg-gradient-to-b from-purple-100 to-white ">
      <EventsList events={memoizedSlots || []} />
    </div>
  );
};

export default Events;
