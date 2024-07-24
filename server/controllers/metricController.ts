import {
  GetMetricStatisticsCommand,
  GetMetricStatisticsCommandInput,
  GetMetricStatisticsCommandOutput,
} from '@aws-sdk/client-cloudwatch';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { cloudWatchClient } from '../configs/aws.config.ts';

interface MetricController {
  getConsumedRCUs: RequestHandler;
  getConsumedWCUs: RequestHandler;
  getProvisionedRCUs: RequestHandler;
  getProvisionedWCUs: RequestHandler;
}

export const metricController: MetricController = {
  getConsumedRCUs: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const {
      tableName,
      startTime,
      endTime,
    }: { tableName: string; startTime: Date; endTime: Date } = req.body;

    try {
      const cloudWatchInput: GetMetricStatisticsCommandInput = {
        Namespace: 'AWS/DynamoDB',
        MetricName: 'ConsumedReadCapacityUnits',
        Dimensions: [
          {
            Name: 'TableName',
            Value: `${tableName}`,
          },
        ],
        StartTime: new Date(`${startTime}`),
        EndTime: new Date(`${endTime}`),
        Period: Number('60'),
        Statistics: ['Average', 'Maximum'],
      };

      const getMetricStatisticsCommand: GetMetricStatisticsCommand =
        new GetMetricStatisticsCommand(cloudWatchInput);
      const cloudWatchResponse: GetMetricStatisticsCommandOutput =
        await cloudWatchClient.send(getMetricStatisticsCommand);

      res.locals.ConsRCU = cloudWatchResponse.Datapoints;

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

  getConsumedWCUs: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const {
      tableName,
      startTime,
      endTime,
    }: { tableName: string; startTime: Date; endTime: Date } = req.body;

    try {
      const cloudWatchInput: GetMetricStatisticsCommandInput = {
        Namespace: 'AWS/DynamoDB',
        MetricName: 'ConsumedWriteCapacityUnits',
        Dimensions: [
          {
            Name: 'TableName',
            Value: `${tableName}`,
          },
        ],
        StartTime: new Date(`${startTime}`),
        EndTime: new Date(`${endTime}`),
        Period: Number('60'),
        Statistics: ['Average', 'Maximum'],
      };

      const getMetricStatisticsCommand: GetMetricStatisticsCommand =
        new GetMetricStatisticsCommand(cloudWatchInput);
      const cloudWatchResponse: GetMetricStatisticsCommandOutput =
        await cloudWatchClient.send(getMetricStatisticsCommand);

      res.locals.ConsWCU = cloudWatchResponse.Datapoints;

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
  ): Promise<void> => {
    const {
      tableName,
      startTime,
      endTime,
    }: { tableName: string; startTime: Date; endTime: Date } = req.body;

    try {
      const cloudWatchInput: GetMetricStatisticsCommandInput = {
        Namespace: 'AWS/DynamoDB',
        MetricName: 'ProvisionedReadCapacityUnits',
        Dimensions: [
          {
            Name: 'TableName',
            Value: `${tableName}`,
          },
        ],
        StartTime: new Date(`${startTime}`),
        EndTime: new Date(`${endTime}`),
        Period: Number('60'),
        Statistics: ['Maximum'],
      };

      const getMetricStatisticsCommand: GetMetricStatisticsCommand =
        new GetMetricStatisticsCommand(cloudWatchInput);
      const cloudWatchResponse: GetMetricStatisticsCommandOutput =
        await cloudWatchClient.send(getMetricStatisticsCommand);

      res.locals.ProvRCU = cloudWatchResponse.Datapoints[0].Maximum;

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
  ): Promise<void> => {
    const {
      tableName,
      startTime,
      endTime,
    }: { tableName: string; startTime: Date; endTime: Date } = req.body;

    try {
      const cloudWatchInput: GetMetricStatisticsCommandInput = {
        Namespace: 'AWS/DynamoDB',
        MetricName: 'ProvisionedWriteCapacityUnits',
        Dimensions: [
          {
            Name: 'TableName',
            Value: `${tableName}`,
          },
        ],
        StartTime: new Date(`${startTime}`),
        EndTime: new Date(`${endTime}`),
        Period: Number('60'),
        Statistics: ['Maximum'],
      };

      const getMetricStatisticsCommand: GetMetricStatisticsCommand =
        new GetMetricStatisticsCommand(cloudWatchInput);
      const cloudWatchResponse: GetMetricStatisticsCommandOutput =
        await cloudWatchClient.send(getMetricStatisticsCommand);

      res.locals.ProvWCU = cloudWatchResponse.Datapoints[0].Maximum;

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
