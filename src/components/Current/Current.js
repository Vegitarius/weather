import React from 'react';
import { connect } from 'react-redux';
import './Current.css';

const mapStateToProps = state => {
  return {
    weatherPending: state.handleWeather.weatherPending,
    weather: state.handleWeather.weather,
    currentTemp: state.handleWeather.currentTemp,
    currentSummary: state.handleWeather.currentSummary,
    currentFeelsLike: state.handleWeather.currentFeelsLike,
    todayHigh: state.handleWeather.todayHigh,
    todayLow: state.handleWeather.todayLow
  }
}

class Current extends React.Component {
  render() {
    console.log(this.props.location, this.props.weather);
    const { location, currentTemp, 
            currentSummary, currentFeelsLike,
            todayHigh, todayLow } = this.props;
    return (
      <div id="current">
        <div id="location">
          {location}
        </div>
        <div id="date" className="text-r">
          Today
        </div>
        <div id="weather-img"  className="col2">
          <img src={require("../../assets/cloudy-sym.jpg")} alt="cloudy-symbol" />
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