import React from 'react';
import './Week.css';
import CalDay from '../CalDay/CalDay';

const Week = (props) => {
  return (
    <div id="week-container">
      <CalDay day={props.days[0]} />
      <CalDay day={props.days[1]} />
      <CalDay day={props.days[2]} />
      <CalDay day={props.days[3]} />
      <CalDay day={props.days[4]} />
      <CalDay day={props.days[5]} /> 
      <CalDay day={props.days[6]} />
    </div>
  )
}

export default Week;