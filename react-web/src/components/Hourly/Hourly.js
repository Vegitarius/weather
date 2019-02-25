import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hour from './Hour/Hour';
import './Hourly.css';

const mapStateToProps = state => ({
  weather: state.handleWeather.weather,
  location: state.translateLocation.location,
})

class Hourly extends Component {
  render() {
    document.title = 'Hourly Weather4-u'
    const { weather, location } = this.props;
    let hours = [], summary;

    if (weather) {
      // console.log(weather);
      summary = weather.hourly.summary;
      for (let i = 0; i < weather.hourly.data.length; i++) {
        let hourWeather = weather.hourly.data[i];
        hours.push(
          <Hour 
            key = {i}
            weather = {hourWeather}
          />
        )
      }
    }
    
    return (
      <div id='hourly-weather'>
        <span><h1>{location}</h1>
        <p>{summary}</p></span>
        <div id='hourly-hour'>
          {hours}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Hourly);