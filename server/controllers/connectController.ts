import { Request, Response, NextFunction, RequestHandler } from 'express';
import fs from 'fs';

interface ConnectController {
  saveAWSInfo: RequestHandler;
}

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
