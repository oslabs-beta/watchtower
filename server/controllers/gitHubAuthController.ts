import { Request, Response, NextFunction, RequestHandler } from 'express';

interface gitHubAuth {
  getAccessToken: RequestHandler;
  getUserData: RequestHandler;
}

const gitHubClientID: string = 'Ov23li0zDnhtAMGQIJfT';

export const gitHubAuthController: gitHubAuth = {
  getAccessToken: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const clientSecret: string = 'b14fbd2139f927b8fa7674be4e5d7dbfeac5b069';
    const params: string = `?client_id=${gitHubClientID}&client_secret=${clientSecret}&code=${req.query.code}`;
    await fetch(`https://github.com/login/oauth/access_token${params}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        res.locals.accessToken = data.access_token;
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in gitHubAuthController.getAccessToken: ${err}`,
          status: 500,
          message: {
            err: 'Error getting access token from GitHub API. Check server log for more details',
          },
        });
      });
  },
  
  getUserData: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await fetch(`https://api.github.com/user`, {
      method: 'GET',
      headers: {
        //gets the Authorization header from the front end request and passes to GitHub API
        Authorization: req.get('Authorization'), // Format: Bearer ACCESSTOKEN
      },
    })
      .then((response) => response.json())
      .then((userData) => {

        res.locals.gitHubUserData = userData;

        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in gitHubAuthController.getUserData: ${err}`,
          status: 500,
          message: {
            err: 'Error getting user data from GitHub API. Check server log for more details',
          },
        });
      });
  },
};
