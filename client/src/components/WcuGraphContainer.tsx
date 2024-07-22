import React from 'react';
import { WcuGraphContainerProps } from '../../types/types';
import '../styles/graphContainer.scss';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  ReferenceLine,
} from 'recharts';

const WcuGraphContainer = ({
  provisionData,
  metrics,
}: WcuGraphContainerProps) => {
  // // Deconstruct startTime and endTime from provisionData
  const { startTime, endTime } = provisionData;

  //save the data from the metrics
  const data = metrics.ConsWCU.map((item: any) => ({
    maximum: item.Maximum,
    timestamp: new Date(item.Timestamp).getTime(),
  })).sort((a, b) => a.timestamp - b.timestamp);

<<<<<<< HEAD
  console.log('data', data)

  const provisionedCapacity = metrics.ProvWCU;
=======
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
>>>>>>> 7a883519c8bd13b17368e7d56ed827d6e1314cb0

  return (
    <div className='indvidualGraph'>
      <h3>WCU</h3>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='timestamp'
            type='number'
            domain={[startTime, endTime]}
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
            scale='time'
          >
            <Label value='Time' offset={-5} position='insideBottom' />
          </XAxis>
          <YAxis dataKey='maximum' domain={[0, 1.5]}>
            <Label value='Maximum' angle={-90} position='insideLeft' />
          </YAxis>
          <ReferenceLine
            y={provisionedCapacity}
            label={<Label value='Maximum Provisoned Capacity' fill={'black'} />}
            stroke='black'
            className='reference-line-label'
          />
          <Tooltip
            labelFormatter={(label) => new Date(label).toLocaleTimeString()}
          />
          <Line type='monotone' dataKey='maximum' stroke='#000000' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WcuGraphContainer;
