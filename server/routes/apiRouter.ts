import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';

import { tablesController } from '../controllers/tablesController';
import { metricController } from '../controllers/metricController';
import { connectController } from '../controllers/connectController.ts';
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
  metricController.getProvisionedRCUs,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.metrics);
  }
);

router.get('/');

router.get(
  '/tables',
  tablesController.getTables,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.tables);
  }
);

module.exports = router;
