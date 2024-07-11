import React from 'react';
import NavBar from './NavBar';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/__global.scss';

// AWS Info Page Submit Function. This sends a post request to /AWSConnect.

const AWSInfoPage = () => {
  let navigate = useNavigate();
  const onClick = () => {
    navigate('/AWSConnect');
  };

  async function awsInfoSubmit(event: React.FormEvent) {
    event.preventDefault();

    const AWSAccountName = document.querySelector('AWSAccountName');
    const AWSAccessKey = document.querySelector('AWSAccessKey');
    const AWSSecretKey = document.querySelector('AWSSecretKey');
    const Region = document.querySelector('Region');

    // Fetch request - Post method - to AWSConnect path providing AWS Account IAM details.
    try {
      const response = await fetch('/api/AWSConnect', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          AWSAccountName: AWSAccountName,
          AWSAccessKey: AWSAccessKey,
          AWSSecretKey: AWSSecretKey,
          Region: Region,
        }),
      });
      console.log('response ', response);
      // const data = await response.json();
      // if (data) {
      //   alert('AWS Account Info Submitted!');
      //   navigate('/dashboard');
      // }
      // alert(data);
    } catch (err) {
      alert(
        'An Error occured while validating AWS Account Info. Please try again.'
      );
    }
  }

  return (
    <div className='container'>
      <NavBar />
      <form className='formContainer'>
        <label>AWS Account Name</label>
        <input type='text' id='AWSAccountName'></input>
        <label>AWS Access Key ID</label>
        <input type='text' id='AWSAccessKey'></input>

        <label>AWS Secret Access Key</label>
        <input type='text' id='AWSSecretKey'></input>

        <label>Region</label>
        <select id='region'>
          <option>us-east-1</option>
          <option>us-east-2</option>
          <option>us-west-1</option>
          <option>us-west-2</option>
        </select>

        <button type='submit' onClick={awsInfoSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AWSInfoPage;
