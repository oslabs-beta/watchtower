import React from 'react';
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
          'An error occurred while validating AWS Account Info. Please try again.'
        );
      }
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
              id='AWSAccountName'
              variant='outlined'
            />
            <TextField
              fullWidth
              margin='normal'
              label='AWS Access Key ID'
              id='AWSAccessKey'
              variant='outlined'
              type='password'
            />
            <TextField
              fullWidth
              margin='normal'
              label='AWS Secret Access Key'
              id='AWSSecretKey'
              variant='outlined'
              type='password'
            />
            <FormControl fullWidth margin='normal'>
              <InputLabel id='RegionLabel'>Region</InputLabel>
              <Select
                labelId='RegionLabel'
                id='Region'
                defaultValue='us-east-1'
                label='Region'
              >
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
