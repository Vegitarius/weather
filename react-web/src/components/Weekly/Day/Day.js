import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Day.css';
import { handleDOW } from '../../../actions';
import findIcon from '../../findIcon';

const mapDispatchToProps = (dispatch) => ({
  handleDOWUpdate: (key) => dispatch(handleDOW(key))
})

class Day extends Component {
  render() {
    const { weather } = this.props;
    const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let dayIcon = findIcon(weather.icon);
    let day = DOW[new Date(weather.time*1000).getDay()];
    return(
      <div className='weekday' onClick={(key) => this.props.handleDOWUpdate(this.props.dowNum)}>
        {dayIcon}
        <h3>{day}</h3>
        <p className='wkdy-summary'>{weather.summary}</p>
        <p className='wkdy-weather'>{weather.temperatureHigh.toFixed(0)}&deg; / {weather.temperatureLow.toFixed(0)}&deg;</p>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Day);