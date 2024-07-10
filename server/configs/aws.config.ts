import 'dotenv/config';
import { Config } from '../types.ts';

export const config: Config = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  },
  region: process.env.REGION,
};