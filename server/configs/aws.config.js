require('dotenv/config.js');
// const AWS = require('aws-sdk');
// const { fromEnv } = require('@aws-sdk/credential-providers');
// const {
//   DynamoDBClient,
//   DescribeTableCommand,
// } = require('@aws-sdk/client-dynamodb');
const { CloudWatchClient } = require('@aws-sdk/client-cloudwatch');

const cloudWatchClient = new CloudWatchClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.region,
});

module.exports = cloudWatchClient;
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
