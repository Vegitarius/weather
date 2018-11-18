import React, { Component } from 'react';
import './App.css';
import Current from './Current';
import Month from './Month';
import config from './config';

class App extends Component {
  render() {
    let date = new Date();
   
    return (
      <div className="App">
        <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
        <Current />
        <Month date={date} />
      </div>
    );
  }
}

export default App;
