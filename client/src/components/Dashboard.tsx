import React, { useState } from 'react';
import GraphContainer from './GraphContainer';
import StatusBox from './StatusBox';
import AnalysisContainer from './AnalysisContainer';
import NavBar from './NavBar';
import '../styles/Dashboard.scss';
import { ProvisionFormData } from '../../types/types';

const Dashboard = () => {
  // useState to keep track of the provision data
  const [currentProvision, setCurrentProvision] =
    useState<ProvisionFormData | null>(null);

  // handler function to handle the onSubmit for StatusBox
  const handleFormSubmit = async (data: ProvisionFormData) => {
    try {
      setCurrentProvision(data);
      console.log('Provision saved', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id='dashboard'>
      <NavBar />
      <div id='leftSide'>
        <StatusBox onSubmit={handleFormSubmit} />
        <AnalysisContainer />
      </div>
      <div id='rightSide'>
        {/* Send the currentProvision on the props to the GraphContainer */}
        <GraphContainer currentProvision={currentProvision} />
      </div>
    </div>
  );
};

export default Dashboard;
