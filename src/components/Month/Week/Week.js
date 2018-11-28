import React from 'react';
import './Week.css';
import Day from '../Day/Day';

const Week = (props) => {
  return (
    <div id="week-container">
      <Day day={props.days[0]} />
      <Day day={props.days[1]} />
      <Day day={props.days[2]} />
      <Day day={props.days[3]} />
      <Day day={props.days[4]} />
      <Day day={props.days[5]} /> 
      <Day day={props.days[6]} />
    </div>
  )
}

export default Week;