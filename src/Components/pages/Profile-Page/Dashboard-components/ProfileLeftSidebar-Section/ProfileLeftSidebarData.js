import { GoPeople } from 'react-icons/go';
import { HiOutlinePhone } from 'react-icons/hi';
import { MdEventAvailable } from 'react-icons/md';
// import { GiReceiveMoney } from 'react-icons/gi';
import { IoHome } from 'react-icons/io5';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { ImBlog } from "react-icons/im";
import { FaBook } from 'react-icons/fa';
import premiumIcon from '@/assets/DashboardAssets/crown.png';

export const mentorNavLinks = [
  {
    id: 'home',
    icon: IoHome,
    label: 'Home',
    section: 'home',
  },
  {
    id: 'profile',
    icon: GoPeople,
    label: 'Profile Section',
    isDropdown: true,
    subItems: [
      { id: 'about', label: 'Background Details', section: 'background-details' },
      { id: 'certification', label: 'Certification Details', section: 'certification-details' },
      { id: 'career', label: 'Professional Details', section: 'professional-details' },
      { id: 'mentor', label: 'Mentor Details', section: 'mentor-details' },
    ],
  },
  {
    id: 'event',
    icon: MdEventAvailable,
    label: 'Events',
    isDropdown: true,
    subItems: [
      { id: 'create', label: 'Create Event', section: 'create-event' },
      { id: 'view', label: 'View Event', section: 'view-event' },
      { id: 'manage', label: 'Manage Events', section: 'manage-events' },
    ],
  },
  {
    id: 'my-blogs',
    icon: ImBlog,
    label: 'My Blogs',
    section: 'my-blogs',
  },
  // {
  //   id: 'sessions',
  //   icon: HiOutlinePhone,
  //   label: 'My Sessions',
  //   section: 'session',
  // },
  // {
  //   id: 'pricing',
  //   icon: MdLocalOffer,
  //   label: 'Pricing & Offerings',
  //   section: 'pricing-offering',
  // },
  {
    id: 'payments',
    icon: FaIndianRupeeSign,
    label: 'Payments',
    isDropdown: true,
    subItems: [
      { id: 'account', label: 'Bank Details', section: 'bank-details' },
      { id: 'transaction', label: 'Transaction History', section: 'transaction-history' },
    ],
  },
  {
    id: 'lefi',
    icon: FaBook,
    label: 'LEFI',
    section: 'lefi',
    premiumIcon: premiumIcon,
  },

];

export const menteeNavLinks = [
  {
    id: 'home',
    icon: IoHome,
    label: 'Home',
    section: 'home',
  },
  {
    id: 'profile',
    icon: GoPeople,
    label: 'Profile Section',
    isDropdown: true,
    subItems: [
      { id: 'about', label: 'Background Details', section: 'background-details' },
      { id: 'certification', label: 'Certification Details', section: 'certification-details' },
      { id: 'career', label: 'Professional Details', section: 'professional-details' },
      { id: 'mentee', label: 'Mentee Details', section: 'mentee-details' },
    ],
  },
  {
    id: 'payments',
    icon: FaIndianRupeeSign,
    label: 'Payments',
    section: 'transaction-history',
  },
  {
    id: 'my-blogs',
    icon: FaBook,
    label: 'My Blogs',
    section: 'my-blogs',
  },
  {
    id: 'manage-event',
    icon: MdEventAvailable,
    label: 'Manage Events',
    section: 'manage-events'
  },
  {
    id: 'lefi',
    icon: FaBook,
    label: 'LEFI',
    section: 'lefi',
    premiumIcon: premiumIcon,
  },
];
