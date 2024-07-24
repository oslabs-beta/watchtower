import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
//?
// const gitHubCLientID: string = 'Ov23li0zDnhtAMGQIJfT';

const testSecret: string = 'GlkhHJSD8976Afg';

interface AuthController {
  setJWT: RequestHandler;
  verifyJWT: RequestHandler;
}

export const authController: AuthController = {
  setJWT: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = res.locals;
      // console.log('user firstName', user);
      const accessToken: string = jwt.sign(user, testSecret);
      res.locals.accessToken = accessToken;
      return next();
    } catch (err) {
      return next({
        log: `Error in authController.setJWT: ${err}`,
        message: {
          err: 'An error occured while setting JWT token. Check server log for more details',
        },
      });
    }
  },
  //?
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
      // jwt.verify(token, testSecret, (err, user) => {
      //   if (err)
      //     res
      //       .status(401)
      //       .json(
      //         'Access Denied. Failed to authenticate - please log in again'
      //       );
      // });
    }
  },
};
