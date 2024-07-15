import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Layout from './Layout';
import StatusBox from './StatusBox';
import GraphContainer from './GraphContainer';
import BedrockAnalysis from './BedrockAnalysis';
import Copyright from './Copyright';
import { ProvisionFormData } from '../../types/types';

const defaultTheme = createTheme();

export default function Dashboard() {
  const [currentProvision, setCurrentProvision] =
    useState<ProvisionFormData | null>(null);

  const handleFormSubmit = async (data: ProvisionFormData) => {
    try {
      setCurrentProvision(data);
      console.log('Provision saved', data);
    } catch (error) {
      console.error('Error:', error);
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
                sx={{ p: 2, display: 'flex', flexDirection: 'column', mb: 2 }}
              >
                <StatusBox onSubmit={handleFormSubmit} />
              </Paper>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <BedrockAnalysis />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <GraphContainer currentProvision={currentProvision} />
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Layout>
    </ThemeProvider>
  );
}
