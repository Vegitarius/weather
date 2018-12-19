import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Current from './components/Current/Current';
import Weekly from './components/Weekly/Weekly';
import Month from './components/Month/Month';
import Nav from './components/Nav/Nav';
import Period from './components/Period/Period';

import { translateLocation, handleWeather } from './actions';

const mapStateToProps = state => {
  return {
    geoPending: state.translateLocation.geoPending,
    city: state.translateLocation.city,
    state: state.translateLocation.state,
    weatherPending: state.handleWeather.weatherPending,
    weather: state.handleWeather.weather,
    latitude: state.getLatLong.latitude,
    longitude: state.getLatLong.longitude,
    location: state.translateLocation.location
  }
}

const mapDispatchToProps = (dispatch) => ({
  translateLocation: (lat, long) => dispatch(translateLocation(lat, long)),
  handleWeather: (lat, long) => dispatch(handleWeather(lat, long))
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      geolocate: true,
      latitude: '40.754932',
      longitude: '-73.984016',
      route: 'home'
    }

  }

  componentDidMount() {
    this.locateUser();
    this.props.handleWeather(this.state.latitude, this.state.longitude);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.latitude !== this.props.latitude) {
      this.handleUpdate();
    }
  }

  handleUpdate() {
    if (this.state.latitude && this.state.longitude) {
      // sends lat and long to geocode api that translates lat,long into location(city, state etc)
      this.props.translateLocation(this.state.latitude, this.state.longitude);
      // sends lat and long to api to return weather data for location
      this.props.handleWeather(this.state.latitude, this.state.longitude);
    }
    if (this.props.latitude && this.props.longitude) {
      // sends lat and long to geocode api that translates lat,long into location(city, state etc)
      this.props.translateLocation(this.props.latitude, this.props.longitude);
      // sends lat and long to api to return weather data for location
      this.props.handleWeather(this.props.latitude, this.props.longitude);
    }
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
        // needs alert to user to manually input location if no browser support or declined
        geolocate: false
      })
    }
  }

  render() {
    let date = new Date();
    const { city, state } = this.props;
    const { route } = this.state;
    if (route === 'home') {
      return (
        <div id="app">
          <Nav />
          <Period />
          <Current location={`${city}, ${state}`} latitude={this.state.latitude} longitude={this.state.longitude} />
          {/* Weather for next few days */}
          <Month date={date} />
        </div>
      )
    } else if (route === 'weekly') {
      return (
        <div id="app">
          <Weekly weather={this.props.weather} date={date}/>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);