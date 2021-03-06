import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setZipcode, getLatLong } from '../../actions';
import { Link } from 'react-router-dom';
import './Nav.css';

const mapStateToProps = state => {
  return {
    latLongPending: state.getLatLong.latLongPending,
    zipcode: state.setZipcode.zipcode
  }
}

const mapDispatchToProps = (dispatch) => ({
  setZipcode: (event) => dispatch(setZipcode(event.target.value)),
  getLatLong: (zipcode) => dispatch(getLatLong(zipcode)),
})

class Nav extends Component {
  handleZipSubmit() {
    this.props.getLatLong(this.props.zipcode)
  }

  render() {
    return (
      <nav>
        <div id='nav-top'>
        <Link to='/'>
          <img src={require("../../assets/icon.png")} alt="icon"/>
        </Link>
          <div id='nav-top-r'>
            <input placeholder="Zipcode" onChange={this.props.setZipcode} />
            <button onClick={() => this.handleZipSubmit()}>Submit</button>
          </div>
        </div>
        <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
      </nav>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);