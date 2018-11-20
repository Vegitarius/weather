import React, { Component } from 'react';
import './App.css';
import Current from './Current';
import Month from './Month';
import config from './config';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      weather: '',
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
      this.geocode();
      console.log(this.state.location)
    }
    if (this.state.city) {
      console.log(this.state.location);
    }
    this.weatherFinder();
  }

  findMe() {
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

  geocode() {
    fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + 
            this.state.latitude + 
            "," +
            this.state.longitude + 
            "&key=" + 
            config.locationKey)
      .then(response => response.json())  
      .then(data => {
        this.setState({
          location: data,
          city: data.results[4].address_components[1].long_name,
          state: data.results[4].address_components[3].short_name,
          zipCode: data.results[4].address_components[0],
          county: data.results[4].address_components[2],
          country: data.results[4].address_components[4]
    })})
  }
  
  weatherFinder() {
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = `https://api.darksky.net/forecast/${config.weatherKey}/${this.state.latitude},${this.state.longitude}`
    fetch(corsProxy + targetUrl)
    .then(response => response.json())
    .then(data => { 
      this.setState({
        weather: data
      })
    })
  }

  render() {
    let date = new Date();
    console.log(this.state.weather)
    return (
      <div className="App">
        <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
        <Current city={this.state.city} state={this.state.state} weather={this.state.weather} />
        <Month date={date} />
        <button onClick={ () => this.buttonPusher() }>Geocode</button>
        <button onClick={ () =>  this.findMe() }>Find Me</button>
      </div>
    );
  }
}