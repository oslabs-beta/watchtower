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

    const AWSAccountName = document.querySelector(
      '#AWSAccountName'
    ) as HTMLInputElement;
    const AWSAccessKey = document.querySelector(
      '#AWSAccessKey'
    ) as HTMLInputElement;
    const AWSSecretKey = document.querySelector(
      '#AWSSecretKey'
    ) as HTMLInputElement;
    const Region = document.querySelector('#Region') as HTMLSelectElement;

    // Fetch request - Post method - to AWSConnect path providing AWS Account IAM details.
    //
    if (AWSAccountName && AWSAccessKey && AWSSecretKey && Region) {
      try {
        
        const response = await fetch('/api/AWSConnect', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            AWSAccountName: AWSAccountName.value,
            AWSAccessKey: AWSAccessKey.value,
            AWSSecretKey: AWSSecretKey.value,
            Region: Region.value,
          }),
        });
        console.log('response ', response);
        const data = await response.json();
        if (data) {
          alert('AWS Account Info Submitted!');
          navigate('/dashboard');
        }
      } catch (err) {
        alert(
          'An Error occured while validating AWS Account Info. Please try again.'
        );
      }
    }
  }
  return (
    <div className='container'>
      <NavBar />
      <form className='formContainer'>
        <label>AWS Account Name</label>
        <input type='text' id='AWSAccountName'></input>
        <label>AWS Access Key ID</label>
        <input type='password' id='AWSAccessKey'></input>

        <label>AWS Secret Access Key</label>
        <input type='password' id='AWSSecretKey'></input>

        <label>Region</label>
        <select id='Region'>
          <option value='us-east-1'>us-east-1</option>
          <option value='us-east-2'>us-east-2</option>
          <option value='us-west-1'>us-west-1</option>
          <option value='us-west-2'>us-west-2</option>
        </select>

        <button type='submit' onClick={awsInfoSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AWSInfoPage;
