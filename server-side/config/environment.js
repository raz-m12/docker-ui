import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dockerDBUri =
    'mongodb://' +
    process.env.MONGO_DB_USERNAME +
    ':' +
    process.env.MONGO_DB_PASSWORD +
    '@' +
    process.env.MONGO_DB_HOST +
    (process.env.MONGO_DB_PORT ?
        ':' + process.env.MONGO_DB_PORT + '/' :
        '/') +
    process.env.MONGO_DB_DATABASE +
    process.env.MONGO_DB_PARAMETERS;

export default {
  mongodb: {
    uri: process.env.USING_DOCKER? dockerDBUri: 'mongodb://localhost:27017/docker-ui',
  },
  secret: process.env.SECRET,
  socketIOEndpoint: 'http://localhost:4200',
  serverEndpoint: process.env.SERVER_ENDPOINT || 'http://localhost:3000/',
  projectsPath: process.env.DOCKER_UI_YAML_PATH ||
      __dirname + '/../docker-projects/',
};
