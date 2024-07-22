import React from 'react';
import BedrockAnalysis from './BedrockAnalysis';
import '../styles/analysisContainer.scss';

const AnalysisContainer = () => {
  return (
    <div id='analysisContainer'>
      <h2>Predictive Analysis</h2>
      <BedrockAnalysis />
    </div>
  );
};

export default AnalysisContainer;