const cloudWatchInput = {
  // GetMetricStatisticsInput
  Namespace: 'AWS/DynamoDB', // required
  MetricName: 'ConsumedReadCapacityUnits', // required
  Dimensions: [
    // Dimensions
    {
      // Dimension
      Name: 'TableName', // required
      Value: 'mockUserTable1', // required
    },
  ],
  StartTime: new Date('2024-07-08T15:20:00.000Z'), // required
  EndTime: new Date('2024-07-08T15:30:00.000Z'), // required
  Period: Number('60'), // required
  Statistics: [
    // Statistics
    'Average',
    'Maximum',
    // 'SampleCount' || 'Average' || 'Sum' || 'Minimum' || 'Maximum',
  ],
  //   ExtendedStatistics: [
  //     // ExtendedStatistics
  //     'STRING_VALUE',
  //   ],
  //   Unit: 'Count/Second',
  // 'Seconds' ||
  // 'Microseconds' ||
  // 'Milliseconds' ||
  // 'Bytes' ||
  // 'Kilobytes' ||
  // 'Megabytes' ||
  // 'Gigabytes' ||
  // 'Terabytes' ||
  // 'Bits' ||
  // 'Kilobits' ||
  // 'Megabits' ||
  // 'Gigabits' ||
  // 'Terabits' ||
  // 'Percent' ||
  // 'Count' ||
  // 'Bytes/Second' ||
  // 'Kilobytes/Second' ||
  // 'Megabytes/Second' ||
  // 'Gigabytes/Second' ||
  // 'Terabytes/Second' ||
  // 'Bits/Second' ||
  // 'Kilobits/Second' ||
  // 'Megabits/Second' ||
  // 'Gigabits/Second' ||
  // 'Terabits/Second' ||
  // 'Count/Second' ||
  // 'None',
};

const cloudWatchCommand = new GetMetricStatisticsCommand(cloudWatchInput);
const cloudWatchResponse = await cloudWatchClient.send(cloudWatchCommand);
console.log(cloudWatchResponse);

console.table(cloudWatchResponse.Datapoints);
