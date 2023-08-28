const { parseComposeFiles } = require("../utilities/fileSystem");
const { containers, buildImage, containersODE, psProjects} = require("../utilities/dockerAdapter");
const express = require("express")
const {filterProjects} = require("../utilities/utilities");

// Global variables
const app = express();

/** Load all projects during startup. */
app.locals.projects = parseComposeFiles();

/**
 * Retrieves all projects stored on the file system.
 */
exports.listProjects = function (req, res) {
  const srcInfo = parseComposeFiles();
  app.locals.projects = srcInfo;

  psProjects(srcInfo).then((containers) => {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({
      projects: srcInfo,
      containers: containers
    }));
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
 */
exports.buildImage = function (req, res) {
  const id = req.body["id"];
  const project = getProjectWithName(id);
  buildImage(project).then(img => {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: true }));
  });
}

/**
 * Create a container from an initialized image
 */
exports.createContainer = function (req, res) {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({ success: true }));
}

/**
 * Start an already existent container
 */
exports.startContainer = function (req, res) {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({ success: true }));
}

/**
 * Stop a running container
 */

exports.stopContainer = function (req, res) {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({ success: true }));
}

/**
 * Restart a container
 */
exports.restartContainer = function (req, res) {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({ success: true }));
}

/**
 * Use docker-compose up on a docker compose file
 */
exports.composeUp = function (req, res) {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({ success: true }));
}

/**
 * Use docker-compose down on a docker compose file
 */
exports.composeDown = function (req, res) {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({ success: true }));
}

/**
 * Remove an existing image
 */
exports.removeImage = function (req, res) {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({ success: true }));
}

/**
 * Get all logs pertaining to an existing container
 */
exports.getLogs = function (req, res) {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({ success: true }));
}

/**
 * Get project given project name.
 */
exports.getProject = function(req, res) {
  console.log("Getting project: " + id);

  getProjectWithName(req.body.id)
    .then((project, err) => {

    });
}

function getProjectWithName(name) {
  return app.locals.projects.find(p => p.id === name);
}

/*
  containersODE( { all: true }, (err, containers) => {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({
      projects: app.locals.projects,
      containers: filterProjects(containers)
    }));
  });
*/