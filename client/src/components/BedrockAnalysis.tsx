import React, { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { BedrockAnalysisProps } from '../../types/types';
import Swal from 'sweetalert2';

export default function BedrockAnalysis({
  currentProvision,
  currentMetrics,
  runGraph,
  save,
}: BedrockAnalysisProps): JSX.Element {
  const [stream, setStream] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();

  const bedrockAnalysis = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setStream('');

    if (!currentMetrics || !currentProvision) {
      setError('Failed to fetch analysis data.');
      setLoading(false);
      return;
    }

    const metrics: string = JSON.stringify(currentMetrics);
    // Replace prompt for different output from bedrock
    const prompt: string =
      metrics +
      'based on the data, analysis provision and consumed capacity for AWS dynamoDb and give advice for keeping current provision or switching to ondemand in compact and short way';

    try {
      const response: Response = await fetch('/api/bedrock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error('Failed to connect to SSE endpoint.');

      if (!response.body) throw new Error('Response body is null.');

      const reader: ReadableStreamDefaultReader<Uint8Array> =
        response.body.getReader();
      let accumulatedData: string = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk: string = new TextDecoder().decode(value, { stream: true });

        accumulatedData += chunk;

        const words: string[] = accumulatedData.split('\n\n');

        words.forEach((word) => {
          if (word.startsWith('data: ')) {
            const text: string = word.substring(6); // Remove 'data: ' prefix
            setStream((prevData) => prevData + text);
          }
        });

        accumulatedData = ''; // Clear accumulatedData after processing
      }

      setLoading(false);
    } catch (err) {
      console.error("Couldn't get analysis from bedrock: ", err);
      Swal.fire({
        title: 'Oops...',
        text: err.message,
        icon: 'error',
        confirmButtonColor: '#70c0c2',
      });
    }
  };

  const handleSaveAnalysis = async (): Promise<void> => {
    try {
      const response: Response = await fetch('/api/pastAnalysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provision: currentProvision,
          metrics: currentMetrics,
          bedrockAnalysis: stream,
        }),
      });

      if (!response.ok) {
        setError('Failed to save analysis');
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const message: string = await response.json();
      if (message === 'success') {
        Swal.fire({
          title: 'Sumbitted!',
          text: 'Report is successfully save in your table WatchTowerUserProfiles!',
          icon: 'success',
          confirmButtonColor: '#70c0c2',
        });
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
      Swal.fire({
        title: 'Oops...',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#70c0c2',
      });
    }
  };

  return (
    <React.Fragment>
      <Typography variant='h5' gutterBottom>
        AI Amazon Bedrock Analysis
      </Typography>
      <Box
        sx={{
          mt: 2,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.background.default
              : 'var(--background-default)',
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
        {!error && stream && <Typography variant='body1'>{stream}</Typography>}
        {!loading && !error && !stream && (
          <Typography variant='body1' color='error'>
            No analysis data available
          </Typography>
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
          disabled={!runGraph || loading}
        >
          {loading ? 'Loading...' : 'Start Analysis'}
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSaveAnalysis}
          disabled={!runGraph && !save}
        >
          Save Report
        </Button>
      </Box>
    </React.Fragment>
  );
}
