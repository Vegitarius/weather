import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Alerts.css';

const mapStateToProps = state => ({
  weather: state.handleWeather.weather
})

class Alerts extends Component { 
  render() {
    const { weather } = this.props;
    console.log(weather);
    let alerts = <h3>No Weather Alerts</h3>
    if (weather) {
      if (weather.alerts) {
        alerts = this.props.weather.alerts.map((alert, i) => {
          let severity = alert.severity.split('');
          let severityCapped = severity[0].toUpperCase();
          let severityJoined = severityCapped + severity.slice(1).join('');
          return (
            <li key={i} className='alert'>
              <div className='alert-info'>
                <span className='alert-title'>{alert.title}</span>
                <span className='alert-severity'>Severity: {severityJoined}</span>
              </div>
            </li>
          )
        })
      }
    }

    return (
      <div>
        <h1>Weather Alerts:</h1>
        <ul className='alert-list'>
          {alerts}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Alerts)