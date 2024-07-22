import { Request, Response, NextFunction, RequestHandler } from 'express';
const jwt = require('jsonwebtoken');

const gitHubCLientID: string = 'Ov23li0zDnhtAMGQIJfT';

const testSecret: string = 'GlkhHJSD8976Afg';

interface AuthController {
  setJWT: RequestHandler;
  verifyJWT: RequestHandler;
}

const authController: AuthController = {
  setJWT: (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const accessToken: string = jwt.sign(user, testSecret, {
      expiresIn: 300,
    });
    res.locals.accessToken = { accessToken };
  },
  verifyJWT: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers[' '];

    if (!token)
      res
        .status(401)
        .json(
          'Access Denied. Authentication Token missing - please log in again'
        );
    else {
      //need to complete this portion
      jwt.verify(token, testSecret, (err, user) => {
        if (err)
          res
            .status(401)
            .json(
              'Access Denied. Failed to authenticate - please log in again'
            );
      });
    }
  },
};

export default authController;
