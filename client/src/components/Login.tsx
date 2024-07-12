import React from 'react';
import { Link, redirect, Router } from 'react-router-dom';
// import logo from '../assets/logo.png';
import '../styles/__global.scss';

function Login() {
  return (
    <div className='container'>
      <h1>Login</h1>
      <form className='formContainer'>
        <label>User Name</label>
        <input type='text'></input>
        <label>Password</label>
        <input type='password'></input>
        <button type='submit'>
          <Link to='/dashboard' className='links'>
            Submit
          </Link>
        </button>
        <button type='submit'>
          <Link to='/signup' className='links'>
            Create Account
          </Link>
        </button>
      </form>
    </div>
  );
}

export default Login;
