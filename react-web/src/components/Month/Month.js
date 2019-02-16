import React from 'react';
import './Month.css';
import Week from './Week/Week';

const Month = (props) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
  let monthNum = props.date.getMonth();
  let year = props.date.getFullYear();
  let monthName = months[monthNum];
  let firstDow = new Date(year, monthNum, 1).getDay();
  let lastDayOfMonth = new Date(year, monthNum + 1, 0).getDate();
  let month = [];
  let buffer = -1;

  // builds caldendar
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

// For properly displaying number of weeks in month (for months starting on sunday for instance)
  let weekFive, weekSix;

  if (month[28] !== "") {
    weekFive = (
      <Week days={month.slice(28, 35)} />
    )
  }

  if (month[35] !== "") {
    weekSix = (
      <Week days={month.slice(35)} />
    )
  }

  return (
    <div id="month" className="flex-c text-c">
    {/*  Month and Year for historical Weather Data, needs functionality */}
      <h1 id="cal-month" className="flex-c">
        <p className="arrow left"></p>
        {monthName}
        <p className="arrow right"></p>
      </h1>
      <h3 id="cal-year" className="flex-c">
        <p className="arrow left"></p>
        {year}
        <p className="arrow right"></p>
      </h3>
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