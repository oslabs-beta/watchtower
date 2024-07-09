import React from 'react';
import GraphContainer from './GraphContainer';
import StatusContainer from './StatusContainer';
import AnalysisContainer from './AnalysisContainer';
import NavBar from './NavBar';
import '../styles/Dashboard.scss';

const Dashboard = () => {
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
