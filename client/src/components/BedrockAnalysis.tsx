import React, { useState } from 'react';

const BedrockAnalysis = (): JSX.Element => {
  const [stream, setStream] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);

  const bedrockAnalysis = async (): Promise<void> => {
    setLoading(true);
    setStream('');
    //props.prompt
    const prompt: string = 'What is the weather today in NYC'; // Replace with actual prompt or state value
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

  const saveAnalysis = (): void => {
    //pass stream and prompt into database
  }

  return (
    <div>
      <button onClick={bedrockAnalysis} disabled={loading}>
        {loading ? 'Loading...' : 'Start Analysis'}
      </button>
      <button onClick={saveAnalysis} disabled={save}>
        Save Analysis
      </button>
      <p>{stream}</p>
    </div>
  );
};

export default BedrockAnalysis;