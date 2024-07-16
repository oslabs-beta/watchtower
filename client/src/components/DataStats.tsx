import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ProvisionFormData } from '../../types/types';

interface DataStatsProps {
  provisionData: ProvisionFormData;
}

const DataStats: React.FC<DataStatsProps> = ({ provisionData }) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Typography variant='h6'>Provision Data Stats</Typography>
      {/* <Typography variant='body1'>
        Capacity: {provisionData}
      </Typography>
      <Typography variant='body1'>Mode: {provisionData}</Typography>
      <Typography variant='body1'>Region: {provisionData.region}</Typography> */}
      {/* Add more fields as necessary */}
    </Paper>
  );
};

export default DataStats;
