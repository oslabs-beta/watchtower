<<<<<<< HEAD
require('dotenv/config.js');
// const AWS = require('aws-sdk');
// const { fromEnv } = require('@aws-sdk/credential-providers');
// const {
//   DynamoDBClient,
//   DescribeTableCommand,
// } = require('@aws-sdk/client-dynamodb');
const {
  CloudWatchClient,
  GetMetricStatisticsCommand,
} = require('@aws-sdk/client-cloudwatch');

const cloudWatchClient = new CloudWatchClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.region,
});

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
=======
import 'dotenv/config.js';
import { Config } from '../types.ts';
// import {
//   DynamoDBClient,
//   ListTablesCommand,
// } from '@aws-sdk/client-dynamodb';
// import {
//   CloudWatchClient,
//   GetMetricStatisticsCommand,
// } from '@aws-sdk/client-cloudwatch';

export const config: Config = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  },
  region: process.env.REGION,
}

// const cloudWatchClient = new CloudWatchClient(config);
// export const dynamoDBClient = new DynamoDBClient(config);
>>>>>>> aws-table

// //try to connect to mockUserTable1 to get metrics
// // const dynamoDBClient = new DynamoDBClient({});
// const input = {
//   TableName: 'mockUserTable1',
// };

<<<<<<< HEAD
// const command = new DescribeTableCommand(input);
// const response = await client.send(command);
=======
// const command = new ListTablesCommand({});
// const response = await dynamoDBClient.send(command);
>>>>>>> aws-table

// console.log(response);

// const RCU = response.Table.ProvisionedThroughput.ReadCapacityUnits
// console.log(RCU)

// res.locals.RCU = RCU;
