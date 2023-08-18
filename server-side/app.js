const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const environment = require("./config/environment");
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register Mongoose

function connectToDB() {
  let mongoose = require("mongoose").default;

  mongoose.connect(environment.mongodb.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(() => {
    console.log("Successful connection to MongoDB");
  }).catch((error) => {
    console.log("Failure while connecting to MongoDB", error);
  });

  mongoose.Promise = global.Promise;
}
connectToDB();

// register routes
let indexRouter = require('./routes/index');
let userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRouter);

module.exports = app;
