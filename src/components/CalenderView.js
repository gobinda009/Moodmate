import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'

const BasicDateCalendar = ({ selectedDate, setSelectedDate, darkMode }) => {
  return (
    <Card
      style={{
        maxWidth: 400,
        margin: 'auto',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: darkMode ? '#333' : '#fff', // Dark mode background
        color: darkMode ? '#f5f5f5' : '#222', // Light text in dark mode
        transition: 'all 0.3s ease',
      }}
    >
      <CardBody style={{ paddingTop: '1.5rem' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            sx={{
              '& .MuiTypography-root': { fontSize: '1.3rem' },
              '& .MuiDayCalendar-weekDayLabel': { fontSize: '1.2rem', fontWeight: 'bold' },
              '& .MuiPickersDay-root': { fontSize: '1.2rem', fontWeight: 'bold' },
              '& .MuiPickersCalendarHeader-label': { fontSize: '1.5rem', fontWeight: 'bold' },
              '& .MuiPickersArrowSwitcher-button': { fontSize: '1.2rem' },
              '& .Mui-selected': { fontSize: '1.3rem' },
              // Dark mode styles for the calendar
              '& .MuiDayCalendar-day': {
                backgroundColor: darkMode ? '#4a4a4a' : '#f0f0f0',
                color: darkMode ? '#fff' : '#222', // Make all dates white in dark mode
              },
              '& .MuiDayCalendar-daySelected': {
                backgroundColor: darkMode ? '#fba863' : '#f0b10f', // Highlight color in dark mode
              }
            }}
          />
        </LocalizationProvider>
      </CardBody>
    </Card>
  )
}

export default BasicDateCalendar
