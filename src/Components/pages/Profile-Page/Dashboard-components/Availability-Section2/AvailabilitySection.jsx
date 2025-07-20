import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { FaRegCheckCircle, FaRegTimesCircle, FaSpinner } from 'react-icons/fa';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import useMediaQuery from '@mui/material/useMediaQuery';
import SlotSection from './SlotSection';
import FormHeader from '../../Form-components/common/FormHeader';
// import './assets/MuiClock.css'
import { toast } from 'react-hot-toast';
import {
  addSlot,
  clearSlots,
  getSlotsData,
  setSlots,
} from '../../../../../Reducers/availabilitySlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleCreateSlots,
  handleFetchSlots,
  handleShowOnProfileToggleChange,
} from '../../../../../services/Operations/SlotsOperation/SlotsApi';
import { toggleShowOnProfile } from '../../../../../Reducers/userSlice';
import AvailabilityConfirmationModal from './AvailabilityConfirmationModal';

// Constants to make selection state more readable
const SELECTION_STATES = {
  NONE: 0,
  START_TIME: 1,
  END_TIME: 2,
  CONFIRMED: 3
};

// Month mapping for date formatting
const MONTH_MAP = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04',
  May: '05', Jun: '06', Jul: '07', Aug: '08',
  Sep: '09', Oct: '10', Nov: '11', Dec: '12',
};

