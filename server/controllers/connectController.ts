import { Request, Response, NextFunction, RequestHandler } from 'express';
import fs from 'fs';

interface ConnectController {
  saveAWSInfo: RequestHandler;
}

//https://iamwebwiz.medium.com/how-to-fix-dirname-is-not-defined-in-es-module-scope-34d94a86694d
// const __filename: string = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname: string = path.dirname(__filename); // get the name of the directory
// const envFilePath = path.resolve(__dirname, '../.env');
// console.log(envFilePath)
// const readEnv = () => fs.readFileSync(envFilePath, 'utf-8')
// console.log(readEnv())

// uncomment below for testing
// const w = `AWS_ACCESS_KEY_ID=123\n` +
// `AWS_SECRET_ACCESS_KEY_ID=123\n` +
// `REGION=123`
// const write = () => fs.writeFileSync('./.env', w);
// write()

export const connectController: ConnectController = {
  //save the AWS Info input into .env
  saveAWSInfo: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const {
      AWSAccessKey,
      AWSSecretKey,
      Region,
    }: { AWSAccessKey: string; AWSSecretKey: string; Region: string } =
      req.body;
      console.log(AWSAccessKey,
        AWSSecretKey,
        Region,)
        console.log(req.body);
    //context format for writing into .env
    const writeENV: string =
      `AWS_ACCESS_KEY_ID=${AWSAccessKey}\n` +
      `AWS_SECRET_ACCESS_KEY_ID=${AWSSecretKey}\n` +
      `REGION=${Region}`;
    try {
      fs.writeFileSync('./.env', writeENV);
      return next();
    } catch (err) {
      return next({
        log: `Error in connectController.saveAWSInfo middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error saving AWS sercet key ID, AWS secret access key ID or Region.',
        },
      });
    }
  },
};
