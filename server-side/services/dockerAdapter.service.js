import compose from 'docker-compose';
import * as socketIO from './socketio.service.js';
import {REPLY_LOG} from './socketio.service.js';

/**
 * Force stop service containers
 * @param {Project} project which contains docker-compose file
 * @param {boolean} log whether to enable logging
 * @return {Promise<*>} Used for listening to the result
 */
export function killContainers(project, log) {
  return compose.kill(
      {
        cwd: project.composeDir + '/app',
        callback: (msg, src) => {
          if (log) {
            socketIO.pipe(REPLY_LOG, {buffer: msg, src: src});
          }
          console.log('Error: ' + msg);
          console.log('Data: ' + src);
        },
        log: log,
      });
}


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
 * Lists containers information. No need to log since it is used
 * for loading projects.
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
 * @param {boolean} log Whether to enable logging
 * @return {Promise<*>} Used for listening to the result
 */
export function buildImage(project, log) {
  return compose.buildAll(
      {
        cwd: project.composeDir + '/app',
        callback: (msg, src) => {
          if (log) {
            socketIO.pipe(REPLY_LOG, {buffer: msg, src: src});
          }
          console.log('Error: ' + msg);
          console.log('Data: ' + src);
        },
        log: log,
      });
}

