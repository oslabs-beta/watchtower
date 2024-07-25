import React, { useState, useEffect } from 'react';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import Layout from './Layout';
import StatusBox from './StatusBox';
import DataStats from './DataStats';
import GraphContainer from './GraphContainer';
import BedrockAnalysis from './BedrockAnalysis';
import { ProvisionFormData, Metrics } from '../../types/types';
import Swal from 'sweetalert2';

const defaultTheme = createTheme();

const Dashboard = (): JSX.Element => {
  const [currentProvision, setCurrentProvision] =
    useState<ProvisionFormData | null>(null);
  const [currentMetrics, setCurrentMetrics] = useState<Metrics | null>(null);
  const [runGraph, setRunGraph] = useState<boolean>(false);
  const [table, setTable] = useState<string[] | null>([]);
  const [save, setSave] = useState<boolean>(false);

  const handleFormSubmit = async (data: ProvisionFormData): Promise<void> => {
    try {
      setCurrentProvision(data);
      setRunGraph(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect((): void => {
    const fetchMetrics = async (): Promise<void> => {
      if (currentProvision) {
        try {
          const { tableName, startTime, endTime } = currentProvision;

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

          setCurrentMetrics(data);
        } catch (error) {
          console.error('Error fetching metrics:', error);
        }
      }
    };

    fetchMetrics();
  }, [currentProvision]);

  useEffect(() => {
    const getTables = async (): Promise<void> => {
      const response: Response = await fetch(`/api/tables`);

      if (!response.ok) {
        throw new Error(
          `HTTP error status:${response.status}, AWS security token is incorrect!`
        );
      }

      const data = await response.json();
      if (!data.includes('WatchTowerUserProfiles')) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'AWS Account Info Submitted! We will create a table "WatchTowerUserProfiles" to save reports.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#70c0c2',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response: Response = await fetch('/api/createTable');
            const data = await response.json();
            Swal.fire({
              title: 'Table created!',
              text: `Table "WatchTowerUserProfiles1" is created successfully in your DynamoDB!`,
              icon: 'success',
              confirmButtonColor: '#70c0c2',
            });
            setTable(data);
            setSave(true);
          }
        });
      }
      setTable(data);
    };

    getTables().catch((err) => {
      console.error("Couldn't get tables' name", err);
      Swal.fire({
        title: 'Oops...',
        text: err.message,
        icon: 'error',
        confirmButtonColor: '#70c0c2',
      });
    });
  }, []);

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
                  <StatusBox table={table} onSubmit={handleFormSubmit} /> // Render StatusBox when currentProvision is null
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
                  runGraph={runGraph}
                  save={save}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </ThemeProvider>
  );
};

export default Dashboard;
