import React from 'react';
import { Typography } from '@mui/material';
import { ReportsProps } from '../../types/types';
import Layout from './Layout';

const Reports = ({ timeFrame }: ReportsProps) => (
  <Layout>
    <Typography variant='h4'>
      Reports {timeFrame ? ` - ${timeFrame}` : ''}
    </Typography>
  </Layout>
);

export default Reports;
