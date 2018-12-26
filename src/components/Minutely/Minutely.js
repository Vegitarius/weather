import React, { Component } from 'react';
import { connect } from 'react-redux';
import Minute from './Minute/Minute';
import './Minutely.css';

const mapStateToProps = state => ({
  weather: state.handleWeather.weather,
  location: state.translateLocation.location 
})

class Minutely extends Component {
  render() {
    const { weather, location } = this.props;
    let minutes = [], summary;
    if (weather) {
      console.log(weather);
      summary = weather.minutely.summary;
      for (let i = 0; i < weather.minutely.data.length; i++) {
        let minuteWeather = weather.minutely.data[i];
        minutes.push(
          <Minute 
            key = {i}
            weather = {minuteWeather}
          />
        )
      }
    }
    return (
      <div id="minutely-weather">
        <span><h2>{location}</h2>
        <p>{summary}</p></span>
        <div id='minutes-container'>{minutes}</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Minutely);