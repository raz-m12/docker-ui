let express = require('express');
let router = express.Router();

let userController = require("../controllers/user.controller");

/* GET users listing. */
router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);

module.exports = router;
