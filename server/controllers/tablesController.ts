import { Request, Response, NextFunction, RequestHandler } from 'express';
// import path from 'path';
import { config } from '../configs/aws.config.ts'
import {
  DynamoDBClient,
  ListTablesCommand,
} from '@aws-sdk/client-dynamodb';

interface TablesController {
  getTables: RequestHandler;
}

const dynamoDBClient = new DynamoDBClient(config);

// const command = new ListTablesCommand({});
// const response = await dynamoDBClient.send(command);
// console.log(response.TableNames)

export const tablesController: TablesController = {

  getTables: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = {};
      const command = new ListTablesCommand(input);
      const response = await dynamoDBClient.send(command);
      res.locals.tables = response.TableNames
      return next()
    } catch(err) {
      return next({
        log: `Error in tablesController.getTables middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error getting tables from DynamonDB.',
        },
      })
    }
  }

}