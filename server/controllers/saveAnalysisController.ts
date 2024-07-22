import {
  // PutItemCommand,
  // PutItemCommandInput,
  CreateTableCommand,
  CreateTableCommandInput,
  // DescribeTableCommand,
  // DescribeTableCommandInput,
  // ResourceNotFoundException,
  // QueryCommandInput,
  // QueryCommand
} from '@aws-sdk/client-dynamodb';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { cloudWatchClient, dynamoDBClient } from '../configs/aws.config.ts';

interface SaveAnalysisController {
  createUserProfilesTable: RequestHandler;
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
      res.locals.tables = tables;
      return next();
    }

    try {
      const input: CreateTableCommandInput = {
        // CreateTableInput
        AttributeDefinitions: [
          // AttributeDefinitions // required
          {
            // AttributeDefinition
            AttributeName: 'analysisID', // required
            AttributeType: 'N', // required
          },
        ],
        TableName: analysisTable, // required
        KeySchema: [
          // KeySchema // required
          {
            // AttributeDefinition
            AttributeName: 'analysisID', // required
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
      tables.push(response.TableDescription.TableName);
      res.locals.tables = tables;
      return next();
    } catch (error) {
      // if (error instanceof ResourceNotFoundException) {
      //  // Table does not exist, create it
      //   const createTableInput: CreateTableCommandInput = {
      //     TableName: tableName,
      //     KeySchema: [
      //       { AttributeName: 'UserID', KeyType: 'HASH' }, // Partition key
      //       { AttributeName: 'AnalysisID', KeyType: 'RANGE' }, // Sort key
      //     ],
      //     AttributeDefinitions: [
      //       { AttributeName: 'UserID', AttributeType: 'S' },
      //       { AttributeName: 'AnalysisID', AttributeType: 'S' },
      //     ],
      //     ProvisionedThroughput: {
      //       ReadCapacityUnits: 4,
      //       WriteCapacityUnits: 4,
      //     },
      //   };

      //   await dynamoDBClient.send(new CreateTableCommand(createTableInput));
      //   console.log('Table created successfully');
      // } else {
      //   throw error;
      // }
      return next({
        log: `Error in saveAnalysisController.createUserProfilesTable middleware function: ${error}`,
        status: 500,
        message: {
          err: 'Error creating past analysis table for report.',
        },
      });
    }
  },

  //   export const saveAnalysisToDB = async (req: Request, res: Response, next: NextFunction) => {
  //     const { userID, analysisID, metrics } = req.body;
  //     const saveAnalysisInput: PutItemCommandInput = {
  //       TableName: 'UserProfiles',
  //       Item: {
  //         UserID: { S: userID },
  //         AnalysisID: { S: analysisID },
  //         Metrics: { S: JSON.stringify(metrics) },
  //         CreatedAt: { S: new Date().toISOString() },
  //       },
  //     };

  //     await dynamoDBClient.send(new PutItemCommand(saveAnalysisInput));
  // };

  //   getPastAnalyses: async (req: Request, res: Response, next: NextFunction) => {
  //     const userID = req.user.id;

  //     const queryInput: QueryCommandInput = {
  //       TableName: 'UserProfiles',
  //       KeyConditionExpression: 'UserID = :userID',
  //       ExpressionAttributeValues: {
  //         ':userID': { S: userID },
  //       },
  //     };
  //     try {
  //       const queryCommand = new QueryCommand(queryInput);
  //       const queryResponse = await dynamoDBClient.send(queryCommand);
  //       res.locals.pastAnalyses = queryResponse.Items;

  //       return next();
  //     } catch (err) {
  //       return next({
  //         log: `Error in metricController.getPastAnalyses middleware function: ${err}`,
  //         status: 500,
  //         message: {
  //           err: 'Error fetching past analyses from the database. Check server log for more details',
  //         },
  //       });
  //     }
  //   },
};
