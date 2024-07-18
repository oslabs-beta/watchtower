import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const AWSInfoPage = () => {
  let navigate = useNavigate();

  // State for form values
  const [awsAccountName, setAwsAccountName] = useState('');
  const [awsAccessKey, setAwsAccessKey] = useState('');
  const [awsSecretKey, setAwsSecretKey] = useState('');
  const [region, setRegion] = useState('');

  const onClick = () => {
    navigate('/AWSConnect');
  };

  async function awsInfoSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Create the body object
    const body = {
      AWSAccountName: awsAccountName,
      AWSAccessKey: awsAccessKey,
      AWSSecretKey: awsSecretKey,
      Region: region,
    };

    // Log the body object to the console
    console.log('Request body:', body);

    // Fetch request - Post method - to AWSConnect path providing AWS Account IAM details.
    try {
      const response = await fetch('/api/AWSConnect', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(body),
      });
      console.log('response ', response);
      const data = await response.json();
      if (data) {
        alert('AWS Account Info Submitted!');
        navigate('/dashboard');
      }
    } catch (err) {
      alert(
        'An Error occurred while validating AWS Account Info. Please try again.'
      );
    }
  }

  return (
    <Layout>
      <Container maxWidth='sm'>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant='h4' gutterBottom>
            AWS Account Information
          </Typography>
          <form onSubmit={awsInfoSubmit}>
            <TextField
              fullWidth
              margin='normal'
              label='AWS Account Name'
              value={awsAccountName}
              onChange={(e) => setAwsAccountName(e.target.value)}
              id='AWSAccountName'
              variant='outlined'
            />
            <TextField
              fullWidth
              margin='normal'
              label='AWS Access Key ID'
              value={awsAccessKey}
              onChange={(e) => setAwsAccessKey(e.target.value)}
              id='AWSAccessKey'
              variant='outlined'
              type='password'
            />
            <TextField
              fullWidth
              margin='normal'
              label='AWS Secret Access Key'
              value={awsSecretKey}
              onChange={(e) => setAwsSecretKey(e.target.value)}
              id='AWSSecretKey'
              variant='outlined'
              type='password'
            />
            <FormControl fullWidth margin='normal'>
              <InputLabel id='RegionLabel'>Region</InputLabel>
              <Select
                labelId='RegionLabel'
                id='Region'
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                label='Region'
              >
                <MenuItem value='' disabled>
                  Select a Region
                </MenuItem>
                <MenuItem value='us-east-1'>us-east-1</MenuItem>
                <MenuItem value='us-east-2'>us-east-2</MenuItem>
                <MenuItem value='us-west-1'>us-west-1</MenuItem>
                <MenuItem value='us-west-2'>us-west-2</MenuItem>
              </Select>
            </FormControl>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </Layout>
  );
};

export default AWSInfoPage;
