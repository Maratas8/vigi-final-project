import React from "react";
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';


const Home = () => {

  let isLoggedIn = localStorage.getItem('token') != null && localStorage.getItem('token').length > 20;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem('token', '');
    navigate('/login');
  }

  return (
    isLoggedIn ?
      <div>
        <h1>You are logged in and can reserve a meeting room</h1>
        <div id="links">
          <Button text="Logout" className="white" onClick={logout} />
        </div>
      </div>
      :
      <div id="home">
        <h1>Meeting Rooms Reservation</h1>
        <div id="links">
          <Link to="/login"> <Button text="Login" className="blue" /></Link>
          <Link to="/register"> <Button text="Register" className="white" /></Link>
        </div>
      </div>
  )

}

export default Home;