import express, { Request, Response } from 'express';

import { tablesController } from '../controllers/tablesController.ts';
import { metricController } from '../controllers/metricController.ts';
import { connectController } from '../controllers/connectController.ts';
import { bedrockController } from '../controllers/bedrockController.ts';
// import { authController } from '../controllers/authController';

const router = express.Router();

// router.post('/login', authController.login); //controller name and method name may change

// router.post('/signup', authController.signup);

router.post(
  '/AWSconnect',
  connectController.saveAWSInfo,
  (req: Request, res: Response): Response => {
    return res.status(200).json({});
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

router.post('/bedrock', bedrockController.getAnalysis,  (req: Request, res: Response): void => {
  res.end()
});

export default router;
