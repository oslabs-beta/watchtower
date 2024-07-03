import React from 'react';
import GraphContainer from './GraphContainer.jsx';
import StatusContainer from './StatusContainer.jsx';
import AnalysisContainer from './AnalysisContainer.jsx';

function Dashboard() {
  return (
    <div>
      <StatusContainer />
      <AnalysisContainer />
      <div>
        <GraphContainer />
      </div>
    </div>
  );
}

export default Dashboard;
