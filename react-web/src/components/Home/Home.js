import React, { Component } from 'react';
import { connect } from 'react-redux';
import Current from '../Current/Current';
import Alerts from '../Alerts/Alerts';
import Loading from '../Loading/Loading';

const mapStateToProps = state => ({
  weatherPending: state.handleWeather.weatherPending,
})

class Home extends Component {
  render() {  
    return (
      <div>
        {this.props.weatherPending
          ? <Loading />
          : <div>
              <Current />
              <Alerts />
            </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps,null)(Home);