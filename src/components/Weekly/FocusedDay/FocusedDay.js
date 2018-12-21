import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FocusedDay.css';
import { handleDOW } from '../../../actions';

const mapDispatchToProps = (dispatch) => ({
  handleDOWUpdate: (key) => dispatch(handleDOW(key))
})

class FocusedDay extends Component {
  render() {
    return (
      <div id="focused-day " onClick={(key) => this.props.handleDOWUpdate(this.props.dowNum)}>
        <h1>{this.props.DOW}</h1>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(FocusedDay)