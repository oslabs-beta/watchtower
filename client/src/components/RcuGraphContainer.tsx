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
} from 'recharts';

const RcuGraphContainer = ({
  provisionData,
  metrics,
}: RcuGraphContainerProps) => {
  const { startTime, endTime } = provisionData || {};
  const data = (metrics?.ConsRCU || [])
    .map((item: any) => ({
      maximum: item.Maximum,
      timestamp: new Date(item.Timestamp).getTime(),
    }))
    .sort((a, b) => a.timestamp - b.timestamp);

  const provisionedCapacity = metrics?.ProvRCU || 0;

  return (
    <div className='indvidualGraph'>
      <h3>RCU</h3>
      <ResponsiveContainer width='100%' height={200}>
        <LineChart
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
            domain={[startTime || 'auto', endTime || 'auto']}
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
            label={<Label value='Maximum Provisoned Capacity' fill='black' />}
            stroke='black'
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

export default RcuGraphContainer;
