// require('dotenv/config.js');
// const { CloudWatchClient } = require('@aws-sdk/client-cloudwatch');
// const { GetMetricStatisticsCommand } = require('@aws-sdk/client-cloudwatch'); //added just for testing purposes

import 'dotenv/config.js';
import {
  CloudWatchClient,
  GetMetricStatisticsCommand,
} from '@aws-sdk/client-cloudwatch';

const cloudWatchClient = new CloudWatchClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  },
  region: process.env.REGION,
});
// console.log(process.env.AWS_ACCESS_KEY_ID);

// console.log(cloudWatchClient);

// module.exports = cloudWatchClient;

const cloudWatchInput = {
  // GetMetricStatisticsInput
  Namespace: 'AWS/DynamoDB', // required
  MetricName: 'ProvisionedReadCapacityUnits', // required
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
    // 'Maximum',
    // 'SampleCount' || 'Average' || 'Sum' || 'Minimum' || 'Maximum',
  ],
  //   ExtendedStatistics: [
  //     // ExtendedStatistics
  //     'STRING_VALUE',
  //   ],
  //   Unit: 'Count/Second',
};

const getMetricStatisticsCommand = new GetMetricStatisticsCommand(
  cloudWatchInput
);
// console.log(getMetricStatisticsCommand);

const cloudWatchResponse = await cloudWatchClient.send(
  getMetricStatisticsCommand
);
console.log(cloudWatchResponse);

// //sdk v3 configuration method for DynamoDB:

// const client = new DynamoDBClient({
//   //   credentials: fromEnv(),
//   credentials: {
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   },
//   region: region,
// });

// // console.log(fromEnv);

// //try to connect to mockUserTable1 to get metrics
// // const dynamoDBClient = new DynamoDBClient({});
// const input = {
//   TableName: 'mockUserTable1',
// };

// const command = new DescribeTableCommand(input);
// const response = await client.send(command);

// console.log(response);

// const RCU = response.Table.ProvisionedThroughput.ReadCapacityUnits
// console.log(RCU)

// res.locals.RCU = RCU;
