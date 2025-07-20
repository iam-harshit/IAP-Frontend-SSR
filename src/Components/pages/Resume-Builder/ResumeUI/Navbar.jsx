import React from 'react';

function Navbar({ setPopupVisible, setPreviewToggle }) {
  return (
    <>
      <div className=" bg-white  lg:ml-0  static w-[95%] md:w-[70%] flex lg:items-center justify-between  px-2  py-3 lg:py-0 lg:pb-3 md:justify-between md:px-[30px]  md:pt-[30px] ">
        <button
          onClick={() => setPopupVisible(true)}
          className="flex items-center gap-2 shadow-[#9333ea] shadow-md  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500  hover:border-transparent rounded lg:ml-[40px]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 20H20C20.552 20 21 19.552 21 19C21 18.448 20.552 18 20 18H12C11.448 18 11 18.448 11 19C11 19.552 11.448 20 12 20ZM9 15C9 14.448 8.552 14 8 14H4C3.448 14 3 14.448 3 15V19C3 19.552 3.448 20 4 20H8C8.552 20 9 19.552 9 19V15ZM5 16V18H7V16H5ZM12 16H20C20.552 16 21 15.552 21 15C21 14.448 20.552 14 20 14H12C11.448 14 11 14.448 11 15C11 15.552 11.448 16 12 16ZM21 5C21 4.448 20.552 4 20 4H4C3.448 4 3 4.448 3 5V11C3 11.552 3.448 12 4 12H20C20.552 12 21 11.552 21 11V5ZM5 6V10H19V6H5Z"
              fill="blue-500"
            ></path>
          </svg>
          <span className="">Templates</span>
        </button>

        <button
          onClick={() => {
            setPreviewToggle((previousToggleState) => !previousToggleState);
          }}
          className=" lg:hidden flex items-center gap-2 shadow-[#9333ea] shadow-md  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-3 py-2  border border-blue-500 hover:border-transparent rounded-[50%]"
        >
          <svg
            className="w-[20px] h-[25px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}

export default Navbar;
