import React, { Component } from 'react';
import { connect } from 'react-redux';
import Day from './Day/Day';
import './Weekly.css';

const mapStateToProps = state => {
  return {
    date: state.setZipcode.date,
    weather: state.handleWeather.weather
  }
}
class Weekly extends Component {
  render() {
    const { weather } = this.props;
    console.log(weather)
    const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let days = [], summary;
    if (this.props.date) {
      let today = this.props.date.getDay();
      for (let i = 0; i < 7; i++) {
        if (today + i > 6) today = today-7;
        days.push(
          <Day 
            key={i} 
            DOW={DOW[today+i]}
            // high={}
          />
        )
      }
    }
    if (weather) {
      summary = weather.daily.summary
    }
    return (
      <div id="weeklyWeather">
        {summary}
        {days}
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Weekly);