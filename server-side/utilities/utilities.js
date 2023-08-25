/**
 * Gets the status of the given containers
 * @param containers active and passive containers
 * @returns {*[]} array containing the status
 */
exports.filterProjects = (containers) => {
    return containers.filter(container => {
        return container.Labels && container.Labels['com.docker.compose.project'] != null;
    });
}