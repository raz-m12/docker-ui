import compose from 'docker-compose';
import * as socketIO from './socketio.service.js';
import {REPLY_LOG} from './socketio.service.js';
import stripAnsi from 'strip-ansi';

/**
 * Force stop service containers
 * @param {Project} project which contains docker-compose file
 * @param {boolean} log whether to enable logging
 * @return {Promise<*>} Used for listening to the result
 */
export function killContainers(project, log) {
  return compose.kill(
      {
        cwd: project.composeDir,
        callback: (msg, src) => {
          if (log) {
            socketIO.pipe(REPLY_LOG, {
              buffer: stripAnsi(msg.toString()), src: src,
            });
          }
          print(msg, src);
        },
        log: log,
      });
}

/**
 * Force stop service containers
 * @param {Project} project which contains docker-compose file
 * @param {boolean} log whether to enable logging
 * @return {Promise<*>} Used for listening to the result
 */
export function stopContainers(project, log) {
  return compose.stop(
      {
        cwd: project.composeDir,
        callback: (msg, src) => {
          if (log) {
            socketIO.pipe(REPLY_LOG, {
              buffer: stripAnsi(msg.toString()), src: src,
            });
          }
          print(msg, src);
        },
        log: log,
      });
}

/**
 * Force stop service containers
 * @param {Project} project which contains docker-compose file
 * @param {boolean} log whether to enable logging
 * @return {Promise<*>} Used for listening to the result
 */
export function restartContainers(project, log) {
  return compose.restartAll(
      {
        cwd: project.composeDir,
        callback: (msg, src) => {
          if (log) {
            socketIO.pipe(REPLY_LOG, {
              buffer: stripAnsi(msg.toString()), src: src,
            });
          }
          print(msg, src);
        },
        log: log,
      });
}

/**
 * Force stop service containers
 * @param {Project} project which contains docker-compose file
 * @param {boolean} log whether to enable logging
 * @return {Promise<*>} Used for listening to the result
 */
export function composeUp(project, log) {
  return compose.upAll(
      {
        cwd: project.composeDir,
        callback: (msg, src) => {
          if (log) {
            socketIO.pipe(REPLY_LOG, {
              buffer: stripAnsi(msg.toString()), src: src,
            });
          }
          print(msg, src);
        },
        log: log,
      });
}

/**
 * Force stop service containers
 * @param {Project} project which contains docker-compose file
 * @param {boolean} log whether to enable logging
 * @return {Promise<*>} Used for listening to the result
 */
export function composeDown(project, log) {
  return compose.down(
      {
        cwd: project.composeDir,
        callback: (msg, src) => {
          if (log) {
            socketIO.pipe(REPLY_LOG, {
              buffer: stripAnsi(msg.toString()), src: src,
            });
          }
          print(msg, src);
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
      (src) => psProject(
          {cwd: src.composeDir, log: true, composeOptions: [['-p', src.id]]},
      ));

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
        cwd: project.composeDir,
        callback: (msg, src) => {
          if (log) {
            socketIO.pipe(REPLY_LOG, {
              buffer: stripAnsi(msg.toString()), src: src,
            });
          }
          print(msg, src);
        },
        log: log,
      });
}

/**
 * Force stop service containers
 * @param {Project} project which contains docker-compose file
 * @param {boolean} log whether to enable logging
 * @return {Promise<*>} Used for listening to the result
 */
export function getLogs(project, log) {
  return getServices(project, log).then((services) => {
    return compose.logs(services.data.services, {
      cwd: project.composeDir,
      callback: (msg, src) => {
        if (log) {
          socketIO.pipe(REPLY_LOG, {
            buffer: stripAnsi(msg.toString()), src: src,
          });
        }
        print(msg, src);
      },
      log: log,
    });
  });
}

/**
 * Gets a list of services for the given project
 * @param {Project} project the project configuration file
 * @param {boolean} log whether to log
 * @return {Promise<*>} the service configuration files
 */
function getServices(project, log) {
  return compose.configServices({
    cwd: project.composeDir,
    callback: (msg, src) => {
      if (log) {
        socketIO.pipe(REPLY_LOG, {
          buffer: stripAnsi(msg.toString()), src: src,
        });
      }
      print(msg, src);
    },
    log: log,
  });
}

/**
 * Utility function, used to print output on the cmd line as well.
 * @param {Buffer} msg logger message
 * @param {string} src stdout, stdin
 */
function print(msg, src) {
  console.log(msg.toString());
}
