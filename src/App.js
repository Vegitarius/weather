import React, { Component } from 'react';
import './App.css';
import Current from './Current';
import Month from './Month';

class App extends Component {
  render() {
    let date = new Date();
   
    return (
      <div className="App">
        <Current />
        <Month date={date} />
      </div>
    );
  }
}

export default App;
