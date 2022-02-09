import React, { useState } from "react";
import Button from '../../components/Button/Button';
import './Login.css';

const Login = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null && localStorage.getItem('token').length > 20);

  const onClickHandler = (event) => {
    event.preventDefault();

    const user = {
      email: event.target.email.value,
      password: event.target.password.value
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    fetch('http://localhost:3001/login', options)
      .then((response) => {
        if (!response.ok) {
          return response.json();
        }
        event.target.email.value = "";
        event.target.password.value = "";
        return response.json();
      })
      .then(data => {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(localStorage.getItem('token') != null && localStorage.getItem('token').length > 20);
      })
  };

  return (
    !isLoggedIn ?
      <div id="login">
        <h1>Log In</h1>
        <form onSubmit={onClickHandler}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <Button type="submit" text="Log In" className="blue" />
        </form>
      </div>
      :
      <div>
        <h1>Logged In!</h1>
      </div>
  )
}

export default Login;