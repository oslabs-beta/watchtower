import React, { useState, useEffect } from 'react';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Grid,
  Paper,
} from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import Layout from './Layout';
import StatusBox from './StatusBox';
import DataStats from './DataStats';
import GraphContainer from './GraphContainer';
import BedrockAnalysis from './BedrockAnalysis';
import { ProvisionFormData, Metrics } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { useAuth } from './authComponents/AuthProvider';

const defaultTheme = createTheme();

export default function Dashboard(): JSX.Element | null {
  const [currentProvision, setCurrentProvision] =
    useState<ProvisionFormData | null>(null);
  const [currentMetrics, setCurrentMetrics] = useState<Metrics | null>(null);
  // const [rerender, setRerender] = useState<boolean>(false);

  const user = useAuth();
  console.log('token', user.token);

  const navigate = useNavigate();

  // if (!codeParam) {
  //   console.log('code param not available');

  //   navigate('/');
  //   // return null;
  // }

  // if (!codeParam) {
  //   console.log('redirect?');
  //   window.location.assign('http://localhost:3000/');
  //   return null;
  // }

  const handleFormSubmit = async (data: ProvisionFormData): Promise<void> => {
    try {
      setCurrentProvision(data);
      // console.log('Provision saved', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //when the page first loads, grab the code given from  GitHub Oauth and pass to backend to get GitHub access token

  // useEffect();
  // }, []);

  useEffect((): void => {
    const fetchMetrics = async (): Promise<void> => {
      if (currentProvision) {
        try {
          const { tableName, startTime, endTime } = currentProvision;
          // console.log('Sending request with:', {
          //   tableName,
          //   startTime,
          //   endTime,
          // });
          const response: Response = await fetch('/api/metrics', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({ tableName, startTime, endTime }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
          }

          const data: Metrics = await response.json();
          // console.log('Received data:', data);
          setCurrentMetrics(data);
        } catch (error) {
          console.error('Error fetching metrics:', error);
        }
      }
    };

    fetchMetrics();
  }, [currentProvision]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {/* {!codeParam ? (
        // <div>
        //   <h3>Login with GitHub Failed. Please try again.</h3>
        //   <button
        //     onClick={() => {
        //       navigate('/');
        //     }}
        //   >
        //     Login
        //   </button>
        // </div>
        <button
          onLoad={() => {
            console.log('onLoad');
            navigate('/');
          }}
        >
          Can you see me?
        </button>
      ) : ( */}
      <Layout>
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 500,
                }}
              >
                {currentProvision ? (
                  <DataStats
                    provisionData={currentProvision}
                    currentMetrics={currentMetrics}
                  /> // Render DataStats when currentProvision is set
                ) : (
                  <StatusBox onSubmit={handleFormSubmit} /> // Render StatusBox when currentProvision is null
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 500,
                }}
              >
                <GraphContainer
                  currentProvision={currentProvision}
                  currentMetrics={currentMetrics}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <BedrockAnalysis
                  currentProvision={currentProvision}
                  currentMetrics={currentMetrics}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Layout>
      {/* )} */}
    </ThemeProvider>
  );
}
