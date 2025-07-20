import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  fetchSlotsCount,
  fetchAllSlots,
} from '@/services/Operations/SlotsOperation/SlotsApi';

import NoSlotSection from './NoSlotSection';
import SlotHeader from './SlotHeader';
import SlotDatesCarousel from './SlotDatesCarousel';
import SlotList from './SlotList';

function SlotSection({ userData, isCurrentUser, isMentor, reschedule }) {
  const [allFetchedSlots, setAllFetchedSlots] = useState([]);
  const [slotCount, setSlotCount] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  const sliderRef = useRef(null);
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith('/profile');

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const username = isCurrentUser ? currentUser?.username : userData?.username;
  const currentUserId = currentUser?._id;

  // ✅ Fetch slotCount considering mentor access
  useEffect(() => {
    if (!username) return;

    fetchSlotsCount(username).then((res) => {
      if (res?.success) {
        const originalCounts = res.slotCounts;
        const updatedCounts = {};

        Promise.all(
          Object.keys(originalCounts).map((dateKey) =>
            fetchAllSlots(username, dateKey).then((res) => {
              if (res?.success) {
                const slots = res.data || [];

                const visibleSlots = slots.filter((slot) => {
                  const isSlotAvailable =
                    slot.bookedUsers.length < slot.maxCapacity;
                  const isBookedByCurrentUser = slot.bookedUsers?.some(
                    (user) =>
                      user?._id === currentUserId ||
                      user?.userId === currentUserId
                  );

                  const isMentorViewingOwnSlots = isMentor && isCurrentUser;

                  return (
                    isSlotAvailable ||
                    isBookedByCurrentUser ||
                    isMentorViewingOwnSlots
                  );
                });

                if (visibleSlots.length > 0) {
                  updatedCounts[dateKey] = visibleSlots.length;
                }
              }
            })
          )
        ).then(() => {
          setSlotCount(updatedCounts);
        });
      }
    });
  }, [username, currentUserId, isCurrentUser, isMentor]);

  // Auto-select first date
  useEffect(() => {
    const firstDate = Object.keys(slotCount)[0];
    if (firstDate) setSelectedDate(firstDate);
  }, [slotCount]);

  // Fetch slots for selected date
  useEffect(() => {
    if (!username || !selectedDate) return;

    fetchAllSlots(username, selectedDate).then((res) => {
      if (res?.success) {
        setAllFetchedSlots(res.data || []);
      }
    });
  }, [username, selectedDate]);

  useEffect(() => {
    const matched = allFetchedSlots.filter((slot) => {
      const isSlotAvailable = slot.bookedUsers.length < slot.maxCapacity;
      const isBookedByCurrentUser = slot.bookedUsers?.some(
        (user) => user?._id === currentUserId || user?.userId === currentUserId
      );
      const isMentorViewingOwnSlots = isMentor && isCurrentUser;

      return (
        slot.startDate === selectedDate &&
        (isSlotAvailable || isBookedByCurrentUser || isMentorViewingOwnSlots)
      );
    });

    setFilteredSlots(matched);
  }, [selectedDate, allFetchedSlots, currentUserId, isCurrentUser, isMentor]);

  // Set default selected slot
  useEffect(() => {
    setSelectedSlot(allFetchedSlots[0] || null);
  }, [allFetchedSlots]);

  const handleNewSlot = () => {
    navigate('/dashboard/create-event');
  };

  const formatTo12Hour = (timeStr) => {
    const [hour, minute] = timeStr?.split(':') || [];
    const date = new Date();
    date.setHours(+hour, +minute);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div
      id="slots"
      className={`w-full max-w-96 rounded-2xl border-2 border-[#D3B3FB] ${
        isProfilePage
          ? 'bg-white max-w-full mb-24 mt-2 lg:mt-0 lg:mb-0 md:w-full lg:max-w-96 xl:max-w-[96%] 2xl:max-w-full'
          : 'bg-[#ECEAFE]'
      }`}
    >
      <SlotHeader
        isMentor={isMentor}
        isCurrentUser={isCurrentUser}
        handleNewSlot={handleNewSlot}
      />

      {allFetchedSlots.length > 0 ? (
        <>
          <SlotDatesCarousel
            slotCount={slotCount}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            sliderRef={sliderRef}
          />

          <SlotList
            isCurrentUser={isCurrentUser}
            filteredSlots={filteredSlots}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            loading={loading}
            reschedule={reschedule}
            isMentor={isMentor}
            formatTo12Hour={formatTo12Hour}
          />
        </>
      ) : (
        <NoSlotSection
          isCurrentUser={isCurrentUser}
          isMentor={isMentor}
          userData={userData}
        />
      )}
    </div>
  );
}

export default SlotSection;
