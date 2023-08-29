const Docker = require('dockerode');
const compose = require("docker-compose");

// Create a Docker instance
const docker = new Docker();


/**
 * Used to load all active and passive containers
 * @param sources the array of files to parse
 */
exports.psProjects = function(sources) {
  const promises = sources.map(src => psProject({ cwd: src.composeDir, log: true }));

  return Promise.all(promises);
}

function psProject (opts) {
  return compose.ps(opts)
    .catch(err => {
      console.log("ps something went wrong", err.err);
      throw err;
    });
}


/**
 * A function which builds
 * @param project Used to build the image
 * @return {Promise<*>} Used for listening to the result
 */
exports.buildImage = async function (project) {
  return docker.buildImage(
    { context: project.composeDir + "/app", src: ['Dockerfile'] },
    { t: project.id },
    (err, data) => {
      console.log("Error: " + err);
      console.log("Data: " + data);
    });
}

/**
 const Docker = require('dockerode');

 // Create a Docker instance
 const docker = new Docker();

const containers = function(opts, callback) {
  docker.listContainers(opts, (err, containers) => {
    if (err) {
      callback(err);
    }

    callback(null, containers);
  });
}
exports.containers = containers;

exports.getProject = function(path, callback) {
    console.log("get project" + path);

    containers({ all: true, filters: { label: ['com.docker.compose.project=' + path] } },
      (err, containers) => {
        if (err) {
          console.error('Error:', err);
          return;
        }

        // Assuming the project name is the same as the file name without extension
        const projectName = path.split('/').pop().replace('.yml', '').replace('.yaml', '');

        // Filter containers based on the project name
        const container = containers.find((container) => {
          return container.Labels['com.docker.compose.project'] === projectName;
        });

        callback(container);
      });
  }

  */