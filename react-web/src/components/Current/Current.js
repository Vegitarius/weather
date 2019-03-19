import React from 'react';
import { connect } from 'react-redux';
import './Current.css';
import findIcon from '../findIcon';
import Loading from '../Loading/Loading';

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
  constructor() {
    super();

    this.state = {
      location: 'Manhattan, NY'
    }
  }

  render() {
    document.title = 'Current Weahter4-u'
    // console.log(this.props.location, this.props.weather);
    const { location, currentTemp, currentSummary,
            currentIcon, currentFeelsLike,
            todayHigh, todayLow, weatherPending } = this.props;
    let weatherImg = findIcon(currentIcon)
    return (
      <div id="current">
        <div id="location">
          {location}
        </div>
        <div id="date" className="text-r">
          Currently
        </div>
        {weatherPending 
        ? <Loading />
        : <div id='weather-wrapper'>
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
          </div>}
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Current);