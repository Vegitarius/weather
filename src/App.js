import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import Period from './components/Period/Period';
import Routes from './Routes';

import { translateLocation, handleWeather, getLatLong } from './actions';

const mapStateToProps = state => ({
    geoPending: state.translateLocation.geoPending,
    weatherPending: state.handleWeather.weatherPending,
    weather: state.handleWeather.weather,
    latitude: state.getLatLong.latitude,
    longitude: state.getLatLong.longitude,
    locArray: state.translateLocation.locArray,
    country: state.translateLocation.country,
    zipcode: state.setZipcode.zipcode
})

const mapDispatchToProps = (dispatch) => ({
  translateLocation: (lat, long) => dispatch(translateLocation(lat, long)),
  handleWeather: (lat, long) => dispatch(handleWeather(lat, long)),
  getLatLong: (zipcode) => dispatch(getLatLong(zipcode))
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      geolocate: true,
      route: 'home'
    }
  }

  componentDidMount() {
    this.locateUser();
    this.props.getLatLong(this.props.zipcode)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.latitude !== this.props.latitude) {
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