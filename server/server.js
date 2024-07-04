const dotenv = require('dotenv/config.js');
const AWS = require('aws-sdk');

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY_ID;
const region = process.env.REGION;
// console.log(secretAccessKey)

const myConfig = new AWS.Config({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: region,
});

myConfig.getCredentials(function (err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log('Access key:', myConfig.credentials.accessKeyId);
  }
});

console.log(myConfig.credentials);

console.log(myConfig.getCredentials);
