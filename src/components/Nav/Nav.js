import React from 'react';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="size-med">
      <img src={require("../../assets/icon.png")} alt="icon"/>
      <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
      <input className="size-med" placeholder="Zipcode"></input>
    </nav>
  )
}

export default Nav;