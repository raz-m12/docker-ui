import environment from '../config/environment.js';
import {Server as SocketIo} from 'socket.io';

/**
 * Possible messages.
 */
export const REPLY_LOG = 'replyLogs';

/**
 * The socket which must be initialized before being used.
 * @type {SocketIo}
 */
let io = null;


/**
 * Provides the Cors configuration for setting up SocketIO.
 * @return {{cors: {methods: string[], origin: string}}}
 */
export function provideCors() {
  return {
    cors: {
      origin: environment.socketIOEndpoint,
      methods: ['GET', 'POST'],
    },
  };
}

/**
 * Initializes the socket
 * @param {{}} server the http server
 */
export function createSocketIO(server) {
  io = new SocketIo(server, provideCors());
}
/**
 * Pipes data to the client
 * @param {string} msg name of the message
 * @param {any} data data to be sent
 */
export function pipe(msg, data) {
  io.emit(msg, data);
}
/**
 * /**
 * Provides a callback for managing behavior during a connection.
 * @param {Server} io used for the interaction between client-server
 * @return {(function(*): void)|*} the callback function
 */
export function onConnect(io) {
  return (socket) => {
    console.log('A user connected');

    // Handle events
    socket.on('getLogs', getLogs(io));

    // Handle disconnection
    socket.on('disconnect', onDisconnect);
  };
}

/**
 * Reacts to the getLogs message and uses provided project ID for fetching data.
 * @param {Server} io provides request data for finding resource
 * @return {(function(*): void)|*} the message handler
 */
function getLogs(io) {
  return (message) => {
    console.log('Received message:', message);
    // Broadcast the message to all connected clients
    io.emit(REPLY_LOG, message);
  };
}

/**
 * Called when a user disconnects.
 */
function onDisconnect() {
  console.log('A user disconnected');
}

/**
 * Set up the connection for retrieving logs.
 */
export function setupSocketIO() {
  io.on('connection', onConnect(io));
}
