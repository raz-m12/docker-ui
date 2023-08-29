const express = require('express');
const {parseComposeFiles} = require('../utilities/fileSystem');
const {buildImage, psProjects} = require('../utilities/dockerAdapter');

// Global variables
const app = express();

/** Load all projects during startup. */
app.locals.projects = parseComposeFiles();

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
 * @param {any} res the express result
 */
exports.listProjects = (req, res) => {
  const srcInfo = parseComposeFiles();
  app.locals.projects = srcInfo;

  psProjects(srcInfo).then((containers) => {
    res.header('Content-Type', 'application/json');
    res.send(
        JSON.stringify({
          projects: srcInfo,
          containers,
        }),
    );
  });

  /*
  srcInfo.forEach(p => {
    containers({ cwd: p.composePath }).then((containers, err) => {
      results.push(containers);
    })
  });
  containers( { cwd: root + "/1._node-example" }).then((err, containers) => {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({
      projects: app.locals.projects,
      containers: filterProjects(containers)
    }));
  });
*/
};

/**
 * Used for building an image from a Dockerfile
 * @param {any} req the express request
 * @param {any} res the express result
 */
exports.buildImage = (req, res) => {
  const {id} = req.body;
  const project = getProjectWithName(id);
  buildImage(project).then(() => {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({success: true}));
  });
};

/**
 * Create a container from an initialized image
 * @param {any} req the express request
 * @param {any} res the express result
 */
exports.createContainer = (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({success: true}));
};

/**
 * Start an already existent container
 * @param {any} req the express request
 * @param {any} res the express result
 */
exports.startContainer = (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({success: true}));
};

/**
 * Stop a running container
 * @param {any} req the express request
 * @param {any} res the express result
 */
exports.stopContainer = (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({success: true}));
};

/**
 * Restart a container
 * @param {any} req the express request
 * @param {any} res the express result
 */
exports.restartContainer = (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({success: true}));
};

/**
 * Use docker-compose up on a docker compose file
 * @param {any} req the express request
 * @param {any} res the express result
 */
exports.composeUp = (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({success: true}));
};

/**
 * Use docker-compose down on a docker compose file
 * @param {any} req the express request
 * @param {any} res the express result
 */
exports.composeDown = (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({success: true}));
};

/**
 * Remove an existing image
 * @param {any} req the express request
 * @param {any} res the express result
 */
exports.removeImage = (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({success: true}));
};

/**
 * Get all logs pertaining to an existing container
 * @param {any} req the express request
 * @param {any} res the express result
 */
exports.getLogs = (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({success: true}));
};

/**
 * Get project given project name.
 * @param {any} req the express request
 * @param {any} res the express result
 */
exports.getProject = (req, res) => {
  console.log(`Getting project: ${req.body.id}`);

  getProjectWithName(req.body.id).then(() => {});
};

/*
  containersODE( { all: true }, (err, containers) => {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({
      projects: app.locals.projects,
      containers: filterProjects(containers)
    }));
  });
*/
