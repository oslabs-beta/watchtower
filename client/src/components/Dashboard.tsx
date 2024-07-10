import React, { useState, useEffect } from 'react';
import GraphContainer from './GraphContainer';
import StatusBox from './StatusBox';
import AnalysisContainer from './AnalysisContainer';
import NavBar from './NavBar';
import '../styles/Dashboard.scss';
import { ProvisionFormData } from '../../types/types';

const Dashboard = () => {
  //use state to keep track of what provision data the user requested
  //The current provsion must be in the ProvisonFormData format or null
  const [currentProvision, setCurrentProvision] =
    useState<ProvisionFormData | null>(null);

  //handler function to handle the onSubmit for StatusBox
  //On Submit a post request will be made with the data from the request form
  const handleFormSubmit = async (data: ProvisionFormData) => {
    try {
      setCurrentProvision(data);
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
        {/* Send the currentProvision on the props to the graphContainer */}
        <GraphContainer currentProvision={currentProvision} />
      </div>
    </div>
  );
};

export default Dashboard;
