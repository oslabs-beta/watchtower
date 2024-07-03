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
  ResponsiveContainer,
  Label,
} from 'recharts';

const data = [
  { wcu: 40, time: '1' },
  { wcu: 100, time: '2' },
  { wcu: 23, time: '3' },
  { wcu: 33, time: '4' },
  { wcu: 54, time: '5' },
  { wcu: 88, time: '6' },
  { wcu: 26, time: '7' },
  { wcu: 77, time: '8' },
  { wcu: 33, time: '9' },
  { wcu: 86, time: '10' },
];

function WcuGraphContainer() {
  return (
    <div className='indvidualGraph'>
      <h3>Write Capacity Unit</h3>
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
          <Line type='monotone' dataKey='wcu' stroke='#000000' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WcuGraphContainer;
