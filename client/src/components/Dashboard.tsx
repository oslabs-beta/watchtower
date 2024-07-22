import React, { useState } from 'react';
import GraphContainer from './GraphContainer';
import StatusBox from './StatusBox';
import AnalysisContainer from './AnalysisContainer';
import NavBar from './NavBar';
import '../styles/Dashboard.scss';
import { ProvisionFormData } from '../../types/types';

const Dashboard = () => {
  // useState to keep track of the provision data
  const [currentProvision, setCurrentProvision] =
    useState<ProvisionFormData | null>(null);

  // handler function to handle the onSubmit for StatusBox
  const handleFormSubmit = async (data: ProvisionFormData) => {
    try {
      setCurrentProvision(data);
      console.log('Provision saved', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

<<<<<<< HEAD
  return (
    <div id='dashboard'>
      <NavBar />
      <div id='leftSide'>
        <StatusBox onSubmit={handleFormSubmit} />
        <AnalysisContainer />
      </div>
      <div id='rightSide'>
        {/* Send the currentProvision on the props to the GraphContainer */}
        <GraphContainer currentProvision={currentProvision} />
      </div>
    </div>
=======
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

  // const fetchAnalysis = async () => {
  //   if (currentProvision) {
  //     try {
  //       const response = await fetch('/api/bedrock', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(currentProvision),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       console.log('Analysis data:', data);
  //       return data;
  //     } catch (error) {
  //       console.error('Error fetching analysis:', error);
  //       return null;
  //     }
  //   } else {
  //     console.error('No provision data available');
  //     return null;
  //   }
  // };

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
                  // fetchAnalysis={fetchAnalysis}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </ThemeProvider>
>>>>>>> 7a883519c8bd13b17368e7d56ed827d6e1314cb0
  );
};

export default Dashboard;
