import React from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import '../styles/__global.scss';

function AWSInfoPage() {
  return (
    <div className='container'>
      <NavBar />
      <form className='formContainer'>
        <label>AWS Account Name</label>
        <input type='text'></input>
        <label>AWS Access Key ID</label>
        <input type='text'></input>

        <label>AWS Secret Access Key</label>
        <input type='text'></input>

        <label>Region</label>
        <select>
          <option>us-east-1</option>
          <option>us-east-2</option>
          <option>us-west-1</option>
          <option>us-west-2</option>
        </select>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default AWSInfoPage;
