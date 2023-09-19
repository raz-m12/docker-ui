import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import environment from '../config/environment.js';

/**
 * Used to authenticate a user
 * @param {any} req the express request
 * @param {any} res the express result
 */
export function authenticate(req, res) {
  User.findOne({username: req.body.username}).then((user) => {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      // authentication successful
      user.token = jwt.sign({sub: user._id}, environment.secret, {
        algorithm: 'HS256',
      });
      delete user.password;
      res.json({
        status: 'success',
        message: 'Users retrieved successfully',
        token: user.token,
      });
    } else {
      // authentication failed
      res.status(401).send({
        status: 'error',
        message: 'User name or password is invalid.',
      });
    }
  }).catch((err) => {
    if (err) {
      res.status(400).json({
        status: 'error',
        error: err,
      });
    }
  });
}

/**
 * Registration of a user
 * @param {any} req the express request
 * @param {any} res the express result
 */
export function register(req, res) {
  User.find({username: req.body.username}).then((users) => {
    if (users.length > 0) {
      res.status(409).send({
        status: 'error',
        message: 'Username ' + req.body.username + ' unavailable.',
      });
    } else {
      const user = new User();
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      user.username = req.body.username;
      user.password = hash;
      user.email = req.body.username;

      user.save().then((user) => {
        res.json({
          message: 'Successful registration.',
          data: user,
        });
      }).catch((err) => {
        res.status(400).json({
          status: 'error',
          error: 'Saving error: ' + err,
        });
      });
    }
  }).catch((error) =>
    res.status(400).json({
      status: 'error',
      message: 'Database error: ' + error,
    }),
  );
}
