import React, { Component } from 'react';
import './App.css';
import Current from './components/Current/Current';
import Month from './components/Month/Month';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      weather: '',
      city: 'Manhattan',
      state: 'New York',
      zipCode: '',
      county: '',
      country: '',
      latitude: '40.754932',
      longitude: '-73.984016'
    }
  }

  componentWillMount() {
    this.findMe();
    this.weatherFinder();
  }

  handleGeocode() {
    console.log("lat", this.state.latitude, "long", this.state.longitude)
    if (this.state.latitude) {
      this.translateLocation();
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

  translateLocation() {
    fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + 
            this.state.latitude + 
            "," +
            this.state.longitude + 
            "&key=" + 
            process.env.REACT_APP_LOCATION_KEY)
      .then(response => response.json())  
      .then(data => {
        this.setState({
          location: data,
          city: data.results[0].address_components[2].long_name,
          state: data.results[0].address_components[4].short_name,
          zipCode: data.results[4].address_components[0],
          county: data.results[4].address_components[2],
          country: data.results[4].address_components[4]
    })
  })
  }
  
  weatherFinder() {
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = `https://api.darksky.net/forecast/${process.env.REACT_APP_WEATHER_KEY}/${this.state.latitude},${this.state.longitude}`
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
    return (
      <div className="App">
        <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
        <Current city={this.state.city} state={this.state.state} weather={this.state.weather} />
        <Month date={date} />
        <button onClick={ () => this.handleGeocode() }>Update For Me</button>
      </div>
    );
  }
}