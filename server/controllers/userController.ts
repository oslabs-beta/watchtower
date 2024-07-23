import { Request, Response, NextFunction, RequestHandler } from 'express';
const bcrypt = require('bcrypt');
import { User } from '../configs/db.config';
// const User = require('../configs/db.config');
const saltRounds: number = 10;

const userController = {
  hashing: async (req: Request, res: Response, next: NextFunction) => {
    console.log('in userController.hashing');
    const { password } = req.body;
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashWord = await bcrypt.hash(password, salt);
      res.locals.hashWord = hashWord;
      return next();
    } catch (err) {
      next({
        log: `Error in userController.hashing: ${err}`,
        message: {
          err: 'An error occured while hashing user password. Check server log for more details',
        },
      });
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    console.log('in userController.createUser');
    const { firstName, lastName, email } = req.body;
    const hashWord = res.locals.hashWord;
    try {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashWord,
      });
      res.locals.user = newUser;
      next();
    } catch (err) {
      next({
        log: `Error in userController.createUser: ${err}`,
        message: {
          err: 'An error occured while creating user. Check server log for more details',
        },
      });
    }
  },

  verifyUser: async (req: Request, res: Response, next: NextFunction) => {
    console.log('in userController.verifyUser');
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        email: email,
      });
      console.log('user from MongoDB:', user);
      const match: boolean = bcrypt.compare(password, user.password);
      if (match) {
        res.locals.user = user.firstName;
        next();
      }
    } catch (err) {
      next({
        log: `Error in userController.verifyUser: ${err}`,
        message: {
          err: 'An error occured while verifying user. Check server log for more details',
        },
      });
    }
  },
};

export default userController;
