import React, { useState, useEffect } from 'react';
import Input from '@/Components/common/Input';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';

const Career = ({ career, onChange, formData, setFormData }) => {
  const minDate = dayjs('1900');
  const maxDate = dayjs();

  const [error, setError] = useState('');

  // Handle Start Date
  const handleStartDateChange = (newValue) => {
    if (newValue) {
      const newStart = newValue.format('YYYY-MM-DD');

      // Check if start > end
      if (
        formData.c_endDate &&
        dayjs(newStart).isAfter(dayjs(formData.c_endDate))
      ) {
        setError('Start Date cannot be after End Date!');
      } else {
        setError('');
        setFormData({ ...formData, c_startDate: newStart });
      }
    } else {
      setFormData({ ...formData, c_startDate: '' });
    }
  };

  // Handle End Date
  const handleEndDateChange = (newValue) => {
    if (newValue) {
      const newEnd = newValue.format('YYYY-MM-DD');

      // Check if end < start
      if (
        formData.c_startDate &&
        dayjs(newEnd).isBefore(dayjs(formData.c_startDate))
      ) {
        setError('End Date cannot be before Start Date!');
      } else {
        setError('');
        setFormData({ ...formData, c_endDate: newEnd });
      }
    } else {
      setFormData({ ...formData, c_endDate: '' });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-2">
      <div className="w-full flex flex-col justify-between">
        {career &&
          career?.map((careers, index) => (
            <Input
              key={index}
              currentlyWorking={formData?.currentlyWorking}
              type={careers.type}
              name={careers.name}
              placeholder={careers.placeholder}
              value={careers.value}
              onChange={onChange}
              formData={formData}
            />
          ))}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <label className="text-xs font-medium my-3 text-[#8800ff]">
            Start Date
          </label>
          <Box display="grid" gap={2}>
            <DatePicker
              value={formData.c_startDate ? dayjs(formData.c_startDate) : null}
              onChange={handleStartDateChange}
              minDate={minDate}
              maxDate={
                formData.c_endDate &&
                dayjs(formData.c_endDate).isBefore(dayjs())
                  ? dayjs(formData.c_endDate)
                  : dayjs()
              }
              views={['year', 'month', 'day']}
              slotProps={{
                textField: {
                  inputProps: { readOnly: true },
                  variant: 'standard',
                  fullWidth: true,
                  sx: {
                    '& .MuiInputBase-root': {
                      border: '2px solid #8B5CF6',
                      borderRadius: '0.5rem',
                      padding: '0.4rem 0.75rem',
                      backgroundColor: 'white',
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '0.875rem',
                      padding: 0,
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: '1.2rem', // 16px
                    },
                    '& .MuiInput-underline:before': {
                      borderBottom: 'none',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottom: 'none',
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                      borderBottom: 'none',
                    },
                    '& .MuiInputLabel-root': {
                      transform: 'translate(0.75rem, -0.5rem) scale(0.75)',
                      fontSize: '0.75rem',
                      color: '#8B5CF6',
                    },
                  },
                },
              }}
            />
            <label className="text-xs font-medium text-[#8800ff]">
              End Date
            </label>
            <DatePicker
              value={
                formData.currentlyWorking
                  ? null
                  : formData.c_endDate
                    ? dayjs(formData.c_endDate)
                    : null
              }
              disabled={formData?.currentlyWorking}
              onChange={handleEndDateChange}
              minDate={
                formData.c_startDate ? dayjs(formData.c_startDate) : minDate
              }
              maxDate={maxDate}
              views={['year', 'month', 'day']}
              slotProps={{
                textField: {
                  inputProps: { readOnly: true },
                  variant: 'standard', // Remove MUI outlined/border variant
                  fullWidth: true,
                  sx: {
                    '& .MuiInputBase-root': {
                      border: '2px solid #8B5CF6',
                      borderRadius: '0.5rem',
                      padding: '0.4rem 0.75rem',
                      backgroundColor: 'white',
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: '1.2rem', // 16px
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '0.875rem',
                      padding: 0,
                    },
                    '& .MuiInput-underline:before': {
                      borderBottom: 'none',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottom: 'none',
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                      borderBottom: 'none',
                    },
                    '& .MuiInputLabel-root': {
                      transform: 'translate(0.75rem, -0.5rem) scale(0.75)',
                      fontSize: '0.75rem',
                      color: '#8B5CF6',
                    },
                  },
                },
              }}
            />
          </Box>
        </LocalizationProvider>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <div className="flex items-center gap-3">
          <span className="text-gray-600 font-medium text-xs mt-2">
            Currently Working
          </span>
          <div className="form-check form-switch p-0">
            <label className="relative inline-flex items-center cursor-pointer mt-3">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.currentlyWorking}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentlyWorking: e.target.checked,
                    c_endDate: e.target.checked ? 'Present' : '',
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all duration-200 ease-in-out"></div>
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5 peer-checked:border-white"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
