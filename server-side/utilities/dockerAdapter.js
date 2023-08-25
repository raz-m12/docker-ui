const Docker = require('dockerode');

// Create a Docker instance
const docker = new Docker();

/**
 * Used to load all active and passive containers
 * @param callback
 * @param opts options to listContainers
 */
const containers = function(opts, callback) {
  docker.listContainers(opts, (err, containers) => {
    if (err) {
      callback(err);
    }

    callback(null, containers);
  });
}
exports.containers = containers;

/**
 * Get docker project
 * @param path filepath
 * @param callback handle the result
 */
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
