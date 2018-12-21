import React, { Component } from 'react';
import { connect } from 'react-redux';
import Day from './Day/Day';
import FocusedDay from './FocusedDay/FocusedDay';
import './Weekly.css';

const mapStateToProps = state => ({
    date: state.setZipcode.date,
    weather: state.handleWeather.weather,
    location: state.translateLocation.location,
    focusedCard: state.handleDOWFocus.focusedCard
})

class Weekly extends Component {
  render() {
    const { weather, location, focusedCard } = this.props;
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
            dowNum={i}
            icon={dayWeather.icon}
            DOW={DOW[today+i]}
            high={dayWeather.temperatureHigh.toFixed(0)}
            low={dayWeather.temperatureLow.toFixed(0)}
          />
        )
      }}
    }
    if (focusedCard || focusedCard === 0) {
      let dayWeather = weather.daily.data[focusedCard];
      let today = focusedCard - 2;
      if (today < 0 ) today = today + 7;
      days = 
        <FocusedDay 
          key={focusedCard}
          icon={dayWeather.icon}
          DOW={DOW[today]}
          weather={dayWeather}
      />   
    }
    return (
      <div id="weekly-weather">
        <span><h2>{location}</h2>
        <p>{summary}</p></span>
        <div id='weekly-dow'>{days}</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Weekly);