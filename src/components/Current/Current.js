import React from 'react';
import { connect } from 'react-redux';
import './Current.css';

const mapStateToProps = state => {
  return {
    location: state.translateLocation.location,
    weatherPending: state.handleWeather.weatherPending,
    weather: state.handleWeather.weather,
    currentTemp: state.handleWeather.currentTemp,
    currentIcon: state.handleWeather.currentIcon,
    currentSummary: state.handleWeather.currentSummary,
    currentFeelsLike: state.handleWeather.currentFeelsLike,
    todayHigh: state.handleWeather.todayHigh,
    todayLow: state.handleWeather.todayLow
  }
}

class Current extends React.Component {
  render() {
    console.log(this.props.location, this.props.weather);
    const { location, currentTemp, currentSummary,
            currentIcon, currentFeelsLike,
            todayHigh, todayLow } = this.props;
    let weatherImg = <img src={require('../../assets/icon.png')} alt="cloudy-symbol" />;
    if (currentIcon) {
      switch (currentIcon.toLowerCase()) {
        case 'clear-day':
          console.log('clear-day')  
          break;
        case 'cloudy':
          console.log('cloudy')
          break;
        case 'mostly-cloudy': 
          console.log('mostly-cloudy');
          weatherImg = <img src={require('../../assets/cloudy-sym.jpg')} alt="cloudy-symbol" />
          break;
        case 'clear-night':
          console.log('clear-night');
          weatherImg = <img src={require('../../assets/clear-night-sym.png')} alt="cloudy-symbol" />
          break;
        case 'partly-cloudy-night':
          break;
        case 'rain':
          break;
        default:
          console.log(this.props.currentIcon)
          break;
      }
    }
    return (
      <div id="current">
        <div id="location">
          {location}
        </div>
        <div id="date" className="text-r">
          Currently
        </div>
        <div id="weather-img"  className="col2">
          {weatherImg}
        </div>
        <div id="col1">
          <div id="current-temperature">
            {currentTemp}&deg;
          </div>
          <div id="current-weather">
            {currentSummary}
          </div>
          <div id="current-feels-like">
            Feels Like: {currentFeelsLike}&deg;
          </div>
          <div id="today-high-low">
            Hi: {todayHigh}&deg; Low: {todayLow}&deg;
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Current);