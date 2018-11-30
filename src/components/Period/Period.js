import React from 'react';
import './Period.css';

const Period = (props) => {
  return (
    <div id="period" className="flex-c text-c size-med">
      <span>Weekly</span>
      <span>Hourly</span>
      <span>Current</span>
      <span>Minutely</span>
    </div>
  )
}

export default Period;