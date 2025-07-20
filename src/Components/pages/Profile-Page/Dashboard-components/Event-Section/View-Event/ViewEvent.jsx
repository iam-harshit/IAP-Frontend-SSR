import React, { useState, useEffect } from 'react';
import { CalendarSection } from './Calendar';
import { EventManagementSection } from './EventManagement';
import { handleViewEventByMentor } from '@/services/Operations/EventOperation/EventApi';

const ViewEvent = () => {
  const [activeTab, setActiveTab] = useState('Booked');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const response = await handleViewEventByMentor();
    setEvents(response?.data || []);
    setLoading(false);
  };

  return (
    <div className="px-0 relative overflow-hidden">
      <main className="min-h-screen flex flex-col">
        <div className="flex-1 p-6">
          <div className="text-center mb-8 px-4">
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">
              View Your Events
            </h1>
          </div>

          <EventManagementSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <CalendarSection tabType={activeTab} events={events} />
        </div>
      </main>
    </div>
  );
};

export default ViewEvent;
