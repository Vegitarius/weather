import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FocusedDay.css';
import { handleDOW } from '../../../actions';
import findIcon from '../../findIcon';

const mapStateToProps = state => ({
  focusedCard: state.handleDOWFocus.focusedCard,
  weather: state.handleWeather.weather.daily,
})

const mapDispatchToProps = (dispatch) => ({
  handleDOWUpdate: (key) => dispatch(handleDOW(key))
})

class FocusedDay extends Component {
  handleAmpm(hour) {
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
  handleSun(hour, minute) {
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
    return hours + ':' + minute + ' ' + suffix;
  }
  render() {
    const { weather, handleDOWUpdate, dowNum, focusedCard } = this.props;
    const dayWeather = weather.data[focusedCard];
    let iconImg = findIcon(dayWeather.icon);

    const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let date = new Date(dayWeather.time * 1000);

    let tempMaxTime = this.handleAmpm(new Date(dayWeather.temperatureMaxTime*1000).getHours());
    let tempMinTime = this.handleAmpm(new Date(dayWeather.temperatureMinTime*1000).getHours());

    let sunUp = this.handleSun(new Date(dayWeather.sunriseTime*1000).getHours(), new Date(dayWeather.sunriseTime*1000).getMinutes())
    let sunDown = this.handleSun(new Date(dayWeather.sunsetTime*1000).getHours(), new Date(dayWeather.sunsetTime*1000).getMinutes())

    let precip = dayWeather.precipProbability
    ? <h2>Precipitation: {(dayWeather.precipProbability*100).toFixed(0)}% chance of {dayWeather.precipType} at {this.handleAmpm(new Date(dayWeather.precipIntensityMaxTime*1000).getHours())}</h2>
    : <h2>No Precipitation</h2>

    return (
      <div id="focused-day" onClick={(key) => handleDOWUpdate(dowNum)}>
        <div id='focused-img'>{iconImg}</div>
        <div id='focused-top-right'>
          <h1>{DOW[date.getDay()+1]}</h1>
          <h2>{dayWeather.summary}</h2>
          <h2 className='sun-period'>
            <img src={require('../../../assets/clear-day-sym.png')} alt="clear day symbol" />
            {sunUp} - {sunDown}
            <img src={require('../../../assets/clear-night-sym.png')} alt="clear-night-symbol" />
          </h2>
        </div>
        <div id='focused-center'>
          <h2>As low as {dayWeather.temperatureMin.toFixed(0)}&deg; at {tempMinTime} and up to {dayWeather.temperatureMax.toFixed(0)}&deg; at {tempMaxTime}</h2>
          {precip}
        </div>
        <div id="focused-bottom-left">
          <h2>High: {dayWeather.temperatureHigh.toFixed(0)}&deg;</h2>
          <h2>   Feels Like: {dayWeather.apparentTemperatureHigh.toFixed(0)}&deg;</h2>
          <h2>Low: {dayWeather.temperatureLow.toFixed(0)}&deg;</h2>
          <h2>   Feels Like: {dayWeather.apparentTemperatureLow.toFixed(0)}&deg;</h2>
        </div>
        <div id="focused-bottom-left">
        <h2>Wind Speed: {dayWeather.windSpeed.toFixed(2)} MPH</h2>
          <h2>Gust Speed: {dayWeather.windGust.toFixed(0)} MPH</h2>
          <h2>Visibility: {dayWeather.visibility}mi</h2>
          <h2>UV Index: {dayWeather.uvIndex}</h2>
          <h2>Humidity: {dayWeather.humidity*100}%</h2>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FocusedDay)