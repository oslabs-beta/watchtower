import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/NavBar.scss';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <div className='container'>
        <img src={logo} alt='watchtower logo' />
        <ul className='menu'>
          <div className='option'>
            <li className='items'>
              <Link to='/accountInfo' className='links'>
                AWS Account Info
              </Link>
            </li>
          </div>

          <div className='option'>
            <li className='items'>
              <Link to='/analyze' className='links'>
                Analyze Provisioning
              </Link>
            </li>
          </div>

          <div className='option'>
            <li className='items'>
              <Link to='/pastAnalyzes' className='links'>
                Past Analyzses
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
