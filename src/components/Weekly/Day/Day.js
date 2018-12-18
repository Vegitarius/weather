import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
  render() {
    return(
      <div>
        <h1>{this.props.DOW}</h1>
      </div>
    )
  }
}

export default Day;