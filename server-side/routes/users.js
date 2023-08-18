let express = require('express');
let router = express.Router();

var userController = require("../controllers/users.controller");

/* GET users listing. */
router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);

module.exports = router;
