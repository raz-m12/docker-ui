import express from 'express';
import {loadProjects} from '../services/fileSystem.service.js';
import * as docker from '../services/dockerAdapter.service.js';

// Global variables
const app = express();

/** Load all projects during startup. */
app.locals.projects = loadProjects();

/**
 * Get a cached project based on a name
 * @param {string} name the project name
 * @return {*} existing project
 */
function getProjectWithName(name) {
  return app.locals.projects.find((p) => p.id === name);
}

/**
 * Retrieves all projects stored on the file system.
 * @param {any} req the express request
 * @param {any} res the express response
 */
export function listProjects(req, res) {
  const srcInfo = loadProjects();
  app.locals.projects = srcInfo;

  docker.psProjects(srcInfo).then((containers) => {
    res.header('Content-Type', 'application/json');
    res.send(
        JSON.stringify({
          projects: srcInfo,
          containers,
        }),
    );
  });
}

/**
 * Template function for result since all are similar
 * @param {any} res express result
 * @return {function} express response
 */
function success(res) {
  return () => {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({success: true}));
  };
}

/**
 * Template function for failure response
 * @param {any} res express result
 * @return {function} express response
 */
function failure(res) {
  return () => {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({success: false}));
  };
}

/**
 * Used for building an image from a Dockerfile
 * @param {any} req the express request
 * @param {any} res the express result
 */
export function buildImage(req, res) {
  const {id} = req.body;
  const project = getProjectWithName(id);
  docker.buildImage(project, true)
      .then(success(res))
      .catch(failure(res));
}

/**
 * Create a container from an initialized image
 * @param {any} req the express request
 * @param {any} res the express response
 */
export function killContainers(req, res) {
  const {id} = req.body;
  const project = getProjectWithName(id);
  docker.killContainers(project, true)
      .then(success(res))
      .catch(failure(res));
}

/**
 * Stop a running container
 * @param {any} req the express request
 * @param {any} res the express response
 */
export function stopContainers(req, res) {
  const {id} = req.body;
  const project = getProjectWithName(id);
  docker.stopContainers(project, true)
      .then(success(res))
      .catch(failure(res));
}

/**
 * Restart a container
 * @param {any} req the express request
 * @param {any} res the express response
 */
export function restartContainers(req, res) {
  const {id} = req.body;
  const project = getProjectWithName(id);
  docker.restartContainers(project, true)
      .then(success(res))
      .catch(failure(res));
}

/**
 * Use docker-compose up on a docker compose file
 * @param {any} req the express request
 * @param {any} res the express response
 */
export function composeUp(req, res) {
  const {id} = req.body;
  const project = getProjectWithName(id);
  docker.composeUp(project, true)
      .then(success(res))
      .catch(failure(res));
}

/**
 * Use docker-compose down on a docker compose file
 * @param {any} req the express request
 * @param {any} res the express response
 */
export function composeDown(req, res) {
  const {id} = req.body;
  const project = getProjectWithName(id);
  docker.composeDown(project, true)
      .then(success(res))
      .catch(failure(res));
}


/**
 * Get all logs pertaining to an existing container
 * @param {any} req the express request
 * @param {any} res the express response
 */
export function getLogs(req, res) {
  const id = req.params.id;
  const project = getProjectWithName(id);
  docker.getLogs(project, true)
      .then(success(res))
      .catch(failure(res));
}

/**
 * Get project given project name.
 * @param {any} req the express request
 */
export function getProject(req) {
  console.log(`Getting project: ${req.body.id}`);

  getProjectWithName(req.body.id).then(() => {});
}

