import React, { useState } from 'react';
import GraphContainer from './GraphContainer';
import StatusBox from './StatusBox';
import AnalysisContainer from './AnalysisContainer';
import NavBar from './NavBar';
import '../styles/Dashboard.scss';
import { ProvisionFormData } from '../../types/types';

const Dashboard = () => {

  //use state to keep track of what provision data the user requested
  const [currentProvision, setCurrentProvision] =
    useState<ProvisionFormData | null>(null);

  //handler function to handle the onSubmit 
  const handleFormSubmit = async (data: ProvisionFormData) => {
    try {
      const response = await fetch('/tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error connecting to server');
      }
      //set the current provison to the data saved
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
        {/* I think we can pass the provsion data on the props */}
        <GraphContainer />
      </div>
    </div>
  );
};

export default Dashboard;
