const environment = require("../config/environment");
const fs = require('fs');
const path = require('path');

/**
 * Public function used to load all projects
 * @returns {*[]} projects as a dictionary
 */
exports.loadProjects = function loadProjects() {
    const projects = findComposeFiles(environment.projectsPath, true);
    console.log(projects);

    return projects;
}

/**
 * Find docker-compose files
 * @param dirPath path to inspect
 * @param recursive check only upper level directories
 * @param result the result being updated recursively
 * @returns {*[]} a dictionary with key as project name and value the path
 */
function findComposeFiles(dirPath, recursive, result = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory() && recursive) {
            findComposeFiles(filePath, false, result); // Search subdirectory
        } else if (stats.isFile() && file === 'docker-compose.yml' || file === 'docker-compose.yaml') {
            const parts = filePath.split("/");
            const name = parts[parts.length - 2].toLowerCase()
                .replace(/\s/g, '')
                .replace(/[^a-z0-9-]/g, ''); // container-like name
            const item = {
                id: name,
                path: path.join(__dirname, filePath),
                yaml: fs.readFileSync(filePath, "utf-8")// absolute path
            }
            result.push(item);
        }
    })

    return result;
}