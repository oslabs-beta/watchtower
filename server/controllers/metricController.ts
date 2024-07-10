import { CloudWatchClient, GetMetricStatisticsCommand, GetMetricStatisticsCommandInput } from '@aws-sdk/client-cloudwatch';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { config } from '../configs/aws.config.ts'

const cloudWatchClient = new CloudWatchClient(config)
interface MetricController {
  getConsumedRCUs: RequestHandler;
  getConsumedWCUs: RequestHandler;
  getProvisionedRCUs: RequestHandler;
  getProvisionedWCUs: RequestHandler;
}

//Example of working request to AWS Cloudwatch.

// const cloudWatchInput = {
//   // GetMetricStatisticsInput
//   Namespace: 'AWS/DynamoDB', // required
//   MetricName: 'ConsumedReadCapacityUnits', // required
//   Dimensions: [
//     // Dimensions
//     {
//       // Dimension
//       Name: 'TableName', // required
//       Value: 'mockUserTable1', // required
//     },
//   ],
//   StartTime: new Date('2024-07-08T15:20:00.000Z'), // required
//   EndTime: new Date('2024-07-08T15:30:00.000Z'), // required
//   Period: Number('60'), // required
//   Statistics: [
//     // Statistics
//     'Average',
//     'Maximum',
//     // 'SampleCount' || 'Average' || 'Sum' || 'Minimum' || 'Maximum',
//   ],
//   //   ExtendedStatistics: [
//   //     // ExtendedStatistics
//   //     'STRING_VALUE',
//   //   ],
//   //   Unit: 'Count/Second',
// }

// const cloudWatchCommand = new GetMetricStatisticsCommand(input);
// const cloudWatchResponse = await cloudWatchClient.send(cloudWatchCommand);

// console.table(cloudWatchResponse.Datapoints);


export const metricController: MetricController = {
  getConsumedRCUs: async (req: Request, res: Response, next: NextFunction) => {
    //types for deconstruct
    const { tableName, startTime, endTime } = req.body;

    try {
      const cloudWatchInput: GetMetricStatisticsCommandInput = {
        Namespace: 'AWS/DynamoDB', // required
        MetricName: 'ConsumedReadCapacityUnits', // required
        Dimensions: [
          {
            Name: 'TableName', // required
            Value: `${tableName}`, // required
          },
        ],
        StartTime: new Date(`${startTime}`), // required
        EndTime: new Date(`${endTime}`), // required
        Period: Number('60'), // required
        Statistics: [
          // Statistics
          'Average',
          'Maximum',
        ],
      };

      const getMetricStatisticsCommand = new GetMetricStatisticsCommand(
        cloudWatchInput
      );
      const cloudWatchResponse = await cloudWatchClient.send(
        getMetricStatisticsCommand
      );
      // console.log(cloudWatchResponse);
      res.locals.metrics.RCU.consumedUsage = cloudWatchResponse.Datapoints;
      return next();
    } catch (err) {
      return next({
        log: `Error in metricController.getConsumedRCUs middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error getting table metrics from DynamonDB. Check server log for more details',
        },
      });
    }
  },

  getConsumedWCUs: async (req: Request, res: Response, next: NextFunction) => {
    //types for deconstruct
    const { tableName, startTime, endTime } = req.body;

    try {
      const cloudWatchInput: GetMetricStatisticsCommandInput = {
        Namespace: 'AWS/DynamoDB', // required
        MetricName: 'ConsumedWriteCapacityUnits', // required
        Dimensions: [
          {
            Name: 'TableName', // required
            Value: `${tableName}`, // required
          },
        ],
        StartTime: new Date(`${startTime}`), // required
        EndTime: new Date(`${endTime}`), // required
        Period: Number('60'), // required
        Statistics: [
          // Statistics
          'Average',
          'Maximum',
        ],
      };

      const getMetricStatisticsCommand = new GetMetricStatisticsCommand(
        cloudWatchInput
      );
      const cloudWatchResponse = await cloudWatchClient.send(
        getMetricStatisticsCommand
      );
      // console.log(cloudWatchResponse);
      res.locals.metrics.WCU.consumedUsage = cloudWatchResponse.Datapoints;

      return next();
    } catch (err) {
      return next({
        log: `Error in metricController.getConsumedWCUs middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error getting table metrics from DynamonDB. Check server log for more details',
        },
      });
    }
  },

  getProvisionedRCUs: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //types for deconstruct
    const { tableName, startTime, endTime } = req.body;

    try {
      const cloudWatchInput: GetMetricStatisticsCommandInput = {
        Namespace: 'AWS/DynamoDB', // required
        MetricName: 'ProvisionedReadCapacityUnits', // required
        Dimensions: [
          {
            Name: 'TableName', // required
            Value: `${tableName}`, // required
          },
        ],
        StartTime: new Date(`${startTime}`), // required
        EndTime: new Date(`${endTime}`), // required
        Period: Number('60'), // required
        Statistics: [
          // Statistics
          'Maximum',
        ],
      };

      const getMetricStatisticsCommand = new GetMetricStatisticsCommand(
        cloudWatchInput
      );
      const cloudWatchResponse = await cloudWatchClient.send(
        getMetricStatisticsCommand
      );
      // console.log(cloudWatchResponse);
      res.locals.metrics.RCU.provisionedCapacity =
        cloudWatchResponse.Datapoints[0].Maximum;

      return next();
    } catch (err) {
      return next({
        log: `Error in metricController.getProvisionedRCUs middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error getting table metrics from DynamonDB. Check server log for more details',
        },
      });
    }
  },

  getProvisionedWCUs: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //types for deconstruct
    const { tableName, startTime, endTime } = req.body;

    try {
      const cloudWatchInput: GetMetricStatisticsCommandInput = {
        Namespace: 'AWS/DynamoDB', // required
        MetricName: 'ProvisionedWriteCapacityUnits', // required
        Dimensions: [
          {
            Name: 'TableName', // required
            Value: `${tableName}`, // required
          },
        ],
        StartTime: new Date(`${startTime}`), // required
        EndTime: new Date(`${endTime}`), // required
        Period: Number('60'), // required
        Statistics: [
          // Statistics
          'Average',
        ],
      };

      const getMetricStatisticsCommand = new GetMetricStatisticsCommand(
        cloudWatchInput
      );
      const cloudWatchResponse = await cloudWatchClient.send(
        getMetricStatisticsCommand
      );
      // console.log(cloudWatchResponse);
      res.locals.metrics.RCU.provisionedCapacity =
        cloudWatchResponse.Datapoints[0].Average;

      return next();
    } catch (err) {
      return next({
        log: `Error in metricController.getProvisionedWCUs middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error getting table metrics from DynamonDB. Check server log for more details',
        },
      });
    }
  },
};