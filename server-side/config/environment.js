// TODO RV Might need to undo this
module.exports = {
  mongodb: {
    uri: 'mongodb://localhost:27017/docker-ui'
  },
  serverEndpoint: "http://localhost:3000/",
  projectsPath: process.env.DOCKER_UI_YAML_PATH || "./projects/"
};
