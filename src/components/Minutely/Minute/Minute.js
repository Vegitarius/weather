import React, { Component } from 'react';
import './Minute.css';

class Minute extends Component {
  getTime(hour, minute) {
    let hours = hour, suffix;
    switch(true) {
      case (hour === 0):
        hours = hour + 12;
        suffix = 'am'
        break;
      case (hour === 12):
        suffix = 'pm';
        break;
      case (hour > 12):
        hours = hour - 12;
        suffix = 'pm';
        break;
      case (hour < 12):
        suffix = 'am';
        break;
      default:
        break;
    }
    return hours + ':' + (minute < 10 ? '0' + minute : minute) + ' ' + suffix;
  }
  render() {
    const { weather } = this.props;
    const date = new Date(weather.time * 1000);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    return (
      <div className='minute'>
        <p>{this.getTime(hour, minutes)}</p>
        {weather.precipProbability === 0
          ? <p>No Precipitation</p>
          : <p>{(weather.precipProbability * 100).toFixed()}% chance of {weather.precipType || 'none'}</p>}
      </div>
    )
  }
}

export default Minute