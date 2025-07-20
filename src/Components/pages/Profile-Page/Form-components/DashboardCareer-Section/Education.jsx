import React from 'react';
import Input from '@/Components/common/Input';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';

const Education = ({ education, onChange, formData, setFormData }) => {
  const minDate = dayjs('1900');
  const today = dayjs().startOf('day');
  return (
    <div className="flex flex-wrap gap-2 p-2">
      <div className="w-full flex flex-col justify-between">
        {/* Degree input */}
        {education &&
          education?.map((educations, index) => (
            <Input
              key={index}
              type={educations.type}
              name={educations.name}
              placeholder={educations.placeholder}
              value={educations.value}
              onChange={onChange}
            />
          ))}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <label className="text-xs font-medium my-3 text-[#8800ff]">
            Start Date
          </label>
          <Box display="grid" gap={2}>
            <DatePicker
              views={['year']}
              format="YYYY" 
             value={formData.startYear ? dayjs(`${formData.startYear}`, 'YYYY') : null}
              onChange={(newStart) =>
                setFormData({
                  ...formData,
                  startYear: newStart ? newStart.year() : '',
                })
              }
              minDate={minDate}
              maxDate={today}
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
                      fontSize: '1.2rem',
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
              views={['year']}
              format="YYYY" 
              value={
                formData.currentlyWorking
                  ? null
                  : formData.endYear ? dayjs(`${formData.endYear}`, 'YYYY') : null
              }
              onChange={(newEnd) =>
                setFormData({
                  ...formData,
                  endYear: newEnd ? newEnd.year() : '',
                })
              }
              minDate={formData.startYear ? dayjs(`${formData.startYear}`, 'YYYY') : minDate}
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
          </Box>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Education;
