import { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  InvokeModelWithResponseStreamCommand,
  InvokeModelWithResponseStreamCommandInput,
  InvokeModelWithResponseStreamCommandOutput
} from '@aws-sdk/client-bedrock-runtime';
import { bedrockclient } from '../configs/aws.config.ts';

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
      //Model list: https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html
      //Model pricing: https://aws.amazon.com/bedrock/pricing/?refid=ft_card
      //Model body format: https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html
      //Not all model has responsesteram, if the model you want use dont have responsestream, you can use invokemodelcommand
      //Different model might have different input format, we are using Mistral 7B Instruct
      const input: InvokeModelWithResponseStreamCommandInput = {
        modelId: 'mistral.mistral-7b-instruct-v0:2', 
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          "prompt": prompt,
        })
      }
      const command: InvokeModelWithResponseStreamCommand = new InvokeModelWithResponseStreamCommand(input);
      const responseStream: InvokeModelWithResponseStreamCommandOutput = await bedrockclient.send(command);

      // Set headers for server-sent events (SSE)
      res.setHeader('Content-Type', 'text/event-stream'); //informs the browser that the server will be sending Server-Sent Events (SSE) (require)
      res.setHeader('Cache-Control', 'no-cache'); //prevents the browser from caching the response (looks like optional)
      res.setHeader('Connection', 'keep-alive'); //keeps the connection between the client and the server open (looks like optional)
      res.flushHeaders();// Add this header to prevent the connection from timing out (require)

      for await (const event of responseStream.body) {
        //Have to decode into readable text: https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-runtime_example_bedrock-runtime_InvokeModelWithResponseStream_MetaLlama2_section.html
        const chunk = JSON.parse(new TextDecoder().decode(event.chunk.bytes));
        if (chunk.outputs && chunk.outputs.length > 0) {
          chunk.outputs.forEach((output: any) => {
            //In SSE, each event should be prefixed with data: and suffixed with \n\n to denote the end of the event.
            //Great explanation for res.write: https://blog.kevinchisholm.com/javascript/node-js/express-js/response-send-end-write-difference/
            res.write(`data: ${output.text}\n\n`); 
            res.flush(); // Flush the data immediately
          });
        }
      }

      return next()
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


//InvokeModelCommand
// //Model list: https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html
// //Model pricing: https://aws.amazon.com/bedrock/pricing/?refid=ft_card
// //Model body format: https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html
// const input: InvokeModelCommandInput = {
//   modelId: 'mistral.mistral-7b-instruct-v0:2', 
//   contentType: 'application/json',
//   accept: 'application/json',
//   body: JSON.stringify({
//     "prompt": prompt,
//   })
// }
// const command: InvokeModelCommand = new InvokeModelCommand(input);
// const response: InvokeModelCommandOutput = await bedrockclient.send(command);
// //Have to parse response into text: https://www.raymondcamden.com/2024/04/04/a-quick-first-look-at-amazon-bedrock-with-nodejs
// const responseBody = JSON.parse(new TextDecoder().decode(response.body));
// console.log(responseBody.outputs[0].text)
// res.locals.output = responseBody.outputs[0]