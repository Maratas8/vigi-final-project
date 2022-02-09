import React from 'react';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {

  return (
    <header>
      <div id="header">
        <div id="logo">
          <Link to="/"> <img src={logo} alt="logo" /></Link>
        </div>
        <div id="nav">
          <Link to="/">Home</Link>
          <Link to="/reservations">Reservations</Link>
          <Link to="/add-reservation">Add Reservation</Link>
          <Link to="/add-room">Add Room</Link>
        </div>
      </div>

    </header>
  )
}

export default Header;