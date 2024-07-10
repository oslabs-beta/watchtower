import { Request, Response, NextFunction, RequestHandler } from 'express';
import { config } from '../configs/aws.config.ts'
import { BedrockRuntimeClient, InvokeModelCommand, InvokeModelCommandInput } from "@aws-sdk/client-bedrock-runtime";

const bedrockclient = new BedrockRuntimeClient(config);

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
// const command = new InvokeModelCommand(input);
// const response = await client.send(command);

// { // InvokeModelResponse
//   body: new Uint8Array(), // required
//   contentType: "STRING_VALUE", // required
// };

export const bedrockController: BedrockController = {

  getAnlysis: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      return next()
    } catch(err) {
      return next({
        log: `Error in bedrockController.getAnlysis middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error getting anlysis from AWS bedrock.',
        },
      })
    }
  }
}