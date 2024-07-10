const express = require('express');
const router = express.router();

const tablesController = require('../controllers/tablesController');
const metricController = require('../controllers/metricController');
const awsConnectController = require('../controllers/connectController.ts')
const authController = require('../controllers/authController');

router.post('/login', authController.login); //controller name and method name may change

router.post('/signup', authController.signup);

router.post('/connectController', connectController.saveAWSinfo); 

router.get('/')



module.exports = apiRouter;