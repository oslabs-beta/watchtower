import { Request, Response, NextFunction, RequestHandler } from 'express';
const jwt = require('jsonwebtoken');

const gitHubCLientID: string = 'Ov23li0zDnhtAMGQIJfT';

const testSecret: string = 'GlkhHJSD8976Afg';

interface AuthController {
  setJWT: RequestHandler;
}

const authController: AuthController = {
  setJWT: (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const accessToken: string = jwt.sign(user, testSecret);
    res.locals.accessToken = { accessToken };
  },
};

export default authController;
