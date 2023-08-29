import compose from 'docker-compose';


/**
 * Used to load all active and passive containers
 * docker-compose ps for each project
 * @param {Project[]} sources the array of files to parse
 * @return {Promise<any>} A promise that completes with the containers contained
 * in docker-projects
 */
export function psProjects(sources) {
  const promises = sources.map(
      (src) => psProject({cwd: src.composeDir, log: true}));

  return Promise.all(promises);
}

/**
 * Lists containers information
 * @param {{}} opts options needed by the docker-compose packet.
 * @return {Promise<any>} promise with container information
 */
function psProject(opts) {
  return compose.ps(opts)
      .catch((err) => {
        console.log('ps something went wrong', err.err);
        throw err;
      });
}


/**
 * A function which builds
 * @param {Project} project Used to build the image
 * @return {Promise<*>} Used for listening to the result
 */
export function buildImage(project) {
  return compose.buildAll(
      {
        cwd: project.composeDir + '/app',
        callback: (err, data) => {
          console.log('Error: ' + err);
          console.log('Data: ' + data);
        },
        log: true,
      });
}
