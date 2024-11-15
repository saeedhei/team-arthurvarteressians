#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("../app"));
// npm install --save-dev @types/debug       
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('backend:server');
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app_1.default.set('port', port);
/**
 * Create HTTP server.
 */
const server = http_1.default.createServer(app_1.default);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    const blue = '\x1b[34m';
    const reset = '\x1b[0m';
    console.log(`Listening on ${blue}http://localhost:${port}/${reset}`);
    debug('Listening on ' + bind);
}
// #!/usr/bin/env node
// /**
//  * Module dependencies.
//  */
// var app = require('../app');
// var debug = require('debug')('backend:server');
// var http = require('http');
// /**
//  * Get port from environment and store in Express.
//  */
// var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);
// /**
//  * Create HTTP server.
//  */
// var server = http.createServer(app);
// /**
//  * Listen on provided port, on all network interfaces.
//  */
// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);
// /**
//  * Normalize a port into a number, string, or false.
//  */
// function normalizePort(val) {
//   var port = parseInt(val, 10);
//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }
//   if (port >= 0) {
//     // port number
//     return port;
//   }
//   return false;
// }
// /**
//  * Event listener for HTTP server "error" event.
//  */
// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }
//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;
//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }
// /**
//  * Event listener for HTTP server "listening" event.
//  */
// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }
