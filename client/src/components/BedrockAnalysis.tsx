import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Title from './Title';
import '../styles/__global.scss';

export default function BedrockAnalysis() {
  const handleAnalysisClick = () => {
    // Function to handle the analysis button click
    console.log('Analysis button clicked');
  };

  return (
    <React.Fragment>
      <Title>AI Amazon Bedrock Analysis</Title>
      <Box
        sx={{
          mt: 2,
          backgroundColor: 'var(--background-default)',
          height: '120',
          width: '100%',
          borderRadius: 1,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          height: '100%',
          mt: 2,
        }}
      >
        <Button
          variant='contained'
          color='primary'
          onClick={handleAnalysisClick}
        >
          Click for Analysis
        </Button>
      </Box>
    </React.Fragment>
  );
}
