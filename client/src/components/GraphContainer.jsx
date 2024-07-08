import React from 'react';
import RcuGraphContainer from './RcuGraphContainer';
import WcuGraphContainer from './WcuGraphContainer';
import TotalTimeGraphContainer from './TotalTimeGraphContainer';
import ConsumedCapacity from './ConsumedCapacity';
import '../styles/graphContainer.scss';

function GraphContainer() {
  return (
    <div className='graphContainer'>
      <h2>Graphical Analysis</h2>
      <RcuGraphContainer />
      <WcuGraphContainer />
      <TotalTimeGraphContainer />
      <ConsumedCapacity />
    </div>
  );
}

export default GraphContainer;
