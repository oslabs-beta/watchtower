import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/NavBar.scss';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const NavBar = (): JSX.Element => {
  return (
    <AppBar position='static'>
      <Toolbar className='navbar'>
        <Link to='/dashboard' className='links'>
          <img src={logo} alt='watchtower logo' />
        </Link>
        <Button color='inherit' className='option'>
          <Link to='/accountInfo' className='links'>
            AWS Account Info
          </Link>
        </Button>
        <Button color='inherit' className='option'>
          <Link to='/analyze' className='links'>
            Analyze Provisioning
          </Link>
        </Button>
        <Button color='inherit' className='option'>
          <Link to='/pastAnalyses' className='links'>
            Past Analyses
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
