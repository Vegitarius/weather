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
    const { icon, high, low, summary } = this.props;
    let dayIcon = findIcon(icon)
    return(
      <div className='weekday' onClick={(key) => this.props.handleDOWUpdate(this.props.dowNum)}>
        {dayIcon}
        <h3>{this.props.DOW}</h3>
        <p className='wkdy-summ'>{summary}</p>
        <p className='wkdy-weather'>{high}&deg; / {low}&deg;</p>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Day);