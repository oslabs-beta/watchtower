import {
  PutItemCommand,
  PutItemCommandInput,
  PutItemCommandOutput,
  CreateTableCommand,
  CreateTableCommandInput,
  CreateTableCommandOutput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { dynamoDBClient } from '../configs/aws.config.ts';
import { ProvisionFormData, Metrics } from '../../client/types/types.d';

interface SaveAnalysisController {
  createUserProfilesTable: RequestHandler;
  saveAnalysisToDB: RequestHandler;
  getPastAnalysis: RequestHandler;
}

export const saveAnalysisController: SaveAnalysisController = {
  createUserProfilesTable: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { tables } = res.locals;
    const analysisTable = 'WatchTowerUserProfiles';
    //check tablename is in the tables array
    if (tables.includes(analysisTable)) {
      res.locals.tableName = analysisTable;
      return next();
    }

    try {
      const input: CreateTableCommandInput = {
        AttributeDefinitions: [
          {
            AttributeName: 'createdAt',
            AttributeType: 'S',
          },
        ],
        TableName: analysisTable,
        KeySchema: [
          {
            AttributeName: 'createdAt',
            KeyType: 'HASH',
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: Number('1'),
          WriteCapacityUnits: Number('1'),
        },
      };
      const command: CreateTableCommand = new CreateTableCommand(input);
      const response: CreateTableCommandOutput = await dynamoDBClient.send(
        command
      );
      tables.push(response.TableDescription.TableName)
      res.locals.tables = tables
      res.locals.tableName = response.TableDescription.TableName;
      return next();
    } catch (error) {
      return next({
        log: `Error in saveAnalysisController.createUserProfilesTable middleware function: ${error}`,
        status: 500,
        message: {
          err: 'Error creating past analysis table for report.',
        },
      });
    }
  },

  saveAnalysisToDB: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const {
      provision,
      metrics,
      bedrockAnalysis,
    }: {
      provision: ProvisionFormData;
      metrics: Metrics;
      bedrockAnalysis: string;
    } = req.body;

    try {
      const saveAnalysisInput: PutItemCommandInput = {
        TableName: 'WatchTowerUserProfiles',
        Item: {
          createdAt: { S: new Date().toISOString() },
          provision: { S: JSON.stringify(provision) },
          metrics: { S: JSON.stringify(metrics) },
          bedrockAnalysis: { S: bedrockAnalysis },
        },
      };
      const command: PutItemCommand = new PutItemCommand(saveAnalysisInput);
      const response: PutItemCommandOutput = await dynamoDBClient.send(command);

      res.locals.message = 'success';

      return next();
    } catch (error) {
      return next({
        log: `Error in saveAnalysisController.saveAnalysisToD middleware function: ${error}`,
        status: 500,
        message: {
          err: 'Error saving analysis to table name WatchTowerUserProfiles for report.',
        },
      });
    }
  },

  getPastAnalysis: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const input: ScanCommandInput = {
      TableName: 'WatchTowerUserProfiles',
    };

    try {
      const command: ScanCommand = new ScanCommand(input);
      const response: ScanCommandOutput = await dynamoDBClient.send(command);

      res.locals.pastAnalysis = response.Items;

      return next();
    } catch (err) {
      return next({
        log: `Error in metricController.getPastAnalyses middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error fetching past analyses from the database. Check server log for more details',
        },
      });
    }
  },
};
