require('dotenv/config.js');
// const AWS = require('aws-sdk');
// const { fromEnv } = require('@aws-sdk/credential-providers');
// const { FooClient } = require("@aws-sdk/client-foo")
const {
  DynamoDBClient,
  DescribeTableCommand,
} = require('@aws-sdk/client-dynamodb');
const {
  CloudWatchClient,
  GetMetricStatisticsCommand,
} = require('@aws-sdk/client-cloudwatch');

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY_ID;
const region = process.env.REGION;
// console.log(secretAccessKey)

//

const cloudWatchClient = new CloudWatchClient({
  //   credentials: fromEnv(),
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: region,
});
const date = new Date();
const startTime = new Date('2024-07-08T15:20:00.000Z');
const end = new Date('2024-07-08T15:30:00.000Z');

console.log(date);
console.log(startTime);
// date.toISOString()
// console.log(DateTime.UTCnow)
//--start-time 2014-04-08T23:18:00Z --end-time 2014-04-09T23:18:00Z --period 3600

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
    'Sum',
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
// const cloudWatchCommand = new GetMetricStatisticsCommand(cloudWatchInput);
// const cloudWatchResponse = await cloudWatchClient.send(command);

// //sdk v3 configuration method attempt for DynamoDB:

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

//sdk v2 configuration method:

// const myConfig = new AWS.Config({
//   credentials: {
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   },
//   region: region,
// });

// AWS.config.update({ region: 'us-east-1' });
// AWS.config.update({
//   credentials: {
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   },
// });

// myConfig.getCredentials(function (err) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log('Access key:', myConfig.credentials.accessKeyId);
//   }
// });

// console.log(myConfig.credentials);

//lock in the API version.
// const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

// let table;

// dynamodb.describeTable(
//   { TableName: 'mockUserTable1' },
//   async function (err, data) {
//     if (err) console.log(err, err.stack);
//     // else console.log(data);
//     else table = await data;
//     // console.log(data);
//     // console.log(table.Table.ProvisionedThroughput.ReadCapacityUnits);
//     return table;
//   }
// );

// console.log(table.Table.ProvisionedThroughput.ReadCapacityUnits);
// console.log(table);
