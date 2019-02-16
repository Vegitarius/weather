import React, { Component } from 'react';
import findIcon from '../../findIcon';
import './Hour.css';

class Hour extends Component {
  handleDate(hour) {
    switch(true) {
      case (hour === 0):
        return hour + 12 + 'am';
      case (hour === 12):
        return hour + 'pm'
      case (hour < 12):
        return hour + 'am';
      case (hour > 12):
        return hour - 12 + 'pm'
      default:
        return hour;
    }
  }
  render() {
    const { weather } = this.props;
    const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let date = new Date(weather.time*1000);
    let day = date.getDay();
    let hour = date.getHours();
    let dayIcon = findIcon(weather.icon)
    
    return (
      <div className='hour'>
        {dayIcon}
        <h2 className='hour-date'>{DOW[day]} {this.handleDate(hour)}</h2>
        <p className='hour-summary'>{weather.summary}</p>
        <p className='hour-temp'>{weather.temperature.toFixed(0)}&deg;</p>
      </div>
    )
  }
}

export default Hour;