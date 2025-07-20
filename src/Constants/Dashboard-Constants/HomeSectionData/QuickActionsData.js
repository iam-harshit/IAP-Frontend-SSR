import { MdOutlinePeopleAlt } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';
import { MdOutlineEventNote } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';

export const mentorActions = [
  {
    id: 1,
    icon: CiUser,
    title: 'Enhance Profile',
    description: 'Set your profile ',
    path: '/dashboard/background-details',
  },
  {
    id: 2,
    icon: MdOutlinePeopleAlt,
    title: 'Schedule Session',
    description: 'Set slots for your mentees',
    path: '/dashboard/create-event',
  },
  {
    id: 3,
    icon: MdOutlineEventNote,
    title: 'My Payments',
    description: 'See all your payments here',
    path: '/dashboard/transaction-history',
  },
  {
    id: 4,
    icon: SlCalender,
    title: 'My Sessions',
    description: '1:1 mentoring session',
    path: '/dashboard/view-event',
  },
];

export const menteeActions = [
  {
    id: 1,
    icon: CiUser,
    title: 'Enhance Profile',
    description: 'Set your profile ',
    path: '/dashboard/background-details',
  },
  {
    id: 2,
    icon: MdOutlinePeopleAlt,
    title: 'Schedule Session',
    description: '1:1 mentoring session',
    path: '/explore-mentors',
  },
  {
    id: 3,
    icon: MdOutlineEventNote,
    title: 'My Payments',
    description: 'See all  payments here',
    path: '/dashboard/payment',
  },
  {
    id: 4,
    icon: SlCalender,
    title: 'My Sessions',
    description: 'See all  sessions here',
    path: '/dashboard/manage-events',
  },
];
