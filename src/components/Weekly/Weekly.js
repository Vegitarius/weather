import React, { Component } from 'react';
import Day from './Day/Day';
import './Weekly.css';

class Weekly extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      weather: {}
    })
  }
  render() {
    const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let today = this.props.date.getDay();
    let days = [];
    for (let i = 0; i < 7; i++) {
      if (today + i > 6) today = today-7;
      days.push(<Day DOW={DOW[today+i]}/>)
    }
    return (
      <div id="weeklyWeather">
        {days}
      </div>
    )
  }
}

export default Weekly;