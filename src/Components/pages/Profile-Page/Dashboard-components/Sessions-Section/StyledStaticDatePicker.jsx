import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { styled } from '@mui/material/styles';

export const StyledStaticDatePicker = styled(StaticDatePicker)(({ theme }) => ({
  width: '100%',
  maxWidth: '340px',
  
  '& .MuiPickersCalendarHeader-root': {
    backgroundColor: '#f8fafc',
    borderRadius: '12px 12px 0 0',
    padding: '16px',
    marginBottom: '8px',
  },
  '& .MuiPickersCalendarHeader-label': {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
  },
  '& .MuiPickersArrowSwitcher-button': {
    color: '#8b5cf6',
    padding: '8px',
    '&:hover': {
      backgroundColor: '#f3f4f6',
    },
  },
  '& .MuiDayCalendar-header': {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  '& .MuiDayCalendar-weekDayLabel': {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: '13px',
    width: '36px',
    height: '36px',
    margin: '0 3px',
  },
  '& .MuiDayCalendar-slideTransition': {
    minHeight: '250px',
  },
  '& .MuiPickersDay-root': {
    color: '#374151',
    fontWeight: '500',
    fontSize: '13px',
    width: '36px',
    height: '36px',
    margin: '0 3px 6px 3px',
    '&:hover': {
      backgroundColor: '#f3f4f6',
    },
    '&.Mui-selected': {
      backgroundColor: '#8b5cf6',
      color:'white',
      '&:hover': {
        backgroundColor: '#7c3aed',
      },
    },
    '&.MuiPickersDay-today': {
      border: '2px solid #8b5cf6',
      '&:not(.Mui-selected)': {
        backgroundColor: 'transparent',
      },
    },
  },
  '& .MuiPickersLayout-root': {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    width: '100%',
    height: 'auto',
    minHeight: '350px', 
  },
  '& .MuiPickersLayout-contentWrapper': {
    padding: '12px',
  },
  '& .MuiPickersLayout-actionBar': {
    padding: '12px 20px',
    borderTop: '1px solid #e5e7eb',
    marginTop: '0',
    paddingTop: '12px', 
    '& .MuiButton-root': {
      fontSize: '13px',
      color: '#8b5cf6',
      padding: '8px 16px',
      '&:hover': {
        backgroundColor: '#f3f4f6',
      },
    },
  },
  
  '@media (max-width: 640px)': {
    maxWidth: '100%',
    '& .MuiPickersCalendarHeader-root': {
      padding: '8px',
    },
    '& .MuiPickersCalendarHeader-label': {
      fontSize: '13px',
    },
    '& .MuiDayCalendar-weekDayLabel': {
      fontSize: '11px',
      width: '28px',
      height: '28px',
    },
    '& .MuiPickersDay-root': {
      fontSize: '11px',
      width: '28px',
      height: '28px',
      margin: '0 1px 2px 1px',
    },
    '& .MuiPickersLayout-contentWrapper': {
      padding: '4px',
    },
  },
}));