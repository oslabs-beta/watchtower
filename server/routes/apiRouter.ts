import express, { Request, Response } from 'express';
import { tablesController } from '../controllers/tablesController.ts';
import { metricController } from '../controllers/metricController.ts';
import { connectController } from '../controllers/connectController.ts';
import { authController } from '../controllers/authController';
import { gitHubAuthController } from '../controllers/gitHubAuthController.ts';
import { bedrockController } from '../controllers/bedrockController.ts';
import { saveAnalysisController } from '../controllers/saveAnalysisController.ts';
import { userController } from '../controllers/userController';

const router = express.Router();

router.post(
  '/signup',
  userController.hashing,
  userController.createUser,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.user);
  }
);

router.post(
  '/login',
  userController.verifyUser,
  authController.setJWT,
  (req: Request, res: Response): Response => {
    return res.status(200).json({
      firstName: res.locals.user,
      accessToken: res.locals.accessToken,
    });
  }
); //controller name and method name may change

router.get(
  '/gitHub',
  gitHubAuthController.getAccessToken,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.accessToken);
  }
);

router.post(
  '/AWSconnect',
  connectController.saveAWSInfo,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.message);
  }
);

router.post(
  '/metrics',
  metricController.getConsumedRCUs,
  metricController.getConsumedWCUs,
  metricController.getProvisionedRCUs,
  metricController.getProvisionedWCUs,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals);
  }
);

router.get(
  '/tables',
  tablesController.getTables,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.tables);
  }
);

router.get(
  '/createTable',
  tablesController.getTables,
  saveAnalysisController.createUserProfilesTable,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.tables);
  }
);

router.post(
  '/bedrock',
  bedrockController.getAnalysis,
  (req: Request, res: Response): void => {
    res.end();
  }
);

router.post(
  '/pastAnalysis',
  saveAnalysisController.saveAnalysisToDB,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.message);
  }
);

router.get(
  '/pastAnalysis',
  saveAnalysisController.getPastAnalysis,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.pastAnalysis);
  }
);

export default router;
