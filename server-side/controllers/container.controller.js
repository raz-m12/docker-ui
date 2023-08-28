const { loadProjects } = require("../utilities/fileSystem");
const { getProject, containers } = require("../utilities/dockerAdapter");
const express = require("express")
const {filterProjects} = require("../utilities/utilities");

const app = express();

/** Load all docker-projects during startup. */
app.locals.projects = loadProjects();

/**
 * Retrieves all docker-projects stored on the file system.
 */
exports.getProjects = function (req, res) {
  app.locals.projects = loadProjects();
  containers( { all: true }, (err, containers) => {

    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({
      projects: app.locals.projects,
      containers: filterProjects(containers)
    }));
  });

};

/**
 * Get project given project name.
 */
exports.getProject = function(req, res) {
  const name = req.body.name;
  console.log("Getting project: " + name);
  const path = app.locals.projects[name];

  getProject(path, project => {
    res.send(JSON.stringify({
      project: project
    }))
  });
}
