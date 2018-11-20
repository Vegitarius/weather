import React from 'react';
import './Current.css';

export default class Current extends React.Component {
  constructor(props) {
    super();
    this.state = {
      place: "New York, New York",
      currentTemp: '',
      currentSummary: '',
      currentFeelsLike: '',
      todayHigh: '',
      todayLow: '',
    }
  }

  updateArea() {
    if (this.props.city && this.props.state) {
      this.setState({
        place: this.props.city + ", " + this.props.state,
        currentTemp: this.props.weather.currently.temperature.toFixed(0),
        currentSummary: this.props.weather.currently.summary,
        currentFeelsLike: this.props.weather.currently.apparentTemperature,
        todayHigh: this.props.weather.daily.data[0].temperatureHigh,
        todayLow: this.props.weather.daily.data[0].temperatureLow
      })
    }
  }

  render() {
    return (
      <div id="current">
        <div id="location">
          {this.state.place}
        </div>
        <div id="date">
          Today
        </div>
        <div id="weather-img"  className="col2">
          <img src={require("./assets/cloudy-sym.jpg")} alt="cloudy-symbol" />
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
        <button onClick={() => {this.updateArea()}}>Update</button>
      </div>
    )
  }
}