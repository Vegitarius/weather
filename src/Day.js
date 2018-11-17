import React from 'react';
import './Day.css';

const Day = () => {
  const date = new Date().getDay();
  return (
    <div id="day">
      {date}
    </div>
  )
}

export default Day;