import React, { Component } from 'react';
import './App.css';
import Current from './Current';
import Month from './Month';
import config from './config';

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      city: '',
      state: '',
      zipCode: '',
      county: '',
      country: '',
      latitude: '',
      longitude: ''
    }
  }

  buttonPusher() {
    console.log("lat", this.state.latitude, "long", this.state.longitude)
    if (this.state.latitude) {
      this.coder();
      console.log(this.state.location)
    }
    if (this.state.city) {
      console.log(this.state.location);
    }
  }

  finder() {
    let success = (position) => {
      this.setState({
        latitude: String(position.coords.latitude),
        longitude: String(position.coords.longitude)
      })
    }
    let error = () => {
      console.log("No Location")
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }

  coder = () => {
      fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + 
              this.state.latitude + 
              "," +
              this.state.longitude + 
              "&key=" + 
              config.locationKey)
        .then(response => response.json())  
        .then(data => {this.setState({
          location: data,
          city: data.results[4].address_components[1].long_name,
          state: data.results[4].address_components[3].short_name,
          zipCode: data.results[4].address_components[0],
          county: data.results[4].address_components[2],
          country: data.results[4].address_components[4]
      })})
    } 

  render() {
    let date = new Date();
    return (
      <div className="App">
        <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
        <Current city={this.state.city} state={this.state.state} />
        <Month date={date} />
        <button onClick={ () => this.buttonPusher() }>Geocode</button>
        <button onClick={ () =>  this.finder() }>Find Me</button>
      </div>
    );
  }
}

export default App;
