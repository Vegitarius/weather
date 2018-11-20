import React from 'react';
import './Current.css';

export default class Current extends React.Component {
  constructor(props) {
    super();
    this.state = {
      place: "New York, New York"
    }
  }

  updateArea() {
    if (this.props.city && this.props.state) {
      this.setState({
        place: this.props.city + ", " + this.props.state
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
            52&deg;
          </div>
          <div id="current-weather">
            LIGHT DRIZZLE
          </div>
          <div id="current-feels-like">
            Feels Like 52&deg;
          </div>
          <div id="today-high-low">
            Hi 60&deg; Low 49&deg;
          </div>
        </div>
        <button onClick={() => {this.updateArea()}}>Update</button>
      </div>
    )
  }
}