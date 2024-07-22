import { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  ListTablesCommand,
  ListTablesCommandInput,
  ListTablesCommandOutput
} from '@aws-sdk/client-dynamodb';
import { dynamoDBClient } from '../configs/aws.config.ts';

interface TablesController {
  getTables: RequestHandler;
}

export const tablesController: TablesController = {
  //get all the tables' name from AWS DynamoDB
  getTables: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      //pass in empty object to get all tables name
      const input: ListTablesCommandInput = {};
      const command: ListTablesCommand = new ListTablesCommand(input);
      //waiting for respoonse from DynamoDB
      const response: ListTablesCommandOutput = await dynamoDBClient.send(command);
      //save all tables name as an array
      res.locals.tables = response.TableNames;
      return next();
    } catch (err) {
      return next({
        log: `Error in tablesController.getTables middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error getting tables from DynamonDB.',
        },
      });
    }
  },
};
