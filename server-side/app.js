/**
 * Module dependencies.
 */
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import {fileURLToPath} from 'url';

import environment from './config/environment.js';
import userRouter from './routes/user.js';
import containerRouter from './routes/container.js';

/**
 * File system
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * Used for setting up express.
 */
(function setup(app) {
  // Set up express
  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // register routes
  app.use('/user', userRouter);
  app.use('/', containerRouter);
})(app);

// Register Mongoose
/**
 * Used to connect to the mongo database.
 */
(function connectToDB() {
  console.log("Mongo url: " + environment.mongodb.uri);
  mongoose.connect(environment.mongodb.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(() => {
    console.log('Successful connection to MongoDB');
  }).catch((error) => {
    console.log('Failure while connecting to MongoDB', error);
  });

  mongoose.Promise = global.Promise;
})();


export default app;
