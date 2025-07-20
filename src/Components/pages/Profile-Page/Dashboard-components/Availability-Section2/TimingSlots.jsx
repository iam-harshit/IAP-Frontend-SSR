import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { toast } from 'react-hot-toast';
import {
  removeSlot,
  updateSlot,
} from '../../../../../Reducers/availabilitySlice';

const TimingSlots = ({
  date,
  setChanged = false,
  slots = {},
  availabilityModal = false,
  setSlots,
}) => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const dispatch = useDispatch();

  // const slots = useSelector((state) => state.availability.slots);

  useEffect(() => {
    if (
      slots[date] &&
      editingIndex !== -1 &&
      editingIndex < slots[date].length
    ) {
      setNewStartTime(slots[date][editingIndex].start);
      setNewEndTime(slots[date][editingIndex].end);
    }
  }, [editingIndex, slots, date]);

  const handleStartTimeChange = (e) => {
    const endTime = e.target.value.split(':');

    let time;
    if (endTime[0] < 9) {
      time = `0${Number(endTime[0]) + 1}:${endTime[1]}`;
    } else {
      time = `${Number(endTime[0]) + 1}:${endTime[1]}`;
    }

    setNewStartTime(e.target.value);
    setNewEndTime(time); // for 1 hr
  };

  const handleEndTimeChange = (e) => {
    setNewEndTime(e.target.value);
  };

  const handleCancelUpdate = () => {
    setEditingIndex(-1);
    setNewEndTime('');
    setNewStartTime('');
  };

  const formatTime = (timeString) => {
    const time = timeString.split(':');
    const timeToDisplay = `${time[0]}:${time[1]}`;
    return timeToDisplay;
  };

  const convertTimeToMinutes = (timeString) => {
    const [hours, minutes] = timeString?.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minOneHourChecker = () => {
    const startMinutes = convertTimeToMinutes(newStartTime);
    const endMinutes = convertTimeToMinutes(newEndTime);
    return endMinutes - startMinutes === 60;
  };

  const checkSlotOverlapping = (idx) => {
    const start = convertTimeToMinutes(newStartTime);
    const end = convertTimeToMinutes(newEndTime);

    for (let val = 0; val < slots[date]?.length; val++) {
      if (val != idx) {
        const slot = slots[date][val];
        const currentSlotStartTime = convertTimeToMinutes(slot.start);
        const currentSlotendTime = convertTimeToMinutes(slot.end);

        if (
          (start >= currentSlotStartTime && start <= currentSlotendTime) ||
          (end >= currentSlotStartTime && end <= currentSlotendTime)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const handelUpdateSlot = (idx) => {
    // dispatch(
    //   updateSlot({
    //     date: date,
    //     index: idx,
    //     newStartTime: newStartTime,
    //     newEndTime: newEndTime,
    //   })
    // )
    if (!minOneHourChecker()) {
      toast.error('Slots must be one hour');
      return;
    } else if (checkSlotOverlapping(idx)) {
      toast.error('Slots must not overlap with existing slot');
      return;
    }

    const newSlot = {
      start: newStartTime,
      end: newEndTime,
    };

    setSlots((prev) => {
      if (!slots[date]) return prev;

      const updated = prev[date]?.map((item, i) => {
        if (i == idx) {
          return newSlot;
        } else {
          return item;
        }
      });

      return { ...prev, [date]: updated };
    });

    setChanged(true);
    setEditingIndex(-1);
    setNewEndTime('');
    setNewStartTime('');
    toast.success('Slot updated successfully');
  };

  const deleteSlot = (idx) => {
    setSlots((prev) => {
      if (!slots[date]) return prev;

      const updated = prev[date]?.filter((_, i) => i !== idx);

      const { [date]: _, ...rest } = prev;

      return updated.length > 0 ? { ...prev, [date]: updated } : rest;
    });
    setChanged(true);
  };

  const renderDesktop = () => {
    return (
      <div
        className={`w-full h-full max-h-72 hidden sm:flex justify-center ${availabilityModal ? 'my-2' : ''}`}
      >
        <div className="w-full max-w-[900px] max-h-[400px] h-auto overflow-y-auto flex flex-col rounded-md">
          <table
            className={`w-full border-2 h-auto relative border-[#FBF3FF]  rounded ${!availabilityModal && 'md:min-w-[700px]'}`}
          >
            <thead className="bg-[#ECD3FF] w-full border-2 sticky top-0 z-10 border-[#FBF3FF]">
              <tr className=" border-2 border-[#FBF3FF] bg-[#FBF3FF]">
                <th
                  className={` ${availabilityModal ? 'px-1 py-1' : 'px-3 py-3'} text-base font-semibold text-black-1500 cursor-pointer border-2 border-[#ECD3FF] text-center bg-[#FBF3FF]`}
                >
                  Start Time
                </th>
                <th
                  className={` text-center ${availabilityModal ? 'px-1 py-1' : 'px-3 py-3'} text-base font-semibold text-black-1500 cursor-pointer border-2 border-[#ECD3FF] bg-[#FBF3FF]`}
                >
                  End Time
                </th>
                {!availabilityModal && (
                  <th
                    className={` text-left ${availabilityModal ? 'px-1 py-1' : 'px-3 py-3'} text-base font-semibold text-black-1500 cursor-pointer border-2 border-[#ECD3FF] bg-[#FBF3FF]`}
                  ></th>
                )}
              </tr>
            </thead>
            <tbody>
              {slots[date]?.map((item, idx) => (
                <tr
                  key={idx}
                  className={`border-b md:max-h-32 border-gray-200 ${idx % 2 == 0 ? 'bg-white' : 'bg-[#FBF3FF]'}`}
                >
                  <td
                    className={`${availabilityModal ? 'px-1 py-1' : 'px-3 py-3'} text-center text-base border-2 border-[#ECD3FF] text-[#A672FF]`}
                  >
                    {editingIndex === idx ? (
                      <input
                        className="border-gray-200 rounded-md mx-1 md:mx-2"
                        type="time"
                        value={newStartTime}
                        onChange={handleStartTimeChange}
                      />
                    ) : (
                      formatTime(item.start)
                    )}
                  </td>
                  <td
                    className={`${availabilityModal ? 'px-1 py-1' : 'px-3 py-3'} text-center text-base border-2 border-[#ECD3FF] text-[#A672FF]`}
                  >
                    {editingIndex === idx ? (
                      <input
                        className="border-gray-200 rounded-md mx-1 md:mx-2"
                        type="time"
                        value={newEndTime}
                        onChange={handleEndTimeChange}
                      />
                    ) : (
                      formatTime(item.end)
                    )}
                  </td>
                  {!availabilityModal && (
                    <td
                      className={`${availabilityModal ? 'px-1 py-1' : 'padding-mid py-3'} w-full sm:w-[200px] text-center border-2 border-[#ECD3FF]`}
                    >
                      {editingIndex === idx ? (
                        <div className="flex flex-col gap-2 w-full">
                          <button
                            className="py-1 px-2 bg-[#5C3FD4] text-white"
                            onClick={() => {
                              handelUpdateSlot(idx);
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            className="py-1 px-2 bg-gray-400"
                            onClick={handleCancelUpdate}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : item.isBooked ? (
                        <>
                          <p className="p-1 bg-violet-300 rounded-md text-black">
                            Slot booked 🥳{' '}
                          </p>
                        </>
                      ) : (
                        <div className="flex justify-evenly gap-2 w-full">
                          <button
                            className=""
                            onClick={() => {
                              setNewStartTime(item.start);
                              setNewEndTime(item.end);
                              setEditingIndex(idx);
                            }}
                          >
                            <FaPencilAlt />
                          </button>
                          <button
                            className=""
                            onClick={() => {
                              deleteSlot(idx);
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderMobile = () => {
    return (
      <div className="sm:hidden p-2">
        {slots[date].map((item, idx) => (
          <div
            key={idx}
            className={`border-[#ECD3FF] text-[#A672FF] border-2 p-4 ${idx % 2 == 0 ? 'bg-white' : 'bg-[#FBF3FF]'}`}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-medium">Start Time</span>
              <span className="font-medium">
                {editingIndex === idx ? (
                  <input
                    className="border-gray-200 rounded-md mx-1 md:mx-2"
                    type="time"
                    value={newStartTime}
                    onChange={handleStartTimeChange}
                  />
                ) : (
                  formatTime(item.start)
                )}
              </span>
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-medium">End Time</span>
              <span>
                {editingIndex === idx ? (
                  <input
                    className="border-gray-200 rounded-md mx-1 md:mx-2"
                    type="time"
                    value={newEndTime}
                    onChange={handleEndTimeChange}
                  />
                ) : (
                  formatTime(item.end)
                )}
              </span>
            </div>

            {!availabilityModal && (
              <div
                className={`${availabilityModal ? 'px-1 py-1' : ''} w-full text-center`}
              >
                {editingIndex === idx ? (
                  <div className="flex flex-col gap-2 w-full">
                    <button
                      className="py-1 px-2 bg-[#5C3FD4] text-white"
                      onClick={() => {
                        handelUpdateSlot(idx);
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      className="py-1 px-2 text-white bg-gray-400"
                      onClick={handleCancelUpdate}
                    >
                      Cancel
                    </button>
                  </div>
                ) : item.isBooked ? (
                  <>
                    <p className="p-1 bg-violet-300 rounded-md text-black">
                      Slot booked 🥳{' '}
                    </p>
                  </>
                ) : (
                  <div className="flex justify-around gap-2 w-full">
                    <button
                      className="flex items-center gap-2"
                      onClick={() => {
                        setNewStartTime(item.start);
                        setNewEndTime(item.end);
                        setEditingIndex(idx);
                      }}
                    >
                      <p>Edit</p> <FaPencilAlt />
                    </button>
                    <button
                      className="flex items-center gap-2"
                      onClick={() => {
                        deleteSlot(idx);
                      }}
                    >
                      <p>Delete</p> <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`w-full h-full max-h-72 flex justify-center ${availabilityModal ? 'my-2' : 'my-8'}`}
    >
      <div className="w-full max-w-[900px] max-h-[400px] h-auto overflow-y-auto flex flex-col rounded-md border-2 border-[#FBF3FF]">
        {availabilityModal ? (
          renderDesktop()
        ) : (
          <>
            {renderDesktop()}
            {renderMobile()}
          </>
        )}
      </div>
    </div>
  );
};

export default TimingSlots;
