User = require('../models/user.model');

exports.authenticate = function(req, res) {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify('respond with a resource'));
};

/**
 * Registration of a user
 * @param {any} req the express request
 * @param {any} res the express result
 */
exports.register = function(req, res) {
  User.find({username: req.body.username}).then((users) => {
    if (users.length > 0) {
      res.status(409).send({
        status: 'error',
        message: 'Username ' + req.body.username + ' unavailable.',
      });
    } else {
      const user = new User();
      user.username = req.body.username;
      user.password = req.body.password;
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
};