const AvailabilitySection = () => {
  const dispatch = useDispatch();
  const isLandscape = useMediaQuery('(min-width:600px)');
  
  // Redux selectors
  const { currentUser } = useSelector((state) => state.user);
  const showOnProfile = useSelector((state) => state.user?.currentUser?.showOnProfile == 1);
  const userName = useSelector((state) => state.user?.currentUser?.userName);
  const reduxSlots = useSelector((state) => state.availability.slots);
  
  // Local state
  const [dateValue, setDateValue] = useState('');
  const [time, setTime] = useState(null);
  const [nextMonthSelected, setNextMonthSelected] = useState(false);
  const [slotData, setSlotData] = useState(reduxSlots);
  const [changed, setChanged] = useState(false);
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState(SELECTION_STATES.NONE);
  const [timeValues, setTimeValues] = useState({
    start: { hour: '', min: '' },
    end: { hour: '', min: '' }
  });

  // Initialize with current date
  useEffect(() => {
    const date = dayjs(Date.now());
    setDateValue(formatDate(date));
    dispatch(getSlotsData(userName));
  }, [dispatch, userName]);

  // Format date for API and display
  const formatDate = useCallback((obj) => {
    const date = String(obj?.$d);
    const dateTime = date.split(' ').slice(1, 4);
    return `${dateTime[2]}-${MONTH_MAP[dateTime[0]]}-${dateTime[1]}`;
  }, []);

  // Format time from date picker
  const formatTime = useCallback((obj) => {
    const hour = obj.$H;
    const min = obj.$m;
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const formattedMin = min < 10 ? `0${min}` : `${min}`;

    if (selection === SELECTION_STATES.END_TIME) {
      setTime(obj);
      setTimeValues(prev => ({
        ...prev,
        end: { hour: formattedHour, min: formattedMin }
      }));
      setSelection(SELECTION_STATES.CONFIRMED);
    } else if (selection === SELECTION_STATES.START_TIME) {
      setTime(obj);
      setTimeValues(prev => ({
        start: { hour: formattedHour, min: formattedMin },
        end: { 
          hour: (hour + 1) < 10 ? `0${hour + 1}` : `${hour + 1}`, 
          min: formattedMin 
        }
      }));
      setTimeout(() => setTime(null), 100);
      handleOpen();
      setSelection(SELECTION_STATES.CONFIRMED);
    }
  }, [selection]);

  // Check if next month selection is allowed
  const canShowNextMonth = useMemo(() => {
    const date = new Date();
    return date.getDate() > 25;
  }, []);

  // Date change handler
  const handleDateChange = useCallback((newVal) => {
    const date = new Date();

    if (changed) {
      setAvailabilityModalOpen(true);
      return;
    }

    if (newVal.$M > date.getMonth() || newVal.$D >= date.getDate()) {
      setDateValue(formatDate(newVal));
    } else {
      toast.error('Cant add slot to past date', { position: 'top-right' });
    }
  }, [changed, formatDate]);

  // Month change handler
  const handleMonthChange = useCallback((val) => {
    const [year, month, date] = dateValue?.split('-');
    const newMonth = val.$M + 1;
    const formattedMonth = newMonth < 10 ? `0${newMonth}` : `${newMonth}`;
    const newVal = `${year}-${formattedMonth}-${date}`;
    const isNextMonth = val.isAfter(dayjs(), 'month');
    
    setDateValue(newVal);
    setNextMonthSelected(isNextMonth);
  }, [dateValue]);

  // Handle clicks on MUI time picker  
  const handleOpen = useCallback(() => {
    let hourSelector = document.getElementById(':r3:');
    if (hourSelector) {
      hourSelector.click();
    }
    hourSelector = document.getElementById(':r1:');
    if (hourSelector) {
      hourSelector.click();
    }
  }, []);

  // Validate that slot is exactly 1 hour
  const isOneHourSlot = useCallback(() => {
    const { start, end } = timeValues;
    if (!start.hour || !end.hour) return false;
    
    const startMinutes = Number(start.hour) * 60 + Number(start.min);
    const endMinutes = Number(end.hour) * 60 + Number(end.min);
    return endMinutes - startMinutes === 60;
  }, [timeValues]);

  // Check for slot overlapping with existing slots
  const hasOverlappingSlots = useCallback(() => {
    if (!dateValue || !slotData[dateValue]) return false;
    
    const { start, end } = timeValues;
    const startMinutes = Number(start.hour) * 60 + Number(start.min);
    const endMinutes = Number(end.hour) * 60 + Number(end.min);

    return slotData[dateValue].some(slot => {
      const slotStartMinutes = Number(slot.start?.split(':')[0]) * 60 + Number(slot.start?.split(':')[1]);
      const slotEndMinutes = Number(slot.end?.split(':')[0]) * 60 + Number(slot.end?.split(':')[1]);
      
      return (startMinutes >= slotStartMinutes && startMinutes <= slotEndMinutes) ||
             (endMinutes >= slotStartMinutes && endMinutes <= slotEndMinutes);
    });
  }, [dateValue, slotData, timeValues]);

  // Check if selected date is today
  const isSameDay = useCallback(() => {
    if (!dateValue) return false;
    const date = new Date();
    return Number(date.getDate()) === Number(dateValue.split('-')[2]);
  }, [dateValue]);

  // Submit new slot
  const handleSubmit = useCallback(() => {
    const { start, end } = timeValues;
    
    if (!start.hour || !end.hour) {
      toast.error('Please select both start and end times.', { position: 'top-right' });
      return;
    }

    if (Number(start.hour) > Number(end.hour) || 
        (start.hour === end.hour && Number(start.min) > Number(end.min))) {
      toast.error('Please select valid time.', { position: 'top-right' });
    } else if (!isOneHourSlot()) {
      toast.error('Slot duration must be 1 hour (60 minutes).', { position: 'top-right' });
    } else if (hasOverlappingSlots()) {
      toast.error('Current slot is overlapping with an existing slot.', { position: 'top-right' });
    } else if (isSameDay()) {
      toast.error("Can't add slot on same day.", { position: 'top-right' });
    } else {
      const value = {
        start: `${start.hour}:${start.min}:00`,
        end: `${end.hour}:${end.min}:00`,
      };
      
      setSlotData(prev => ({
        ...prev,
        [dateValue]: prev[dateValue] ? [...prev[dateValue], value] : [value],
      }));

      toast.success('New slot added :)', { position: 'top-right' });
      setChanged(true);
    }

    setTime(null);
    setTimeValues({ start: { hour: '', min: '' }, end: { hour: '', min: '' } });
    setSelection(SELECTION_STATES.NONE);
    handleOpen();
  }, [timeValues, dateValue, handleOpen, isOneHourSlot, hasOverlappingSlots, isSameDay]);

  // Toggle show on profile setting
  const handleShowOnProfileToggle = useCallback(() => {
    const formData = { showOnProfile: !showOnProfile };
    handleShowOnProfileToggleChange(formData);
    dispatch(toggleShowOnProfile(!showOnProfile));
  }, [showOnProfile, dispatch]);

  // Cancel slot selection
  const cancelSlot = useCallback(() => {
    setSelection(SELECTION_STATES.NONE);
    setTimeValues({ start: { hour: '', min: '' }, end: { hour: '', min: '' } });
    handleOpen();
  }, [handleOpen]);

  // Submit all slots to API
  const handleSlotSubmission = useCallback(async () => {
    setLoading(true);
    try {
      const formData = {
        date: dateValue,
        showOnProfile: true,
        slots: slotData[dateValue] || [],
      };
      await handleCreateSlots(formData);
      dispatch(setSlots(slotData));
      setChanged(false);
    } catch (error) {
      toast.error('Failed to save slots');
    } finally {
      setLoading(false);
    }
  }, [dateValue, slotData, dispatch]);

  return (
    <div>
      {/* <FormHeader
        title={'Availability Section'}
        currentPath='long-term-membership'
        step={2}
        desc={'Schedule your free slots'}
      /> */}
      {/* <hr className='w-100 h-0.5 my-2 bg-customPurple border-0' /> */}
      <div className="flex justify-between items-center px-2 sm:px-8 mt-4">
        <h1 className="text-[28px] md:text-[28px] lg:text-[33px] text-customPurple font-semibold -mt-2">
          Slots Schedule
        </h1>
        <span className="font-semibold text-[#686769] text-lg items-center flex gap-3">
          <button
            className={`w-12 ${showOnProfile ? 'bg-[#B69DF8]' : 'bg-gray-200'} p-1 rounded-full flex ${showOnProfile ? 'justify-end' : 'justify-start'}`}
            onClick={handleShowOnProfileToggle}
          >
            {showOnProfile ? (
              <FaRegCheckCircle color="white" />
            ) : (
              <FaRegTimesCircle />
            )}
          </button>
          Show on profile
        </span>
      </div>

      <div className="calander-container my-4 flex h-auto flex-col llg:flex-row lg:gap-0 gap-4">
        <div className="calander xl:w-[50%] w-full relative lg:border-r-2 lg:border-customPurple">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              className="border border-black rounded-lg"
              value={dayjs(dateValue)}
              onChange={handleDateChange}
              views={['day']}
              slots={{
                previousIconButton: nextMonthSelected ? undefined : () => null,
                nextIconButton:
                  canShowNextMonth && !nextMonthSelected
                    ? undefined
                    : () => null,
              }}
              slotProps={{
                day: {
                  onKeyDown: (e) => {
                    if (
                      [
                        'ArrowLeft',
                        'ArrowRight',
                        'ArrowUp',
                        'ArrowDown',
                      ].includes(e.key)
                    ) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  },
                },
              }}
              onMonthChange={handleMonthChange}
            />
          </LocalizationProvider>
        </div>

        <div className="clock w-full xl:w-[60%] flex items-center justify-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div
              className={`border h-full ${isLandscape ? 'min-h-[336px]' : 'min-h-[460px]'} p-2 w-full max-w-[500px] border-black rounded-lg relative`}
            >
              <StaticTimePicker
                orientation={isLandscape ? 'landscape' : 'portrait'}
                slots={{
                  previousIconButton: () => null,
                  nextIconButton: () => null,
                  actionBar: (props) => (
                    <div className="absolute bottom-6 right-5 md:right-8 flex gap-2">
                      <button
                        className={`${(selection === SELECTION_STATES.NONE || selection === SELECTION_STATES.CONFIRMED) && 'hidden'} px-4 py-2 rounded-md bg-gray-200`}
                        onClick={cancelSlot}
                      >
                        Cancel
                      </button>
                      <button
                        className={`${(selection === SELECTION_STATES.NONE || selection === SELECTION_STATES.CONFIRMED) && 'hidden'} px-4 py-2 rounded-md bg-[#5C3FD4] text-white`}
                        onClick={props.onAccept}
                      >
                        OK
                      </button>
                    </div>
                  ),
                }}
                sx={{
                  '.MuiInputBase-input': { color: '#000000' },
                  '.MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#FF5722',
                    },
                    '&:hover fieldset': {
                      borderColor: '#FF9800',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FFC107',
                    },
                  },
                }}
                value={time}
                onAccept={formatTime}
                disabled={selection === SELECTION_STATES.NONE}
                componentsProps={{ actionBar: { actions: [] } }}
              />

              <div className="timeContainer absolute bottom-7 left-5 flex gap-2">
                <button
                  className={`${selection === SELECTION_STATES.START_TIME ? 'bg-[#D7D6FF]' : 'bg-gray-200'} px-2 py-1 rounded-md`}
                  onClick={() => setSelection(SELECTION_STATES.START_TIME)}
                >
                  {`${timeValues.start.hour || '--'} : ${timeValues.start.min || '--'}`}
                </button>
                <span className="py-1">to</span>
                <button
                  className={`${selection === SELECTION_STATES.END_TIME ? 'bg-[#D7D6FF]' : 'bg-gray-200'} px-2 py-1 rounded-md`}
                  onClick={() => setSelection(SELECTION_STATES.START_TIME)}
                >
                  {`${timeValues.end.hour || '--'} : ${timeValues.end.min || '--'}`}
                </button>
              </div>
              <div className="timeContainer absolute bottom-6 right-5 md:right-8 flex gap-2">
                <button
                  className={`${selection === SELECTION_STATES.NONE ? 'bg-[#5C3FD4] text-white' : 'hidden'} px-4 py-2 rounded-md`}
                  onClick={() => setSelection(SELECTION_STATES.START_TIME)}
                >
                  Add new Slot
                </button>
                <button
                  className={`${selection === SELECTION_STATES.CONFIRMED ? 'bg-[#5C3FD4] text-white' : 'hidden'} px-4 py-2 rounded-md`}
                  onClick={handleSubmit}
                >
                  Confirm timings
                </button>
              </div>
            </div>
          </LocalizationProvider>
        </div>
      </div>

      <SlotSection
        slots={slotData}
        date={dateValue}
        setChanged={setChanged}
        setSlots={setSlotData}
      />

      {changed && (
        <div className="flex justify-center">
          <button
            className={`border-customPurple text-sm w-full p-2.5 lg:w-44 font-bold rounded bg-customPurple hover:bg-[#4e2cd6] text-white disabled:opacity-60 disabled:cursor-not-allowed`}
            onClick={handleSlotSubmission}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="ml-1">Confirm changes...</span>
                <FaSpinner className="animate-spin" />
              </div>
            ) : (
              'Confirm changes'
            )}
          </button>
        </div>
      )}

      {availabilityModalOpen && changed && (
        <AvailabilityConfirmationModal
          date={dateValue}
          slots={slotData}
          setAvailabilityModalOpen={setAvailabilityModalOpen}
          setChanged={setChanged}
        />
      )}
    </div>
  );
};

export default AvailabilitySection;
