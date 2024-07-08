import React from 'react';
import { Link, redirect, Router } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/NavBar.scss';
import AWSInfoPage from './AWSInfoPage';

const NavBar = () => {
  return (
    <nav className='navbar'>
      {/* //<div className='container'> */}
      <Link to='/' className='links'>
        <img src={logo} alt='watchtower logo' />
      </Link>
      {/* <ul className='menu'> */}
      <button className='option'>
        <Link to='/accountInfo' className='links'>
          AWS Account Info
        </Link>
      </button>

      <button className='option'>
        <Link to='/analyze' className='links'>
          Analyze Provisioning
        </Link>
      </button>

      <button className='option'>
        <Link to='/pastAnalyses' className='links'>
          Past Analyses
        </Link>
      </button>
      {/* </ul> */}
      {/* </div> */}
    </nav>
  );
};

export default NavBar;
