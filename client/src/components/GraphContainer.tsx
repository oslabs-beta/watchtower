import React, { useEffect, useState, useRef } from 'react';
import RcuGraphContainer from './RcuGraphContainer';
import WcuGraphContainer from './WcuGraphContainer';
import TotalTimeGraphContainer from './TotalTimeGraphContainer';
import ConsumedCapacity from './ConsumedCapacity';
import { ProvisionFormData, GraphContainerProps } from '../../types/types';
import '../styles/graphContainer.scss';

const GraphContainer = ({ currentProvision }: GraphContainerProps) => {
  //the useState stores the fetched data from the backend
  //the use ref stores the metrics to prevent re-fetching on the render
  const [currentMetrics, setCurrentMetrics] = useState(null);
  const savedMetrics = useRef(null);

  //run if the currentProvsion is defined and the savedMetrics.current is null
  useEffect(() => {
    if (currentProvision && !savedMetrics.current) {
      (async () => {
        try {
          //deconstruct the parameters from the props and send to the backend
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
          //update the saved metrics and the current metrics with the fetched data
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
      {currentProvision && currentMetrics && (
        <RcuGraphContainer
          provisionData={currentProvision}
          metrics={currentMetrics}
        />
      )}
      {currentProvision && currentMetrics && (
        <WcuGraphContainer
          provisionData={currentProvision}
          metrics={currentMetrics}
        />
      )}
      {currentProvision && currentMetrics && (
        <TotalTimeGraphContainer
          provisionData={currentProvision}
          metrics={currentMetrics}
        />
      )}
      {/* {currentProvision && currentMetrics && (
        <ConsumedCapacity
          provisionData={currentProvision}
          metrics={currentMetrics}
        />
      )} */}
    </div>
  );
};

export default GraphContainer;
