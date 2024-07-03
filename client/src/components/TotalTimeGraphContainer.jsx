import React from 'react';
import '../styles/graphContainer.scss';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer, Label,
} from 'recharts';

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

function TotalTimeGraphContainer() {
  return (
    <div className='indvidualGraph'>
      <h3>Total Time</h3>
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
          <XAxis dataKey='time'>
            <Label value='Time' offset={-5} position='insideBottom' />
          </XAxis>
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Line type='monotone' dataKey='rcu' stroke='#000000' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TotalTimeGraphContainer;
