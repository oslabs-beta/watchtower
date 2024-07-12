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

  console.log('data', data)

  const provisionedCapacity = metrics.ProvWCU;

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
