import React, { Component } from 'react';
import { connect } from 'react-redux';
import Day from './Day/Day';
import './Weekly.css';

const mapStateToProps = state => {
  return {
    date: state.setZipcode.date,
    weather: state.handleWeather.weather,
    location: state.translateLocation.location,
  }
}
class Weekly extends Component {
  render() {
    const { weather, location } = this.props;
    console.log(weather)
    const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let days = [], summary;
    if (this.props.date) {
      let today = this.props.date.getDay();
      if (weather) {
        summary = weather.daily.summary
        for (let i = 0; i < 8; i++) {
        if (today + i > 6) today = today-7;
        let dayWeather = weather.daily.data[i]
        days.push(
          <Day 
            key={i} 
            icon={dayWeather.icon}
            DOW={DOW[today+i]}
            high={dayWeather.temperatureHigh.toFixed(0)}
            low={dayWeather.temperatureLow.toFixed(0)}
          />
        )
      }}
    }
    return (
      <div id="weeklyWeather">
        <span><h2>{location}</h2>
        <p>{summary}</p></span>
        {days}
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Weekly);