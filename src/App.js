import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Current from './components/Current/Current';
import Month from './components/Month/Month';
import Nav from './components/Nav/Nav';
import Period from './components/Period/Period';

import { translateLocation } from './actions';

const mapStateToProps = state => {
  return {
    city: state.translateLocation.city,
    state: state.translateLocation.state
  }
}

const mapDispatchToProps = (dispatch) => ({
  translateLocation: (lat, long) => dispatch(translateLocation(lat, long))
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      geolocate: true,
      weather: '',
      latitude: '40.754932',
      longitude: '-73.984016'
    }
  }

  componentWillMount() {
    this.locateUser();
    this.weatherFinder();
  }

  // sends lat and long to geocode api that translates lat,long into location(city, state etc)
  handleGeocode() {
    if (this.state.latitude) {
      this.props.translateLocation(this.state.latitude, this.state.longitude);
      console.log(this.state.location)
    }
    if (this.state.city) {
      console.log(this.state.location);
    }
    this.weatherFinder();
  }


  locateUser() {
    let success = (position) => {
      this.setState({
        latitude: String(position.coords.latitude),
        longitude: String(position.coords.longitude)
      })
    }
    let error = () => {
      console.log("No Location")
    }
    if (navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      this.setState({
        // needs alert to user to manually input location if no browser support
        geolocate: false
      })
    }
  }

  // translateLocation() {
  //   fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + 
  //           this.state.latitude + 
  //           "," +
  //           this.state.longitude + 
  //           "&key=" + 
  //           process.env.REACT_APP_LOCATION_KEY)
  //     .then(response => response.json())  
  //     .then(data => {
  //       this.setState({
  //         location: data,
  //         city: data.results[0].address_components[2].long_name,
  //         state: data.results[0].address_components[4].short_name,
  //         zipCode: data.results[4].address_components[0],
  //         county: data.results[4].address_components[2],
  //         country: data.results[4].address_components[4]
  //   })
  // })
  // }
  
  // sends lat and long to api to return weather data for location
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
    console.log(this.state.weather)
    return (
      <div className="App">
        <Nav />
        <Period />
        <Current city={this.props.city} state={this.props.state} weather={this.state.weather} />
        {/* Weather for next few days */}
        <Month date={date} />
        <button onClick={ () => this.handleGeocode() }>Update For Me</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);