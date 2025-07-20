import React, { useState } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import SupportImg from '@/assets/Profile-Page/support.png';

export default function NeedAssistance() {
  const copyText = '+91 9876543210'; // Hardcoded text
  const [isCopied, setIsCopied] = useState(false); // State to track if text is copied

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    // <div className='pt-6 px-6 pb-10 h-[calc(100%-65px)] flex-shrink-0 overflow-y-scroll scrollbar-hide w-[100%] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
    //   <div className=''>
    //     <div className='border-[#eceef3] w-full my-6'></div>
    //     <div>
    //       <div className='text-sm font-semibold text-[#161616]'>Feeling Stuck? Need Assistance?</div>
    //       <div className='pt-1 text-xs text-[#999]'>Feel free to reach out to your (POC) whenever you need assistance or have any questions.</div>
    //       <div className='mt-4 flex justify-between items-center'>
    //         <div>
    //           <div className='text-[#555] text-xs font-medium'>Rahul Mandal</div>
    //           <div className='pt-1 font-bold text-[#161616] text-xs'>
    //             {copyText}
    //           </div>
    //         </div>
    // <div className='relative'>
    //   <div className='rounded-full border border-[#eceef3] p-1.5 hover:bg-[#eceef3] duration-150'
    //     onClick={handleCopy}>
    //     <IoCopyOutline className='w-4 h-4 cursor-pointer'/>
    //   </div>
    //   {isCopied && (
    //     <div className='absolute top-full mt-1 text-xs text-gray-600'>
    //       copied
    //     </div>
    //   )}
    // </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className=" m-1 rounded-t-md relative shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] ">
      <div className="bg-gray-200 rounded-t-md p-3 flex flex-col gap-2 ">
        <h2 className="text-[16px] font-semibold text-black">
          Feeling Stuck? Need Assistance?
        </h2>
        <p className="text-[11px]">
          Feel free to reach out to your (POC) whenever you need assistance or
          have any questions.
        </p>
      </div>
      <div className="relative px-3 py-3">
        <div className="flex flex-col gap-0.5 my-1">
          <div className="text-[#555] text-[16px] font-medium">Nandan G N</div>
          <div className="font-bold text-[#161616] text-[14px]">{copyText}</div>
        </div>
        <div
          className="rounded-full w-[125px] flex flex-row items-center justify-center gap-1 border border-gray-700 py-1.5 px-1 hover:bg-[#eceef3]  duration-150"
          onClick={handleCopy}
        >
          <IoCopyOutline className="w-3 h-3 cursor-pointer" />
          <p className="text-[11px]">{copyText}</p>
        </div>
        {isCopied && (
          <div className="absolute top-full mt-1 text-xs text-gray-600">
            copied
          </div>
        )}
        <div className="absolute bottom-0 right-0 w-[100px]">
          <img src={SupportImg} />
        </div>
      </div>
    </div>
  );
}
