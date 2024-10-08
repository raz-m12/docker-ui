import Project from '../models/project.model.js';

import env from '../config/environment.js';
import fs from 'fs';
import path from 'path';

/**
 * Public function used to load all docker-projects
 * @return {Project[]} docker-projects as a dictionary
 */
export function loadProjects() {
  const projects = findComposeFiles(env.projectsPath, true);
  console.log(projects);

  return projects;
}

/**
 * Find docker-compose files
 * @param {string} dirPath path to inspect
 * @param {boolean} recursive check only upper level directories
 * @param {[]} result the result being updated recursively
 * @return {*[]} a dictionary with key as project name and value the path
 */
function findComposeFiles(dirPath, recursive, result = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory() && recursive) {
      findComposeFiles(filePath, false, result); // Search subdirectory
    } else if (stats.isFile() &&
        file === 'docker-compose.yml' || file === 'docker-compose.yaml' ||
        file === 'compose.yaml' || file === 'compose.yml') {
      const parts = filePath.split('/');
      const dir = parts[parts.length - 2].toLowerCase();

      // Use String.replace() to enforce the pattern
      const id = dir.replace(/[^a-z0-9-_]+/g, '').replace(/^[_-]+/, '');
      const composeDir = path.dirname(filePath);
      const item = new Project(id, composeDir,
          path.relative(env.projectsPath, composeDir),
          fs.readFileSync(filePath, 'utf-8'),
      );
      result.push(item);
    }
  });

  return result;
}

