import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
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
import { AWSBody } from '../../types/types';

const AWSInfoPage = (): JSX.Element => {
  let navigate: NavigateFunction = useNavigate();
  // State for form values
  const [awsAccountName, setAwsAccountName] = useState<string>('');
  const [awsAccessKey, setAwsAccessKey] = useState<string>('');
  const [awsSecretKey, setAwsSecretKey] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  async function awsInfoSubmit(event: React.FormEvent) {
    event.preventDefault();
    // Fetch request - Post method - to AWSConnect path providing AWS Account IAM details.
    try {
      //check input from feilds
      if (!awsAccountName || !awsAccessKey || !awsSecretKey || !region) {
        throw new Error('All field must be filled! Please try again');
      }
      // Create the body object
      const body: AWSBody = {
        AWSAccountName: awsAccountName,
        AWSAccessKey: awsAccessKey,
        AWSSecretKey: awsSecretKey,
        Region: region,
      };

      const response: Response = await fetch('/api/AWSConnect', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(body),
      });

      const message: string = await response.json();
      console.log('respnse from back end:', response);

      if (message === 'success') {
        alert('AWS Account Info Submitted!');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
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
              InputProps={{
                autoComplete: 'username',
              }}
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
              InputProps={{
                autoComplete: 'new-password',
              }}
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
              InputProps={{
                autoComplete: 'new-password',
              }}
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
