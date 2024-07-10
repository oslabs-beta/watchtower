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
};

// const cloudWatchClient = new CloudWatchClient(config);
// export const dynamoDBClient = new DynamoDBClient(config);

// //try to connect to mockUserTable1 to get metrics
// // const dynamoDBClient = new DynamoDBClient({});
// const input = {
//   TableName: 'mockUserTable1',
// };

// const command = new ListTablesCommand({});
// const response = await dynamoDBClient.send(command);

// console.log(response);

// const RCU = response.Table.ProvisionedThroughput.ReadCapacityUnits
// console.log(RCU)

// res.locals.RCU = RCU;
