const express = require('express');
const router = new express.Router();

const containerController = require('../controllers/container.controller');

/* GET users listing. */
router.get('/projects', containerController.listProjects);
router.post('/build', containerController.buildImage);
router.post('/create', containerController.createContainer);
router.post('/start', containerController.startContainer);
router.post('/stop', containerController.stopContainer);
router.post('/restart', containerController.restartContainer);
router.post('/composeUp', containerController.composeUp);
router.post('/composeDown', containerController.composeDown);
router.delete('/remove/:id', containerController.removeImage);
router.get('/logs/:id', containerController.getLogs);

module.exports = router;
