import React, { useEffect, useState, useRef } from 'react';
import RcuGraphContainer from './RcuGraphContainer';
import WcuGraphContainer from './WcuGraphContainer';
import { ProvisionFormData, GraphContainerProps } from '../../types/types';
import '../styles/graphContainer.scss';

const defaultProvisionFormData: ProvisionFormData = {
  tableName: '',
  startTime: null,
  endTime: null,
};

const GraphContainer = ({ currentProvision }: GraphContainerProps) => {
  const [currentMetrics, setCurrentMetrics] = useState<any>(null);
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
      <h2>Graphical Analysis</h2>
      <div className='graphSubContainer'>
        <RcuGraphContainer
          provisionData={currentProvision || defaultProvisionFormData}
          metrics={currentMetrics || { ConsRCU: [], ProvRCU: 0 }}
        />
        <WcuGraphContainer
          provisionData={currentProvision || defaultProvisionFormData}
          metrics={currentMetrics || { ConsWCU: [], ProvWCU: 0 }}
        />
      </div>
    </div>
  );
};

export default GraphContainer;
