import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import Period from './components/Period/Period';
import Routes from './Routes';

import { translateLocation, handleWeather, getLatLong, locateUser } from './actions';

const mapStateToProps = state => ({
    geoPending: state.translateLocation.geoPending,
    weatherPending: state.handleWeather.weatherPending,
    weather: state.handleWeather.weather,
    latitude: state.getLatLong.latitude,
    lat2: state.locateUser.latitude,
    longitude: state.getLatLong.longitude,
    long2: state.locateUser.longitude,
    locArray: state.translateLocation.locArray,
    country: state.translateLocation.country,
    zipcode: state.setZipcode.zipcode
})

const mapDispatchToProps = (dispatch) => ({
  translateLocation: (lat, long) => dispatch(translateLocation(lat, long)),
  handleWeather: (lat, long) => dispatch(handleWeather(lat, long)),
  getLatLong: (zipcode) => dispatch(getLatLong(zipcode)),
  locateUser: () => dispatch(locateUser())
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'home'
    }
  }

  componentDidMount() {
    this.props.getLatLong(this.props.zipcode);
    this.props.locateUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.latitude !== this.props.latitude 
      || prevProps.lat2 !== this.props.lat2) {
      this.handleUpdate();
    }
  }

  handleUpdate() {
    if (this.props.latitude && this.props.longitude) {
      // sends lat and long to geocode api that translates lat,long into location(city, state etc)
      this.props.translateLocation(this.props.latitude, this.props.longitude);
      // sends lat and long to api to return weather data for location
      this.props.handleWeather(this.props.latitude, this.props.longitude);
    }
    if (this.props.lat2 && this.props.long2) {
      // sends lat and long to geocode api that translates lat,long into location(city, state etc)
      this.props.translateLocation(this.props.lat2, this.props.long2);
      // sends lat and long to api to return weather data for location
      this.props.handleWeather(this.props.lat2, this.props.long2);
    }
  }

  render() {
    const childProps = {
      weather: this.props.weather
    }
    return (
      <div id='main-page'>
        <Nav />
        <Period />
        <Routes childProps={childProps} /> 
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));