import React from 'react';
import './Month.css';
import Week from './Week';

const Month = (props) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthNum = props.date.getMonth();
  let monthName = months[monthNum];

  return (
    <div id="month">
      <h1>{monthName}</h1>
      <span>S</span>
      <span>M</span>
      <span>T</span>
      <span>W</span>
      <span>T</span>
      <span>F</span>
      <span>S</span>
      <Week />
      <Week />
      <Week />
      <Week />
      <Week />
    </div>
  )
}

export default Month;