import React from 'react';
import './Month.css';
import Week from './Week';

const Month = (props) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
  let monthNum = props.date.getMonth();
  let year = props.date.getFullYear();
  let monthName = months[monthNum];
  let firstDow = new Date(year, monthNum, 1).getDay();
  let lastDayOfMonth = new Date(year, monthNum + 1, 0).getDate();
  let month = [];
  let buffer = -1;

  for(let i = 0; i <= 41; i++) {
    if(i < firstDow) {
      buffer++;
      month.push("");
    } else if (i > lastDayOfMonth + buffer) {
      month.push("");
    } else {
      month.push(i - buffer);
    }
  };

  let weekFive, weekSix;

  if(month[28] !== "") {
    weekFive = (
      <Week days={month.slice(28, 35)} />
    )
  }

  if(month[35] !== "") {
    weekSix = (
      <Week days={month.slice(35)} />
    )
  }

  return (
    <div id="month">
      <h1 id="cal-month">{monthName}</h1>
      <h3 id="cal-year">{year}</h3>
      <span>S</span>
      <span>M</span>
      <span>T</span>
      <span>W</span>
      <span>T</span>
      <span>F</span>
      <span>S</span>
      <Week days={month.slice(0, 7)} />
      <Week days={month.slice(7, 14)} />
      <Week days={month.slice(14, 21)} />
      <Week days={month.slice(21, 28)} />
      {weekFive}
      {weekSix}
    </div>
  )
}

export default Month;