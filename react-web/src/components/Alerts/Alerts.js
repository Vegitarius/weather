import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Alerts.css';

const mapStateToProps = state => ({
  weather: state.handleWeather.weather
})

class Alerts extends Component { 
  constructor() {
    super();
    this.state = {
      alerts: false,
      displayAlerts: false
    }
  }

  componentWillMount() {
    if (this.props.weather) {
      if (this.props.weather.alerts) {
        this.setState({ alerts: true })
      }
    }
  }

  render() {
    const { weather } = this.props;
    let alerts = <h3 style={{ textAlign: "center" }}>No Weather Alerts</h3>
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
      <div className='alerts-container'>
        {this.state.alerts
        ? 
        <div>
          <button className='alerts-button' onClick={() => this.setState({ displayAlerts: !this.state.displayAlerts })}>Weather Alerts</button>
          {this.state.displayAlerts
          ? <ul className='alert-list'>
              {alerts}
            </ul>
          : null
          }
        </div>
        : 
        null
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Alerts)