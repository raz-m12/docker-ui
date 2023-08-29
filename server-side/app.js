import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import environment from './config/environment.js';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import containerRouter from './routes/container.js';
import {fileURLToPath} from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register Mongoose
/**
 * Used to connect to the mongo database.
 */
function connectToDB() {
  mongoose.connect(environment.mongodb.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(() => {
    console.log('Successful connection to MongoDB');
  }).catch((error) => {
    console.log('Failure while connecting to MongoDB', error);
  });

  mongoose.Promise = global.Promise;
}
connectToDB();

// register routes

app.use('/user', userRouter);
app.use('/', containerRouter);


// Set up the port to listen to
/* TODO delete
const endpoint = environment.serverEndpoint;

app.listen(endpoint, () => {
  console.log(`Running  on ${endpoint}`);
});
*/
export default app;
