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
    zipcode: state.setZipcode.zipcode,
    zcTakeover: state.setZipcode.zcTakeover,
    userLocated: state.locateUser.userLocated
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

  async componentDidMount() {
    await this.props.locateUser();
    if (!this.props.userLocated) {
      this.props.getLatLong(this.props.zipcode);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.latitude !== this.props.latitude) {
      this.handleUpdateFirst();
    }
    if (prevProps.lat2 !== this.props.lat2) {
      this.handleUpdateSecond();
    }
  }

  // was having trouble with app not updating properly when user
  // revisited unloaded site after accepting location service

  async handleUpdateFirst() {
    if (this.props.latitude && this.props.longitude && this.props.zcTakeover) {
      // sends lat and long to geocode api that translates lat,long into location(city, state etc)
      await this.props.translateLocation(this.props.latitude, this.props.longitude);
      // sends lat and long to api to return weather data for location
      await this.props.handleWeather(this.props.latitude, this.props.longitude);
    } 
  }

  // updates information when user is located
  async handleUpdateSecond() {
    if (this.props.lat2 && this.props.long2 && !this.props.zcTakeover) {
      // sends lat and long to geocode api that translates lat,long into location(city, state etc)
      await this.props.translateLocation(this.props.lat2, this.props.long2);
      // sends lat and long to api to return weather data for location
      await this.props.handleWeather(this.props.lat2, this.props.long2);
    }
  }

  render() {
    if (this.props.weather) {
      console.log('weather', this.props.weather)
    }
    // if (this.props.locArray) {
    //   console.log('location', this.props.locArray[0].formatted_address);
    // }

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