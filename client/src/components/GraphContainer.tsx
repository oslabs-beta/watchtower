import React, { useEffect, useState } from 'react';
import RcuGraphContainer from './RcuGraphContainer';
import WcuGraphContainer from './WcuGraphContainer';
import TotalTimeGraphContainer from './TotalTimeGraphContainer';
import ConsumedCapacity from './ConsumedCapacity';
import { ProvisionFormData, GraphContainerProps } from '../../types/types';
import '../styles/graphContainer.scss';

const GraphContainer = ({ currentProvision }: GraphContainerProps) => {
  //update with the metrics from backend
  const [currentMetrics, setMetrics] = useState(null);

  //fetch the data from the backend
  useEffect(() => {
    //ensure that the currenrProvison is truthy aka the user has submitted the form
    if (currentProvision) {
      (async () => {
        try {
          //send the currentProvison on the params to the backend to get the correct metric
          const response = await fetch(
            `http://localhost:8000/metrics?${currentProvision}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (!response.ok) {
            throw new Error('Error fetching data');
          }

          const data = await response.json();
          setMetrics(data);
        } catch (error) {
          console.error('Error:', error);
        }
      })();
    }
  }, [currentProvision]);

  return (
    <div className='graphContainer'>
      <h2>Graphical Analysis</h2>
      {currentProvision && (
        <RcuGraphContainer
          provisionData={currentProvision}
          metrics={currentMetrics}
        />
      )}

      {currentProvision && (
        <WcuGraphContainer
          provisionData={currentProvision}
          metrics={currentMetrics}
        />
      )}
      {currentProvision && (
        <TotalTimeGraphContainer
          provisionData={currentProvision}
          metrics={currentMetrics}
        />
      )}
      {/* {currentProvision && (
        <ConsumedCapacity
          provisionData={currentProvision}
          metrics={currentMetrics}
        />
      )} */}
    </div>
  );
};

export default GraphContainer;
