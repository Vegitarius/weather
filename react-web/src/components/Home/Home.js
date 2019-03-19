import React, { Component } from 'react';
import { connect } from 'react-redux';
import Current from '../Current/Current';
import Loading from '../Loading/Loading';

const mapStateToProps = state => ({
  weather: state.handleWeather.weather,
  weatherPending: state.handleWeather.weatherPending,
})

class Home extends Component {
  render() {
      const { weather } = this.props;
      console.log(weather);
      let alerts = <p>No Weather Alerts</p>
      if (weather) {
        if (weather.alerts) alerts = <p>Alerts</p> 
      }
      
    return (
      <div>
        {this.props.weatherPending
          ? <Loading />
          : <div>
              {alerts}
              <Current />
            </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps,null)(Home);