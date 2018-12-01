import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Current from './components/Current/Current';
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
    weather: state.handleWeather.weather
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

  componentWillMount() {
    this.locateUser();
    this.props.handleWeather(this.state.latitude, this.state.longitude);
  }

  handleUpdate() {
    if (this.state.latitude && this.state.longitude) {
      // sends lat and long to geocode api that translates lat,long into location(city, state etc)
      this.props.translateLocation(this.state.latitude, this.state.longitude);
      // sends lat and long to api to return weather data for location
      this.props.handleWeather(this.state.latitude, this.state.longitude);
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
    const { city, state, weather } = this.props;
    const { route } = this.state;
    if (route === 'home') {
      return (
        <div className="App">
          <Nav />
          <Period />
          <Current location={`${city}, ${state}`} weather={weather} />
          {/* Weather for next few days */}
          <Month date={date} />
          <button onClick={ () => this.handleUpdate() }>Update For Me</button>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);