import React from 'react';
import './CalDay.css';

const CalDay = (props) => {
  return (
    <div id="cal-day">
      {props.day}
    </div>
  )
}

export default CalDay;