import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import "../styles/NavBar.scss";

const NavBar = () => {
  return (
    <nav className='navbar'>
      <div className='container'>
      <Link to='/' className='links'>
        <img src={logo} alt='watchtower logo' />
      </Link>    
        <ul className='menu'>
          <li className='items'>
            <Link to='/accountInfo' className='links'>
              AWS Account Info
            </Link>
          </li>
          <li className='items'>
            <Link to='/analyze' className='links'>
              Analyze Provisioning
            </Link>
          </li>
          <li className='items'>
            <Link to='/pastAnalyzes' className='links'>
              Past Analyzses
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    
  );
}

export default NavBar;