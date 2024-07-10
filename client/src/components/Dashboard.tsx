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
      // const response = await fetch('http://localhost:8000/tables', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(convertedTime),
      // });

      // if (!response.ok) {
      //   throw new Error('Error connecting to server');
      // }
      //set the current provison to the data saved
      setCurrentProvision(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.log(currentProvision);
  }, [currentProvision]);

  return (
    <div id='dashboard'>
      <NavBar />
      <div id='leftSide'>
        <StatusBox onSubmit={handleFormSubmit} />
        <AnalysisContainer />
      </div>
      <div id='rightSide'>
        {/* Send the currentProvision on the props to the graphContainer */}
        {/* <GraphContainer currentProvision={currentProvision} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
