import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Title from './Title';
import '../styles/__global.scss';
import { BedrockAnalysisProps } from '../../types/types';

export default function BedrockAnalysis({
  currentProvision,
  currentMetrics,
  // fetchAnalysis,
}: BedrockAnalysisProps): JSX.Element {
  const [stream, setStream] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [save, setSave] = useState<boolean>(false);

    const bedrockAnalysis = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setStream('');
    
    if(!currentMetrics) {
      setError('Failed to fetch analysis data.')
      setLoading(false)
      return
    }

    const metrics = JSON.stringify(currentMetrics)
    // Replace with actual prompt or state value
    const prompt: string = metrics + 
    'based on the data, analysis provision and consumed capacity for AWS dynamoDb and give advice for keeping current provision or switching to ondemand in compact and short way'; 
    // let isFirstChunk = true
  
    try {

      const response = await fetch('/api/bedrock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error('Failed to connect to SSE endpoint.');
      // Check if response body is null
      if (!response.body) throw new Error('Response body is null.');
      //https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
      const reader = response.body.getReader();
      let accumulatedData: string = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = new TextDecoder().decode(value, { stream: true });
        // Skip the first chunk becase its just a '?', have to check afterwards if it is still sending '?'
        // if (isFirstChunk) {
        //   isFirstChunk = false;
        //   continue;
        // }
        accumulatedData += chunk;
        // Split accumulated data by new lines and update state for each line
        const words: string[] = accumulatedData.split('\n\n');

        words.forEach(word => {
          if (word.startsWith('data: ')) {
            const text: string = word.substring(6); // Remove 'data: ' prefix
            setStream(prevData => prevData + text);
          }
        });

        accumulatedData = ''; // Clear accumulatedData after processing
      }

      setLoading(false);
      setSave(true)
    } catch (err) {
      console.error("Couldn't get analysis from bedrock: ", err);
    }
  };

  const handleSaveAnalysis = async () => {
    try {
      const response = await fetch('/api/pastAnalysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          provision: currentProvision, 
          metrics: currentMetrics,
          bedrockAnalysis: stream
         }),
      });

      if (!response.ok) {
        //if not success?
        setError('Failed to save analysis')
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const result = await response.json()
      setSave(false)

    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  }

  return (
    <React.Fragment>
      <Title>AI Amazon Bedrock Analysis</Title>
      <Box
        sx={{
          mt: 2,
          backgroundColor: 'var(--background-default)', 
          minHeight: '100px', 
          width: '100%',
          borderRadius: 1,
          p: 2,
        }}
      >
        {error && (
          <Typography variant='body1' color='error'>
            {error}
          </Typography>
        )}
        {!error && stream && (
          <Typography variant='body1'>
            {stream}
          </Typography>
        )}
        {!loading && !error && !stream && (
          <Typography variant='body1'>No analysis data available</Typography>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: '100%',
          mt: 2,
        }}
      >
        <Button
          variant='contained'
          color='primary'
          onClick={bedrockAnalysis}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Start Analysis'}
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSaveAnalysis}
          disabled={!save}
        >
          Save Report
        </Button>
      </Box>
    </React.Fragment>
  );
}
