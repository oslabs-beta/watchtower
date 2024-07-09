import React from 'react';
import GraphContainer from './GraphContainer.jsx';
import StatusContainer from './StatusContainer.jsx';
import AnalysisContainer from './AnalysisContainer.jsx';
import NavBar from './NavBar.jsx';
import '../styles/Dashboard.scss';

function Dashboard() {
  return (
    <div id='dashboard'>
      <NavBar />
      <div id='leftSide'>
        <StatusContainer />
        <AnalysisContainer />
      </div>
      <div id='rightSide'>
        <GraphContainer />
      </div>
    </div>
  );
}

export default Dashboard;
