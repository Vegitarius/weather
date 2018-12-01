import React from 'react';
import './Current.css';

export default class Current extends React.Component {
  constructor(props) {
    super();
    this.state = {
      location: '',
      currentTemp: '',
      currentSummary: '',
      currentFeelsLike: '',
      todayHigh: '',
      todayLow: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    const { currently, daily } = nextProps.weather
    if (currently) {
      this.setState({
        location: location,
        currentTemp: currently.temperature.toFixed(0),
        currentSummary: currently.summary,
        currentFeelsLike: currently.apparentTemperature.toFixed(0),
        todayHigh: daily.data[0].temperatureHigh.toFixed(0),
        todayLow: daily.data[0].temperatureLow.toFixed(0)
      })
    }
  }

  render() {
    return (
      <div id="current">
        <div id="location">
          {this.state.location}
        </div>
        <div id="date" className="text-r">
          Today
        </div>
        <div id="weather-img"  className="col2">
          <img src={require("../../assets/cloudy-sym.jpg")} alt="cloudy-symbol" />
        </div>
        <div id="col1">
          <div id="current-temperature">
            {this.state.currentTemp}&deg;
          </div>
          <div id="current-weather">
            {this.state.currentSummary}
          </div>
          <div id="current-feels-like">
            Feels Like: {this.state.currentFeelsLike}&deg;
          </div>
          <div id="today-high-low">
            Hi: {this.state.todayHigh}&deg; Low: {this.state.todayLow}&deg;
          </div>
        </div>
      </div>
    )
  }
}