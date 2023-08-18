exports.authenticate = function (req, res) {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify('respond with a resource'));
};

exports.register = function (req, res) {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify('respond with a resource'));
};