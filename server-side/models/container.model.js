
/* A function for creating a container */
// TODO delete
exports.ContainerElement = function (id, name, status, yaml) {
  return {
    id: id,
    name: name,
    status: status,
    yaml: yaml
  };
}
