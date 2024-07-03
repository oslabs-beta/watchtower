import React from 'react';
import RcuGraphContainer from './RcuGraphContainer';
import WcuGraphContainer from './WcuGraphContainer';
import TotalTimeGraphContainer from './TotalTimeGraphContainer';
import '../styles/graphContainer.scss';

function GraphContainer() {
  return (
    <div className='graphContainer'>
      <h2>Graphical Analysis</h2>
      <RcuGraphContainer />
      <WcuGraphContainer />
      <TotalTimeGraphContainer />
    </div>
  );
}

export default GraphContainer;
