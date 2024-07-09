import React from 'react';
import { Link, redirect, Router } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/__global.scss';

function Signup() {
  return (
    <div className='container'>
      <form className='formContainer'>
        <label>Create User Name</label>
        <input type='text'></input>
        <label>New Password</label>
        <input type='password'></input>
        <label>Verify Password</label>
        <input type='password'></input>
        <button type='submit'>
          <Link to='/' className='links'>
            Submit
          </Link>
        </button>
      </form>
    </div>
  );
}
s;

export default Signup;
