import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
  render() {
    const { icon } = this.props;
    let dayIcon = <img src={require('../../../assets/icon.png')} alt="cloudy-symbol" />;
    if (icon) {
      switch (icon.toLowerCase()) {
        case 'snow':
          dayIcon = <img src={require('../../../assets/snow-sym.png')} alt="snow symbol" />
          break;
        case 'wind':
          dayIcon = <img src={require('../../../assets/wind-sym.png')} alt="windy symbol" />
          break;
        case 'clear-day':
          dayIcon = <img src={require('../../../assets/clear-day-sym.png')} alt="clear day symbol" />
          break;
        case 'cloudy':
          dayIcon = <img src={require('../../../assets/cloudy-sym.jpg')} alt="cloudy-symbol" />
          break;
        case 'mostly-cloudy': 
          dayIcon = <img src={require('../../../assets/cloudy-sym.jpg')} alt="mostly-cloudy-symbol" />
          break;
        case 'clear-night':
          dayIcon = <img src={require('../../../assets/clear-night-sym.png')} alt="clear-night-symbol" />
          break;
        case 'rain':
          dayIcon = <img src={require('../../../assets/rain-sym.png')} alt="rainy-symbol" />
          break;
        case 'partly-cloudy-day':
          dayIcon = <img src={require('../../../assets/partly-cloudy-day-sym.png')} alt="partly cloudy day symbol" />
          break;
        case 'partly-cloudy-night':
          dayIcon = <img src={require('../../../assets/partly-cloudy-night-sym.ico')} alt="partly cloudy night symbol" />
          break;
        default:
          console.log(icon)
          break;
      }
    }
    return(
      <span className='weekday'>
        {dayIcon}
        <h3>{this.props.DOW}</h3>
        <p className='wkdy-weather'>{this.props.high}&deg; / {this.props.low}&deg;</p>
      </span>
    )
  }
}

export default Day;