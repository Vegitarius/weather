import React from 'react';
import './Month.css';
import Week from './Week';

const Month = (props) => {
  let month = props.date.getMonth() + 1;
  return (
    <div id="month">
      <h1>{month}</h1>
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