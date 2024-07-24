import { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  InvokeModelWithResponseStreamCommand,
  InvokeModelWithResponseStreamCommandInput,
  InvokeModelWithResponseStreamCommandOutput,
} from '@aws-sdk/client-bedrock-runtime';
import { bedrockclient } from '../configs/aws.config.ts';
import { Output } from '../types';

interface BedrockController {
  getAnalysis: RequestHandler;
}

export const bedrockController: BedrockController = {
  getAnalysis: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { prompt }: { prompt: string } = req.body;

      const input: InvokeModelWithResponseStreamCommandInput = {
        modelId: 'mistral.mistral-7b-instruct-v0:2',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          prompt: prompt,
        }),
      };
      const command: InvokeModelWithResponseStreamCommand =
        new InvokeModelWithResponseStreamCommand(input);
      const responseStream: InvokeModelWithResponseStreamCommandOutput =
        await bedrockclient.send(command);

      res.setHeader('Content-Type', 'text/event-stream'); //informs the browser that the server will be sending Server-Sent Events (SSE)
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders(); // prevent the connection from timing out

      for await (const event of responseStream.body) {
        const chunk = JSON.parse(new TextDecoder().decode(event.chunk.bytes));
        if (chunk.outputs && chunk.outputs.length > 0) {
          chunk.outputs.forEach((output: Output) => {
            res.write(`data: ${output.text}\n\n`);
            res.flush(); // Flush the data immediately
          });
        }
      }

      return next();
    } catch (err) {
      return next({
        log: `Error in bedrockController.getAnalysis middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error getting analysis from AWS bedrock.',
        },
      });
    }
  },
};
