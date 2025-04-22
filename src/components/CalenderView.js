import * as React from 'react';
import { Card, CardBody } from 'reactstrap';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function BasicDateCalendar() {
    return (
        <Card style={{ maxWidth: 400, margin: 'auto', marginTop: '40px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardBody style={{ paddingTop: '1.5rem' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        sx={{
                            '& .MuiTypography-root': {
                                fontSize: '1.3rem', // Default text like month/year
                            },
                            '& .MuiDayCalendar-weekDayLabel': {
                                fontSize: '1.2rem', // Weekday labels (Sun, Mon, etc.)
                                fontWeight: 'bold',
                            },
                            '& .MuiPickersDay-root': {
                                fontSize: '1.2rem',
                                fontWeight: 'bold', // Make the days bold
                            },
                            '& .MuiPickersCalendarHeader-label': {
                                fontSize: '1.5rem', // Month and year label
                                fontWeight: 'bold',
                            },
                            '& .MuiPickersArrowSwitcher-button': {
                                fontSize: '1.2rem', // Arrows
                            },
                            '& .Mui-selected': {
                                fontSize: '1.3rem', // Selected date
                            },
                        }}
                    />
                </LocalizationProvider>
            </CardBody>
        </Card>
    );
}