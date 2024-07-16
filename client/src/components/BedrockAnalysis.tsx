import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Title from './Title';
import '../styles/__global.scss';
import { BedrockAnalysisProps } from '../../types/types';

export default function BedrockAnalysis({
  currentProvision,
  currentMetrics,
  fetchAnalysis,
}: BedrockAnalysisProps) {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysisClick = async () => {
    setLoading(true);
    setError(null);
    const data = await fetchAnalysis();
    if (data) {
      setAnalysisData(data);
    } else {
      setError('Failed to fetch analysis data.');
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Title>AI Amazon Bedrock Analysis</Title>
      <Box
        sx={{
          mt: 2,
          backgroundColor: 'var(--background-default)', // Use the global CSS variable
          height: '100px', // Adjust height as needed
          width: '100%',
          borderRadius: 1,
          p: 2,
        }}
      >
        {loading && <Typography variant='body1'>Loading...</Typography>}
        {error && (
          <Typography variant='body1' color='error'>
            {error}
          </Typography>
        )}
        {!loading && !error && analysisData && (
          <Typography variant='body1'>
            {JSON.stringify(analysisData)}
          </Typography>
        )}
        {!loading && !error && !analysisData && (
          <Typography variant='body1'>No analysis data available</Typography>
        )}
      </Box>
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
