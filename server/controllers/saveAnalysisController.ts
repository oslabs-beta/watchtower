import {
  PutItemCommand,
  PutItemCommandInput,
  CreateTableCommand,
  CreateTableCommandInput,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { cloudWatchClient, dynamoDBClient } from '../configs/aws.config.ts';

interface SaveAnalysisController {
  createUserProfilesTable: RequestHandler;
  saveAnalysisToDB: RequestHandler;
  getPastAnalysis: RequestHandler;
}
// const saveAnalysisToDB = async (
//   userID: string,
//   analysisID: string,
//   metrics: any
// ): Promise<void> => {
//   await createUserProfilesTable(); // Ensure the table exists

//   const input: PutItemCommandInput = {
//     TableName: 'UserProfiles',
//     Item: {
//       UserID: { S: userID },
//       AnalysisID: { S: analysisID },
//       Metrics: { S: JSON.stringify(metrics) },
//       CreatedAt: { S: new Date().toISOString() },
//     },
//   };
//   await dynamoDBClient.send(new PutItemCommand(input));
// };

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
      // res.locals.tables = tables;
      res.locals.tableName = analysisTable
      return next();
    }

    try {
      const input: CreateTableCommandInput = {
        // CreateTableInput
        AttributeDefinitions: [
          // AttributeDefinitions // required
          {
            // AttributeDefinition
            AttributeName: 'createdAt', // required
            AttributeType: 'S', // required
          },
        ],
        TableName: analysisTable, // required
        KeySchema: [
          // KeySchema // required
          {
            // AttributeDefinition
            AttributeName: 'createdAt', // required
            KeyType: 'HASH', // required
          },
        ],

        ProvisionedThroughput: {
          ReadCapacityUnits: Number('1'), // required
          WriteCapacityUnits: Number('1'), // required
        },
      };
      const command = new CreateTableCommand(input);
      const response = await dynamoDBClient.send(command);
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

  saveAnalysisToDB: async (req: Request, res: Response, next: NextFunction) => {
    const { provision, metrics, bedrockAnalysis } = req.body;

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
      const command = new PutItemCommand(saveAnalysisInput);
      const response = await dynamoDBClient.send(command);

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

  getPastAnalysis: async (req: Request, res: Response, next: NextFunction) => {
    const input = {
      // ScanInput
      TableName: 'WatchTowerUserProfiles', // required
    };

    try {
      const command = new ScanCommand(input);
      const response = await dynamoDBClient.send(command);

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
