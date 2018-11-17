import React from 'react';
import './Week.css';
import Day from './Day';

const Week = () => {
  return (
    <div id="week-container">
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
    </div>
  )
}

export default Week;