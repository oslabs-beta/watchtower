import 'dotenv/config';
import { Config } from '../types.ts';
import { CloudWatchClient } from '@aws-sdk/client-cloudwatch';
import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const config: Config = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  },
  region: process.env.REGION,
};

export const cloudWatchClient = new CloudWatchClient(config);
export const dynamoDBClient = new DynamoDBClient(config);
export const bedrockclient = new BedrockRuntimeClient(config);
