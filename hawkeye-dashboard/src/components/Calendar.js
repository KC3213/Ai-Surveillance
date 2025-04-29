import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="page-container">
      <h1>Calendar</h1>
      <div className="calendar-container">
        <Calendar
          onChange={onChange}
          value={date}
          className="react-calendar"
        />
      </div>
    </div>
  );
};

export default CalendarComponent; 