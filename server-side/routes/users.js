let express = require('express');
let router = express.Router();

var userController = require("../controllers/users.controller");

/* GET users listing. */
router.post('/authenticate', userController.authenticate);

module.exports = router;
