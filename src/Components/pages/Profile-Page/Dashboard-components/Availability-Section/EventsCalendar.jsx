import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  fetchEvents,
  addEvent,
  updateEvent,
  removeEvent,
} from '../../../../../Reducers/timeSlice';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';

const localizer = momentLocalizer(moment);

const EventsCalendar = () => {
  const dispatch = useDispatch();
  const { events, status } = useSelector((state) => state.calendar);

  const [startDate, setStartDate] = useState(moment().toDate());
  const [endDate, setEndDate] = useState(moment().add(1, 'hour').toDate());
  const [eventName, setEventName] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Fetch events when component mounts
  useEffect(() => {
    dispatch(fetchEvents()); // Refetch after update
  }, [dispatch]);

  useEffect(() => {
    // console.log("Updated events:", events);
  }, [events]);

  const isDateValid = (start, end) => {
    const now = moment();
    return moment(start).isSameOrAfter(now) && moment(end).isAfter(start);
  };

  const handleBooking = async () => {
    if (!eventName || !startDate || !endDate) {
      alert('Please fill in all fields.');
      return;
    }

    if (!isDateValid(startDate, endDate)) {
      alert('Invalid date selection. Please choose a valid date & time.');
      return;
    }

    const newEvent = {
      title: eventName,
      startDate: moment(startDate).utc().format(), // Convert to UTC
      endDate: moment(endDate).utc().format(), // Convert to UTC
    };
    // console.log(newEvent, "new event");
    dispatch(addEvent(newEvent));
    alert('Booking successful!');
    resetFields();
  };

  const handleUpdate = async () => {
    if (!selectedEvent) return;

    if (!isDateValid(startDate, endDate)) {
      alert('Invalid date selection. Please choose a valid date & time.');
      return;
    }

    const updateNewEvent = {
      id: selectedEvent.id,
      title: eventName,
      startDate: moment(startDate).utc().format(), // Convert to UTC
      endDate: moment(endDate).utc().format(), // Convert to UTC
    };

    dispatch(updateEvent(updateNewEvent));

    alert('Event updated!');
    resetFields();
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    // console.log(selectedEvent);
    dispatch(removeEvent(selectedEvent.id));
    alert('Event deleted!');
    resetFields();
  };

  const resetFields = () => {
    setEventName('');
    setStartDate(moment().toDate());
    setEndDate(moment().add(1, 'hour').toDate());
    setSelectedEvent(null);
  };

  return (
    // <div className=' w-full p-2'>
    //   <FormHeader
    //     title={'Availability Section'}
    //     currentPath='long-term-membership'
    //     step={2}
    //     desc={'Schedule your free slots'}
    //   />
    //   <hr className='w-100 h-0.5 my-8 bg-customPurple border-0' />{' '}
    //   <div className='flex max-w-[700px] mx-auto my-10 justify-center  flex-col gap-3 '>
    //     {availability ? (
    //       weekDays.map((day, index) => (
    //         <div className='border rounded-md' key={index}>
    //           <div className='px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-between '>
    //             <div>
    //               <span> </span>
    //               <span className='text-xl'> {day}</span>{' '}
    //             </div>
    //             <div className='flex flex-wrap flex-row gap-2 items-center'>
    //               <div className='flex flex-col md:flex-row items-start md:items-center'>
    //                 <label>From: </label>
    //                 <input
    //                   className='border-gray-200 rounded-md mx-1 md:mx-2'
    //                   type='time'
    //                   value={startTimeInput[day]}
    //                   onChange={(e) => {
    //                     setSelectedDay(day)
    //                     setStartTimeInput((prevState) => ({
    //                       ...prevState,
    //                       [day]: e.target.value,
    //                     }))
    //                   }}
    //                 />
    //               </div>
    //               <div className='flex flex-col md:flex-row items-start md:items-center'>
    //                 <label>To: </label>
    //                 <input
    //                   className='border-gray-200 rounded-md mx-1 md:mx-2'
    //                   type='time'
    //                   value={endTimeInput[day]}
    //                   onChange={(e) => {
    //                     setSelectedDay(day)
    //                     setEndTimeInput((prevState) => ({
    //                       ...prevState,
    //                       [day]: e.target.value,
    //                     }))
    //                   }}
    //                 />
    //               </div>
    //               <button
    //                 className='bg-customPurple text-white px-3 py-1 rounded w-full h-fit max-w-[100px] md:w-auto mt-[6px]'
    //                 onClick={() => handleSave(day)}
    //               >
    //                 Add
    //               </button>
    //             </div>
    //           </div>
    //           {/* <div>ok</div> */}
    //           <div className='px-4 py-2 flex flex-row gap-2 flex-wrap'>
    //             {availability[day] && availability[day].length > 0 ? (
    //               availability[day].map((slot, index) => (
    //                 <div
    //                   className='bg-purple-50 flex flex-row items-center gap-2 text-[14px] text-purple-700 border-2 border-purple-300 rounded-md px-2 py-1'
    //                   key={slot}
    //                 >
    //                   {/* Slot {slot.slotId}: */}
    //                   <span>{slot}</span>
    //                   <IoIosClose
    //                     className='cursor-pointer w-6 h-6'
    //                     onClick={() => removeSlot(day, index)}
    //                   />
    //                 </div>
    //               ))
    //             ) : (
    //               <div></div>
    //             )}
    //           </div>
    //         </div>
    //       ))
    //     ) : (
    //       <div>Loading</div>
    //     )}
    //     {}
    //     <div>
    //       <button
    //         onClick={handleSubmit}
    //         className='bg-customPurple text-white px-4 py-2 text-lg rounded'
    //       >
    //         Save Availability
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="w-96 px-4 py-3 pl-10 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400 transition-all cursor-pointer"
        />
        <DatePicker
          className="px-4 py-3 pl-10 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400 transition-all cursor-pointer"
          selected={startDate}
          onChange={(date) => setStartDate(moment(date).local().toDate())} // Convert to local time
          showTimeSelect
          dateFormat="Pp"
          minDate={moment().local().toDate()} // Ensure local time is used
          onCalendarOpen={() => setIsDatePickerOpen(true)}
          onCalendarClose={() => setIsDatePickerOpen(false)}
        />
        <DatePicker
          className="px-4 py-3 pl-10 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400 transition-all cursor-pointer"
          selected={endDate}
          onChange={(date) => setEndDate(moment(date).local().toDate())}
          showTimeSelect
          dateFormat="Pp"
          minDate={moment().local().toDate()}
          onCalendarOpen={() => setIsDatePickerOpen(true)}
          onCalendarClose={() => setIsDatePickerOpen(false)}
        />
        <button
          className="btn text-purple-800 font-medium rounded-2xl text-xl"
          onClick={handleBooking}
        >
          📅
        </button>
        {selectedEvent && (
          <button
            className="btn font-medium rounded-2xl text-2xl"
            onClick={handleUpdate}
          >
            <CiEdit />
          </button>
        )}
        {selectedEvent && (
          <button
            className="btn font-medium rounded-2xl text-2xl"
            onClick={handleDelete}
          >
            <MdDeleteOutline />
          </button>
        )}
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={(event) => moment(event.startDate).toDate()}
        endAccessor={(event) => moment(event.endDate).toDate()}
        style={{
          marginTop: '30px',
          padding: '20px 80px',
          height: '100vh',
          boxShadow:
            'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
          pointerEvents: isDatePickerOpen ? 'none' : 'auto', // Disable interactions when DatePicker is open
        }}
        views={{ month: true, agenda: true }}
        onSelectEvent={(event) => {
          if (!isDatePickerOpen) {
            setSelectedEvent(event);
            setEventName(event.title);
            setStartDate(moment(event.startDate).toDate());
            setEndDate(moment(event.endDate).toDate());
          }
        }}
        eventPropGetter={(event) => ({
          style: {
            background: '#e85d04',
            borderRadius: '15px',
            boxShadow:
              'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
            opacity: 0.8,
            color: 'white',
            fontWeight: 'medium',
            padding: '8px',
            marginBottom: '10px',
            border: 'none',
            fontFamily: 'Nunito',
            display: 'block',
          },
        })}
        dayPropGetter={(date) => {
          const day = date.getDate();
          const isOdd = day % 2 !== 0;

          return {
            style: {
              background: isOdd ? '#fff' : '#492371',
              color: isOdd ? '#000' : '#fff',
              border: '1px solid #ccc',
            },
          };
        }}
      />
    </div>
  );
};

export default EventsCalendar;
