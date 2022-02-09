import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Register.css';

const Register = () => {
  const [isRegistrationSuccessfull, setIsRegistrationSuccessfull] = useState(false);

  const onClickHandler = (event) => {
    event.preventDefault();

    const user = {
      fullName: event.target.fullname.value,
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

    fetch('http://localhost:3001/register', options)
      .then((response) => {
        if (!response.ok) {
          return response.json();
        }
        event.target.fullname.value = "";
        event.target.email.value = "";
        event.target.password.value = "";
        setIsRegistrationSuccessfull(true);
        return response.json();
      })
  };

  return (
    !isRegistrationSuccessfull ?
      <div id="register">
        <h1>Register</h1>
        <form onSubmit={onClickHandler}>
          <input type="text" name="fullname" placeholder="Fullname" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <Button type="submit" text="Register" className="white" />
        </form>
      </div>
      :
      <div>
        <h1>Registered! Please <Link to="/login">Log In</Link></h1>
      </div>
  )
}

export default Register;