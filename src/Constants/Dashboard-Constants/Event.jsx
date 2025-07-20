import { FaChalkboardTeacher, FaUserFriends, FaUserTie } from 'react-icons/fa';
import {  FiAward, FiBriefcase, FiSmile } from 'react-icons/fi';
import { MdOutlineCategory } from 'react-icons/md';

export const sessionTypes = [
  { value: '1-1', label: 'One-on-One', icon: <FaUserTie/> },
  { value: '1-n', label: 'One-to-Many', icon: <FaUserFriends /> },
  { value: 'group', label: 'Group Session', icon: <FaUserFriends /> },
  { value: 'workshop', label: 'Workshop', icon: <FaChalkboardTeacher /> }
];

  export const categories = [
    { value: 'technology', label: 'Technology', icon: <MdOutlineCategory  /> },
    { value: 'spirituality', label: 'Spirituality', icon: <FiAward  /> },
    { value: 'health & fitness', label: 'Health & Fitness', icon: <FiSmile  /> },
    { value: 'business', label: 'Business', icon: <FiBriefcase  /> }
  ];


  