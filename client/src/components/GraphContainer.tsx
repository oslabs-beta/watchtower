import React, { useState, useRef } from 'react';
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

const GraphContainer = ({
  currentProvision,
  currentMetrics,
}: GraphContainerProps) => {
  const [selectedGraph, setSelectedGraph] = useState('RCU');
  const savedMetrics = useRef(currentMetrics);

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
