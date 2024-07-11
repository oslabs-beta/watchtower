import React from 'react';
import { RcuGraphContainerProps } from '../../types/types';
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
  Legend,
} from 'recharts';

// Hard-coded data in case connection is not made by MVP presentation
const data = [
  { rcu: 40, time: '1' },
  { rcu: 100, time: '2' },
  { rcu: 23, time: '3' },
  { rcu: 33, time: '4' },
  { rcu: 54, time: '5' },
  { rcu: 88, time: '6' },
  { rcu: 26, time: '7' },
  { rcu: 77, time: '8' },
  { rcu: 33, time: '9' },
  { rcu: 86, time: '10' },
];

const RcuGraphContainer = ({
  provisionData,
  metrics,
}: RcuGraphContainerProps) => {
  // deconstruct startTime and endTime from provisionData
  const { startTime, endTime } = provisionData;

  //error when time is null so must account for that 
  const startTimeMillis = startTime
    ? new Date(startTime).getTime()
    : new Date().getTime();
  const endTimeMillis = endTime
    ? new Date(endTime).getTime()
    : new Date().getTime();

  const provisionedCapacity = 50; // Replace with metrics.RCU.provisionedCapacity

  return (
    <div className='indvidualGraph'>
      <h3>RCU</h3>
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
            dataKey='time'
            type='number'
            domain={[startTimeMillis, endTimeMillis]}
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
          >
            <Label value='Time' offset={-5} position='insideBottom' />
          </XAxis>
          <YAxis />
          <ReferenceLine
            y={provisionedCapacity}
            label='Provisioned Capacity'
            stroke='black'
          />
          <Tooltip />
          {/* <Legend /> */}
          <Line type='monotone' dataKey='rcu' stroke='#000000' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RcuGraphContainer;
