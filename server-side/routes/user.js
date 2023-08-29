import express from 'express';
const router = new express.Router();

import * as userController from '../controllers/user.controller.js';

/* GET users listing. */
router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);

export default router;
