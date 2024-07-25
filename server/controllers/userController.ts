import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../configs/db.config';
import { NewUser } from '../types';

const saltRounds: number = 10;

interface UserController {
  hashing: RequestHandler;
  createUser: RequestHandler;
  verifyUser: RequestHandler;
}

export const userController: UserController = {
  hashing: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { password }: { password: string } = req.body;
    try {
      const salt: string = await bcrypt.genSalt(saltRounds);
      const hashWord: string = await bcrypt.hash(password, salt);
      res.locals.hashWord = hashWord;
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.hashing: ${err}`,
        message: {
          err: 'An error occured while hashing user password. Check server log for more details',
        },
      });
    }
  },

  createUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const {
      firstName,
      lastName,
      email,
    }: { firstName: string; lastName: string; email: string } = req.body;
    const hashWord: string = res.locals.hashWord;
    try {
      const newUser: NewUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashWord,
      });
      res.locals.user = newUser;
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.createUser: ${err}`,
        message: {
          err: 'An error occured while creating user. Check server log for more details',
        },
      });
    }
  },

  verifyUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password }: { email: string; password: string } = req.body;
    try {
      const user = await User.findOne({
        email: email,
      });

      const match: boolean = await bcrypt.compare(password, user.password);
      if (match) {
        res.locals.user = user.firstName;
        return next();
      }
    } catch (err) {
      return next({
        log: `Error in userController.verifyUser: ${err}`,
        message: {
          err: 'An error occured while verifying user. Check server log for more details',
        },
      });
    }
  },
};
