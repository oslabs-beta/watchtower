import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Layout from './Layout';
import StatusBox from './StatusBox';
import DataStats from './DataStats';
import GraphContainer from './GraphContainer';
import BedrockAnalysis from './BedrockAnalysis';
import { ProvisionFormData } from '../../types/types';

const defaultTheme = createTheme();

export default function Dashboard() {
  const [currentProvision, setCurrentProvision] =
    useState<ProvisionFormData | null>(null);
  const [currentMetrics, setCurrentMetrics] = useState<any>(null);

  const handleFormSubmit = async (data: ProvisionFormData) => {
    try {
      setCurrentProvision(data);
      console.log('Provision saved', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      if (currentProvision) {
        try {
          const { tableName, startTime, endTime } = currentProvision;
          console.log('Sending request with:', {
            tableName,
            startTime,
            endTime,
          });

          const response = await fetch('/api/metrics', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName, startTime, endTime }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Received data:', data);
          setCurrentMetrics(data);
        } catch (error) {
          console.error('Error fetching metrics:', error);
        }
      }
    };

    fetchMetrics();
  }, [currentProvision]);

  const fetchAnalysis = async () => {
    if (currentProvision) {
      try {
        const response = await fetch('/api/bedrock-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentProvision),
        });

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Analysis data:', data);
        return data;
      } catch (error) {
        console.error('Error fetching analysis:', error);
        return null;
      }
    } else {
      console.error('No provision data available');
      return null;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
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
                  <DataStats provisionData={currentProvision} /> // Render DataStats when currentProvision is set
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
                  fetchAnalysis={fetchAnalysis}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </ThemeProvider>
  );
}
