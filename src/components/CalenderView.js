import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Ensure English locale is loaded

const moodColors = {
  happy: '#fbc531',
  sad: '#487eb0',
  angry: '#e84118',
  neutral: '#7f8fa6',
  excited: '#e1b12c',
  sick: '#8e44ad', // Added color for "sick"
};

const BasicDateCalendar = ({ selectedDate, setSelectedDate, darkMode }) => {
  const [savedMoods, setSavedMoods] = useState([]);

  // Load mood entries and listen for storage changes
  useEffect(() => {
    const loadEntries = () => {
      const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
      setSavedMoods(entries);
    };
    
    loadEntries(); // Initial load
    window.addEventListener('storage', loadEntries); // Update when storage changes
    return () => window.removeEventListener('storage', loadEntries);
  }, []);

  const renderDay = (date, selectedDates, pickersDayProps) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    
    // Find matching mood entry (with proper date parsing)
    const moodEntry = savedMoods.find(entry => {
      // Parse stored date with explicit format and locale
      const entryDate = dayjs(entry.date, 'MMMM D, YYYY', 'en').format('YYYY-MM-DD');
      return entryDate === formattedDate;
    });

    // Debugging: Log the date comparison
    console.log('Calendar Date:', formattedDate);
    console.log('Stored Entries:', savedMoods);
    console.log('Matched Entry:', moodEntry);

    return (
      <PickersDay
        {...pickersDayProps}
        sx={{
          backgroundColor: moodEntry 
            ? `${moodColors[moodEntry.mood]} !important` // Force override
            : pickersDayProps.backgroundColor,
          color: moodEntry ? '#fff' : pickersDayProps.color,
          '&:hover': {
            backgroundColor: moodEntry
              ? `${moodColors[moodEntry.mood]} !important`
              : (darkMode ? '#666' : '#e0e0e0'),
            color: darkMode ? '#fff' : '#222',
          },
        }}
      />
    );
  };

  return (
    <Card
      style={{
        maxWidth: 400,
        margin: 'auto',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: darkMode ? '#333' : '#fff',
        color: darkMode ? '#f5f5f5' : '#222',
        transition: 'all 0.3s ease',
      }}
    >
      <CardBody style={{ paddingTop: '1.5rem' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            renderDay={renderDay}
            sx={{
              '& .MuiTypography-root': { fontSize: '1.3rem' },
              '& .MuiDayCalendar-weekDayLabel': { fontSize: '1.2rem', fontWeight: 'bold' },
              '& .MuiPickersDay-root': { fontSize: '1.2rem', fontWeight: 'bold' },
              '& .MuiPickersCalendarHeader-label': { fontSize: '1.5rem', fontWeight: 'bold' },
              '& .MuiPickersArrowSwitcher-button': { fontSize: '1.2rem' },
              '& .Mui-selected': { fontSize: '1.3rem' },
              '& .MuiDayCalendar-day': {
                backgroundColor: darkMode ? '#444' : '#f0f0f0',
                color: darkMode ? '#fff' : '#222',
              },
              '& .MuiDayCalendar-daySelected': {
                backgroundColor: darkMode ? '#fba863' : '#f0b10f',
                color: darkMode ? '#222' : '#fff',
              },
            }}
          />
        </LocalizationProvider>
      </CardBody>
    </Card>
  );
};

export default BasicDateCalendar;