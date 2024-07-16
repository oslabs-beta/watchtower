import React, { useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { ProvisionFormData, DataStatsProps } from '../../types/types';
import '../styles/__global.scss';

const DataStats: React.FC<DataStatsProps> = ({
  provisionData,
  currentMetrics,
}) => {
  console.log('Current Metrics:', currentMetrics);

  const formatDate = (date: Date | null) => {
    return date ? new Date(date).toLocaleString() : 'N/A';
  };

  const calculateAverageAndMax = (metrics: any[], key: string) => {
    if (!metrics || metrics.length === 0) return { average: 'N/A', max: 'N/A' };

    const total = metrics.reduce((acc, metric) => acc + metric[key], 0);
    const average = (total / metrics.length).toFixed(3);

    const max = Math.max(...metrics.map((metric) => metric[key])).toFixed(3);

    return { average, max };
  };

  const rcuStats = useMemo(
    () => calculateAverageAndMax(currentMetrics?.ConsRCU || [], 'Average'),
    [currentMetrics]
  );
  const wcuStats = useMemo(
    () => calculateAverageAndMax(currentMetrics?.ConsWCU || [], 'Average'),
    [currentMetrics]
  );

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'var(--background-default)',
      }}
    >
      <Typography variant='h6' gutterBottom align='center'>
        Provision Data Stats
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='body1'>
            <strong>Table Name:</strong> {provisionData.tableName}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1'>
            <strong>Start Time:</strong> {formatDate(provisionData.startTime)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1'>
            <strong>End Time:</strong> {formatDate(provisionData.endTime)}
          </Typography>
        </Grid>

        {currentMetrics && (
          <>
            {currentMetrics.ProvRCU !== undefined && (
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>ProvRCU:</strong> {currentMetrics.ProvRCU}
                </Typography>
              </Grid>
            )}
            {currentMetrics.ProvWCU !== undefined && (
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>ProvWCU:</strong> {currentMetrics.ProvWCU}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom align='center'>
                RCU Statistics
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1'>
                <strong>Average RCU:</strong> {rcuStats.average}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1'>
                <strong>Max RCU:</strong> {rcuStats.max}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom align='center'>
                WCU Statistics
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1'>
                <strong>Average WCU:</strong> {wcuStats.average}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1'>
                <strong>Max WCU:</strong> {wcuStats.max}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default DataStats;
