import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, ChartOptions, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { WcuGraphContainerProps } from '../../types/types';
import '../styles/graphContainer.scss';

// Register the required components
Chart.register(...registerables, annotationPlugin);

const WcuGraphContainer = ({
  provisionData,
  metrics,
}: WcuGraphContainerProps) => {
  const { startTime, endTime } = provisionData || {};
  const data = (metrics?.ConsWCU || [])
    .map((item: any) => ({
      maximum: item.Maximum,
      timestamp: new Date(item.Timestamp).getTime(),
      timeLabel: new Date(item.Timestamp).toLocaleTimeString(), // Use formatted string for labels
    }))
    .sort((a, b) => a.timestamp - b.timestamp);

  const provisionedCapacity = metrics?.ProvWCU || 0;

  const chartData = {
    labels: data.length > 0 ? data.map((item) => item.timeLabel) : ['No Data'],
    datasets: [
      {
        label: 'Maximum',
        data: data.length > 0 ? data.map((item) => item.maximum) : [],
        backgroundColor: '#FF3030',
        borderColor: '#FF3030',
        fill: false,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // Ensure the graph maintains aspect ratio within the container
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        min: 0,
        grace: '5%',
        title: {
          display: true,
          text: 'Maximum',
        },
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Time: ${context.label}, Maximum: ${context.raw}`;
          },
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: provisionedCapacity,
            yMax: provisionedCapacity,
            borderColor: 'black',
            borderWidth: 2,
            label: {
              content: 'Maximum Provisioned Capacity',
              position: 'center',
              color: 'black',
            },
          },
        },
      },
    },
  };

  return (
    <div className='individualGraph'>
      <h3>WCU</h3>
      <div className='chartWrapper'>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default WcuGraphContainer;
