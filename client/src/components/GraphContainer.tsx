import React, { useEffect, useState, useRef } from 'react';
import RcuGraphContainer from './RcuGraphContainer';
import WcuGraphContainer from './WcuGraphContainer';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { ProvisionFormData, GraphContainerProps } from '../../types/types';
import '../styles/graphContainer.scss';

const defaultProvisionFormData: ProvisionFormData = {
  tableName: '',
  startTime: null,
  endTime: null,
};

const GraphContainer = ({ currentProvision }: GraphContainerProps) => {
  const [currentMetrics, setCurrentMetrics] = useState<any>(null);
  const [selectedGraph, setSelectedGraph] = useState('RCU');
  const savedMetrics = useRef(null);

  useEffect(() => {
    if (currentProvision) {
      (async () => {
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
          savedMetrics.current = data;
          setCurrentMetrics(data);
        } catch (error) {
          console.error('Error fetching metrics:', error);
        }
      })();
    }
  }, [currentProvision]);

  return (
    <div className='graphContainer'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          mb: 2,
        }}
      >
        <Typography variant='h4' gutterBottom>
          Graphical Analysis
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id='graph-type-label'>Select Graph Type</InputLabel>
          <Select
            labelId='graph-type-label'
            id='graph-type'
            value={selectedGraph}
            onChange={(e) => setSelectedGraph(e.target.value)}
            label='Select Graph Type'
          >
            <MenuItem value='RCU'>RCU</MenuItem>
            <MenuItem value='WCU'>WCU</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div className='graphSubContainer'>
        {selectedGraph === 'RCU' ? (
          <div className='individualGraph'>
            <RcuGraphContainer
              provisionData={currentProvision || defaultProvisionFormData}
              metrics={currentMetrics || { ConsRCU: [], ProvRCU: 0 }}
            />
          </div>
        ) : (
          <div className='individualGraph'>
            <WcuGraphContainer
              provisionData={currentProvision || defaultProvisionFormData}
              metrics={currentMetrics || { ConsWCU: [], ProvWCU: 0 }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphContainer;
