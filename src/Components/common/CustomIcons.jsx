import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';
import * as HiIcons from 'react-icons/hi';

// Import other needed icon sets

export const CustomIcons = ({ Icon }) => {
  const Iconii =
    FaIcons[Icon] || IoIcons[Icon] || MdIcons[Icon] || HiIcons[Icon]; // Add more sets if needed

  return Iconii ? (
    <Iconii className="inline-block py-1 px-[0.01rem] h-6 w-6" />
  ) : null;
};
