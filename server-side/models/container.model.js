
/* A function for creating a container */

/**
 * Used for managing a class read from the file system
 * @param {string} id
 * @param {string} name
 * @param {boolean} status
 * @param {string} yaml
 * @return {{name, id, status, yaml}}
 */
export function Container(id, name, status, yaml) {
  return {
    id: id,
    name: name,
    status: status,
    yaml: yaml,
  };
};
