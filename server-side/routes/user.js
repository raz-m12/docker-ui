const express = require('express');
const router = new express.Router();

const userController = require('../controllers/user.controller');

/* GET users listing. */
router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);

module.exports = router;
