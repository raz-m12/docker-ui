import * as containerController from '../controllers/container.controller.js';

import express from 'express';
const router = new express.Router();

/* GET users listing. */
router.get('/projects', containerController.listProjects);
router.post('/build', containerController.buildImage);
router.get('/logs/:id', containerController.getLogs);
router.post('/kill', containerController.killContainers);
router.post('/stop', containerController.stopContainers);
router.post('/restart', containerController.restartContainers);
router.post('/composeUp', containerController.composeUp);
router.post('/composeDown', containerController.composeDown);

export default router;
