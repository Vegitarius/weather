import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FocusedDay.css';
import { handleDOW } from '../../../actions';
import findIcon from '../../findIcon';

const mapStateToProps = state => ({
  focusedCard: state.handleDOWFocus.focusedCard,
  weather: state.handleWeather.weather,
})

const mapDispatchToProps = (dispatch) => ({
  handleDOWUpdate: (key) => dispatch(handleDOW(key))
})

class FocusedDay extends Component {
  handleAmpm(hour) {
    let hours;
    if (hour > 24) {
      hours = hour - 24;
    } else hours = hour;
    switch(true) {
      case (hours === 0):
        return hours + 12 + 'am';
      case (hours === 12):
        return hours + 'pm'
      case (hours < 12):
        return hours + 'am';
      case (hours > 12):
        return hours - 12 + 'pm'
      default:
        return hours;
    }
  }
  handleSun(hour, minute) {
    let hours, suffix;
    if (hour > 24) {
      hours = hour - 24;
    } else hours = hour;
    switch(true) {
      case (hours === 0):
        hours = hours + 12;
        suffix = 'am'
        break;
      case (hours === 12):
        suffix = 'pm';
        break;
      case (hours > 12):
        hours = hours - 12;
        suffix = 'pm';
        break;
      case (hours < 12):
        suffix = 'am';
        break;
      default:
        break;
    }
    return hours + ':' + (minute < 10 ? '0' + minute : minute) + ' ' + suffix;

    // return hour + 'hr' + minute
  }
  render() {
    const { weather, handleDOWUpdate, dowNum, focusedCard } = this.props;
    const dayWeather = weather.daily.data[focusedCard];
    let iconImg = findIcon(dayWeather.icon);
    let userTimezone = (new Date().getTimezoneOffset()/60)*-1;
    console.log('usertz', userTimezone, 'weathertz', weather.offset);
    let userTimeOffset = userTimezone > weather.offset ? userTimezone - weather.offset : userTimezone - weather.offset;

    const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let date = new Date(dayWeather.time * 1000);

    let tempMaxTime = this.handleAmpm(new Date(dayWeather.temperatureMaxTime*1000).getHours()-userTimeOffset);
    let tempMinTime = this.handleAmpm(new Date(dayWeather.temperatureMinTime*1000).getHours()-userTimeOffset);

    let sunUp = this.handleSun((new Date(dayWeather.sunriseTime*1000).getHours()-userTimeOffset), new Date(dayWeather.sunriseTime*1000).getMinutes())
    let sunDown = this.handleSun((new Date(dayWeather.sunsetTime*1000).getHours()-userTimeOffset), new Date(dayWeather.sunsetTime*1000).getMinutes())

    console.log(sunUp, sunDown, userTimeOffset)

    let precip = dayWeather.precipProbability
    ? <p>Precipitation: {(dayWeather.precipProbability*100).toFixed(0)}% chance of {dayWeather.precipType} at {this.handleAmpm(new Date(dayWeather.precipIntensityMaxTime*1000).getHours())}</p>
    : <p>No Precipitation</p>

    return (
      <div id="focused-day" onClick={(key) => handleDOWUpdate(dowNum)}>
        <div id='focused-img'>{iconImg}</div>
        <div id='focused-top-right'>
          <h1>{DOW[date.getDay()]}</h1>
          <p>{dayWeather.summary}</p>
          <p className='sun-period'>
            <img src={require('../../../assets/clear-day-sym.png')} alt="clear day symbol" />
            {sunUp} - {sunDown}
            <img src={require('../../../assets/clear-night-sym.png')} alt="clear-night-symbol" />
          </p>
        </div>
        <div id='focused-center'>
          <p>As low as {dayWeather.temperatureMin.toFixed(0)}&deg; at {tempMinTime} and up to {dayWeather.temperatureMax.toFixed(0)}&deg; at {tempMaxTime}</p>
          {precip}
        </div>
        <div id="focused-bottom-left">
          <p>High: {dayWeather.temperatureHigh.toFixed(0)}&deg;</p>
          <p>Feels Like: {dayWeather.apparentTemperatureHigh.toFixed(0)}&deg;</p>
          <p>Low: {dayWeather.temperatureLow.toFixed(0)}&deg;</p>
          <p>Feels Like: {dayWeather.apparentTemperatureLow.toFixed(0)}&deg;</p>
        </div>
        <div id="focused-bottom-left">
          <p>Wind Speed: {dayWeather.windSpeed.toFixed(2)} MPH</p>
          <p>Gust Speed: {dayWeather.windGust.toFixed(0)} MPH</p>
          <p>Visibility: {dayWeather.visibility}mi</p>
          <p>UV Index: {dayWeather.uvIndex}</p>
          <p>Humidity: {dayWeather.humidity*100}%</p>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FocusedDay)