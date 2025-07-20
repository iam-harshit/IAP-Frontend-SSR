import React from 'react'; // Import the useState hook from React
import { useState } from 'react'; // Import the useState hook from React
import { formatFullDate, formatMonthAndDay } from './DateFormat'; // Import the date formatting functions
import ScheduledIcon from '@/assets/DashboardAssets/ScheduledIcon.svg';
import CancelIcon from '@/assets/DashboardAssets/CancelIcon.svg';
import CompletedIcon from '@/assets/DashboardAssets/CompletedIcon.svg';
import CalendarIcon from '@/assets/DashboardAssets/CalendarIcon.svg';
import CopyIcon from '@/assets/DashboardAssets/CopyIcon.svg';
import EmailIcon from '@/assets/DashboardAssets/EmailIcon.svg';
import ProfileIcon from '@/assets/DashboardAssets/ProfileIcon.svg';
import GroupProfileIcon from '@/assets/DashboardAssets/GroupProfileIcon.svg';
import CancelSession from './CancelSession';
import Reschedule from './Reschedule';
import { handleFetchSlots } from '@/services/Operations/SlotsOperation/SlotsApi';
import { Tooltip } from 'react-tooltip';

const DetailSessionCard = ({
  session,
  onCopyClick,
  toggleDetails,
  role,
  credit,
}) => {
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [reschedule, setReschedule] = useState(false)


  const handleReschedule = async () => {
    try {
     const response = await handleFetchSlots(session?.userName);
     const { success, message} = response;
     if (!success) {
       throw new Error(message || "Failed to retrieve mentor schedule");
     }
    } catch (error) {
      return error;
    }
  };

  const isCancellable = () => {
    if (!session?.sessionDate || !session?.sessionTime) return false;

    const sessionDateTime = new Date(
      `${session.sessionDate}T${session.sessionTime}`
    );
    const now = new Date();
    const diffInMs = sessionDateTime - now;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours >= 6;
  };

  return (
    <div className="mb-3">
      <div className=" border-l-[7px] p-2 rounded-[4px] pl-2 xs:pl-4 border-customPurple">
        <div className="w-[54px] h-[17px] font-bold text-caption leading-[16.34px] text-[#A4A7AB] ml-4 mb-2 xs:mb-0">
          {role === 'mentee' ? 'Mentor' : 'Mentee'}
        </div>
        <div className="flex lg:items-center lg:flex-row flex-col gap-2 lg:gap-0 items-start">
          <div className="flex flex-col gap-2 p-1 ml-4 basis-[65%]">
            <div className="flex items-center lg:-mt-10  ">
              <div className="mr-2 xs:mr-5">
                {session?.profilePictureUrl ? (
                  <img
                    src={session?.profilePictureUrl}
                    className="w-[24px] h-[24px] min-w-[20px] min-h-[20px] sm:w-[35px] sm:h-[35px] rounded-full object-cover"
                    alt="Profile"
                  />
                ) : false ? (
                  <img
                    src={GroupProfileIcon}
                    className="xs:w-[25px] xs:h-[25px] w-[22px] h-[17px] rounded"
                    alt="Group Profile"
                  />
                ) : (
                  <img
                    src={ProfileIcon}
                    alt="Default Profile"
                    className="xs:w-[25px] xs:h-[25px] w-[22px] h-[17px] rounded"
                  />
                )}
              </div>
              <h2 className=" min-w-[90px] min-h-[23px] text-h5 leading-[20.57px] text-[#66676B] font-bold tracking-wide mr-1 xs:mr-3 ">
                {session?.fullName}
              </h2>

              <div className="w-[46px] h-[21px] rounded-3xl border-[1px] bg-[#F4E8FE] border-[#DFC5F8] flex items-center justify-center mr-4">
                <div className="w-[30px] h-[16px] font-semibold text-[10px] leading-[12.1px] text-[#000000] text-center mt-1 ">
                  1:1
                </div>
              </div>

              <div
                className={`flex items-center justify-center gap-1 w-[89px] h-[21px] border-[1px] border-[#E2C4FF] rounded-3xl 
                                          ${session?.sessionStatus === 'Scheduled' ? 'bg-[#F9FF8E]' : ''}
                                          ${session?.sessionStatus === 'Cancelled' ? 'bg-[#FFBFC1] ' : ''}
                                          ${session?.sessionStatus === 'Completed' ? 'bg-[#C5FFC1] ' : ''}`}
              >
                {session?.sessionStatus === 'Scheduled' && (
                  <img src={ScheduledIcon} alt=""></img>
                )}
                {session?.sessionStatus === 'Cancelled' && (
                  <img src={CancelIcon} alt=""></img>
                )}
                {session?.sessionStatus === 'Completed' && (
                  <img src={CompletedIcon} alt=""></img>
                )}
                <div className="w-[56px] h-[16px] font-semibold text-[10px] leading-[12.1px] text-[#000000] mt-1">
                  {session?.sessionStatus}
                </div>
              </div>
            </div>

            <div className="flex items-center ">
              <img src={CalendarIcon} alt=""></img>

              <p className="w-auto h-[17px] font-semibold text-caption leading-[14.16px] text-[#A5A7A9] ml-3 mt-1">
                {formatFullDate(session?.sessionDate, session?.sessionTime)}
              </p>
            </div>

            <p className="w-[102px] h-[19px] text-h6 leading-[18.27px] font-semibold text-[#ABAEB2] ">
              Mentor Email{' '}
            </p>
            <div className="flex w-fit h-[33px] rounded-[6px] border-[1px] bg-[#FAFAFA] border-[#E3E3E3] justify-around items-center gap-2">
              <div className="ml-3 mt-1">
                <img src={EmailIcon} />
              </div>
              <div className="border-r-[2px] h-[21px] border-[#7B00FF] "></div>
              <div className="h-[21px] w-[220px] font-semibold text-h6 leading-[18.4px] text-[#77787A] mt-1">
                {session?.email}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-3 w-full justify-start ml-5 lg:ml-0">
              {role === 'mentee' && session?.sessionStatus === 'Scheduled' && (
                <div
                  className="border-[1px] border-[#9E6DFF] bg-[#F4E8FE] rounded-[5px] w-fit py-2 px-3 ml-5 lg:ml-0 flex items-center justify-center"
                  onClick={() => setReschedule(true)}
                >
                  <button
                    className="leading-[14px] text-[10px] font-semibold   text-[#5100FF]"
                    onClick={handleReschedule}
                  >
                    Reschedule
                  </button>
                </div>
              )}
              {reschedule && (
                <Reschedule
                  reschedule={reschedule}
                  setReschedule={setReschedule}
                  session={session}
                  toggleDetails = {toggleDetails}
                />
              )}
              {session?.sessionStatus === 'Scheduled' && (
                <div
                  className="border-[1px] border-[#9E6DFF] bg-[#F4E8FE] rounded-[5px] w-fit py-2 px-3 flex items-center justify-center"
                  onClick={() => setShowCancelModal(true)}
                  title={
                    !isCancellable
                      ? 'Cannot cancel within 6 hours of session'
                      : ''
                  }
                >
                  <button
                    id="cancel-button"
                    className={`leading-[14px] text-[10px] font-semibold   ${
                      isCancellable() ? 'text-[#FF0004]' : 'text-gray-400'
                    }`}
                    disabled={!isCancellable()}
                    data-tooltip-id="cancel-tooltip"
                  >
                    Cancel Session
                  </button>
                  {!isCancellable() && (
                    <Tooltip
                      id="cancel-tooltip"
                      place="top"
                      effect="solid"
                      className="text-caption"
                    >
                      You can't cancel within 6 hours of the session
                    </Tooltip>
                  )}
                </div>
              )}
              {showCancelModal && isCancellable() && (
                <CancelSession
                  setShowCancelModal={setShowCancelModal}
                  session={session}
                  credit={credit}
                />
              )}
            </div>

            <div className=" basis-[35%] h-[165px] mb-3 lg:mb-0 rounded-[5px] border-[0.2px] bg-[#FFFFFF] border-[#3f3f3f] p-3 flex flex-col gap-2 ml-5 lg:ml-0">
              <div className="flex gap-1 ">
                <div className="w-[62px] h-[45px] text-[#505050] border-r-[0.2px] border-r-[#000000]">
                  {formatMonthAndDay(session?.sessionDate)}
                </div>
                <div className=" ml-2 h-[34.89pxpx] font-extralight text-caption leading-[19px] text-[#000000] ">
                  {' '}
                  {session?.sessionDescription?.length > 100
                    ? session?.sessionDescription?.slice(0, 100) + '...'
                    : session?.sessionDescription}
                </div>
              </div>
              <div className="flex ml-5  flex-col xs:flex-row justify-start  ">
                <span className="w-[103.89px] h-[14.85px] font-semibold text-caption leading-[14.52px] text-[#B1B3B7]">
                 Topic:
                </span>
                <div className="w-auto h-[16.34px] font-semibold text-caption leading-[15.73px] text-[#737477] xs:-ml-4 ">
                  {session?.sessionName}
                </div>
              </div>

              <div className="flex items-center mt-2 flex-col gap-2 xs:gap-0 xs:flex-row ml-5  ">
                <div className="flex items-center w-[200px] sm:w-[244px] h-[36px] rounded-[9px] border-[1px] border-[#ECECEC] p-2 bg-[#FDFDFD]">
                  <span className="w-[192.63px] h-[18px] font-semibold text-[10px] leading-[13px] text-[#8A8B8C] mt-1">
                    {' '}
                    https://meet.google.com
                  </span>
                  <button
                    className="p-2"
                    onClick={() => onCopyClick(session.meetLink)}
                  >
                    <img src={CopyIcon} alt=""></img>
                  </button>
                </div>
                <div className="w-[60px] sm:w-[89px] h-[24px] border-[1px] rounded-[3px] border-[#DFC5F8]  bg-[#7DFF73] flex items-center justify-center ml-2">
                  <button
                    className="w-[56px] h-[18.29px] font-semibold text-[10px] leading-[12.1px] text-[#000000] "
                    onClick={() => {
                      window.open(session.meetLink, '_blank'); // Open meet link in new tab
                    }}
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-5 flex flex-col">
          <p className="w-[125px] h-[19px] font-semibold text-h6 leading-[17.67px] text-[#AAACAF] mb-2">
            Notes/Resources
          </p>
          <div className="min-h-[157px] rounded-[10px] border-[1px] bg-[#FBFBFB] border-[#717171] p-4 flex items-center justify-center">
            <p className="text-h3 md:text-h4 font-bold text-purple-700 animate-pulse">
              COMING SOON
            </p>
          </div>
        </div>
      </div>

      <div className="pl-2 xs:pl-4">
        <div className="w-[81px] h-[30px] border-[1px] bg-[#FEFEFE] border-[#D8D9DE] rounded-md flex items-center justify-center mx-auto">
          <button
            className="text-caption font-semibold leading-[14.4px] text-[#80848A]"
            onClick={() => toggleDetails(session?.sessionId)}
          >
            Hide Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailSessionCard;
