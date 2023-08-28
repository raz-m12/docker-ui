module.exports = {
  mongodb: {
    uri: 'mongodb://localhost:27017/docker-ui'
  },
  serverEndpoint: process.env.SERVER_ENDPOINT || "http://localhost:3000/",
  projectsPath: process.env.DOCKER_UI_YAML_PATH || __dirname + "/../docker-projects/"
};
