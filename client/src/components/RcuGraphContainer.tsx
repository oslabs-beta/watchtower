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
  // // Deconstruct startTime and endTime from provisionData
  const { startTime, endTime } = provisionData;

  //save the data from the metrics
  const data = metrics.ConsRCU.map((item: any) => ({
    average: item.Average,
    timestamp: new Date(item.Timestamp).getTime(),
  })).sort((a, b) => a.timestamp - b.timestamp);

  const provisionedCapacity = metrics.ProvRCU;

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
            dataKey='timestamp'
            type='number'
            domain={[startTime, endTime]}
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
            scale='time'
          >
            <Label value='Time' offset={-5} position='insideBottom' />
          </XAxis>
          <YAxis dataKey='average' domain={[0, 1.5]}>
            <Label value='Average' angle={-90} position='insideLeft' />
          </YAxis>
          <ReferenceLine
            y={provisionedCapacity}
            label={<Label value='Maximum Provisoned Capacity' fill={'black'} />}
            stroke='black'
          />
          <Tooltip
            labelFormatter={(label) => new Date(label).toLocaleTimeString()}
          />
          <Line type='monotone' dataKey='average' stroke='#000000' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RcuGraphContainer;
