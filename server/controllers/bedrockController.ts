import { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  InvokeModelCommand, 
  InvokeModelCommandInput,
  InvokeModelWithResponseStreamCommand,
  InvokeModelWithResponseStreamCommandInput
} from '@aws-sdk/client-bedrock-runtime';
import { bedrockclient } from '../configs/aws.config.ts';

interface BedrockController {
  getAnlysis: RequestHandler;
}

// const input = { // InvokeModelRequest
//   body: new Uint8Array(), // e.g. Buffer.from("") or new TextEncoder().encode("")   // required
//   contentType: "STRING_VALUE",
//   accept: "STRING_VALUE",
//   modelId: "mistral.mistral-7b-instruct-v0:2", // required
//   trace: "ENABLED" || "DISABLED",
//   guardrailIdentifier: "STRING_VALUE",
//   guardrailVersion: "STRING_VALUE",
// };
// const input = {
//   body: new Uint8Array(),
//   modelId: "mistral.mistral-7b-instruct-v0:2",
// }

// { // InvokeModelResponse
//   body: new Uint8Array(), // required
//   contentType: "STRING_VALUE", // required
// };

export const bedrockController: BedrockController = {
  getAnlysis: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { prompt }: { prompt: string } = req.body;

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
      // const command = new InvokeModelCommand(input);
      // const response = await bedrockclient.send(command);
      // //Have to parse response into text: https://www.raymondcamden.com/2024/04/04/a-quick-first-look-at-amazon-bedrock-with-nodejs
      // const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      // console.log(responseBody.outputs[0])
      // res.locals.output = responseBody.outputs[0]

      //InvokeModelWithResponseStreamCommand
      // const input: InvokeModelWithResponseStreamCommandInput = {
      //   modelId: 'mistral.mistral-7b-instruct-v0:2', 
      //   contentType: 'application/json',
      //   accept: 'application/json',
      //   body: JSON.stringify({
      //     "prompt": prompt,
      //   })
      // }
      // const command = new InvokeModelWithResponseStreamCommand(input);
      // const response = await bedrockclient.send(command);

      } catch (err) {
      return next({
        log: `Error in bedrockController.getAnlysis middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error getting anlysis from AWS bedrock.',
        },
      });
    }
  },
};
