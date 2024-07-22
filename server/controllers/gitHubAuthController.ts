import { Request, Response, NextFunction, RequestHandler } from 'express';

interface gitHubAuth {
  getAccessToken: RequestHandler;
  getUserData: RequestHandler;
}

const gitHubClientID: string = 'Ov23li0zDnhtAMGQIJfT';

const gitHubAuthController: gitHubAuth = {
  getAccessToken: async (req: Request, res: Response, next: NextFunction) => {
    //secret should not be included here - temporary fix for testing.
    const clientSecret = 'b14fbd2139f927b8fa7674be4e5d7dbfeac5b069';
    console.log('in the gitHubAuthController.getAccessToken');
    console.log(req.query.code);
    const params: string = `?client_id=${gitHubClientID}&client_secret=${clientSecret}&code=${req.query.code}`;

    await fetch(`https://github.com/login/oauth/access_token${params}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('gitHub Access Token', data);
        res.locals.accessToken = data;
        next();
      })
      .catch((err) => {
        next({
          log: `Error in gitHubAuthController.getAccessToken: ${err}`,
          status: 500,
          message: {
            err: 'Error getting access token from GitHub API. Check server log for more details',
          },
        });
      });
  },

  getUserData: async (req: Request, res: Response, next: NextFunction) => {
    await fetch(`https://api.github.com/user`, {
      method: 'GET',
      headers: {
        //gets the Authorization header from the front end request and passes to GitHub API
        Authorization: req.get('Authorization'), // Format: Bearer ACCESSTOKEN
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        console.log('GitHub User Data', userData);
        res.locals.gitHubUserData = userData;
      })
      .catch((err) => {
        next({
          log: `Error in gitHubAuthController.getUserData: ${err}`,
          status: 500,
          message: {
            err: 'Error getting user data from GitHub API. Check server log for more details',
          },
        });
      });
  },
};

export default gitHubAuthController;
