// #!/usr/bin/env node

// import http from 'http';
// import app from '../app'; 
// // npm install --save-dev @types/debug       
// import debugLib from 'debug';
// import { AddressInfo } from 'net';

// const debug = debugLib('backend:server');

// /**
//  * Get port from environment and store in Express.
//  */

// const port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

// /**
//  * Create HTTP server.
//  */

// const server = http.createServer(app);

// /**
//  * Listen on provided port, on all network interfaces.
//  */

// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

// /**
//  * Normalize a port into a number, string, or false.
//  */
// function normalizePort(val: string): number | string | false {
//   const port = parseInt(val, 10);

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

// function onError(error: NodeJS.ErrnoException) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   const bind = typeof port === 'string'
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
//   const addr = server.address() as AddressInfo;
//   const bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   const blue = '\x1b[34m';
//   const reset = '\x1b[0m';  
//   console.log(`Listening on ${blue}http://localhost:${port}/${reset}`);
//   debug('Listening on ' + bind);
// }

// // #!/usr/bin/env node

// // /**
// //  * Module dependencies.
// //  */

// // var app = require('../app');
// // var debug = require('debug')('backend:server');
// // var http = require('http');

// // /**
// //  * Get port from environment and store in Express.
// //  */

// // var port = normalizePort(process.env.PORT || '3000');
// // app.set('port', port);

// // /**
// //  * Create HTTP server.
// //  */

// // var server = http.createServer(app);

// // /**
// //  * Listen on provided port, on all network interfaces.
// //  */

// // server.listen(port);
// // server.on('error', onError);
// // server.on('listening', onListening);

// // /**
// //  * Normalize a port into a number, string, or false.
// //  */

// // function normalizePort(val) {
// //   var port = parseInt(val, 10);

// //   if (isNaN(port)) {
// //     // named pipe
// //     return val;
// //   }

// //   if (port >= 0) {
// //     // port number
// //     return port;
// //   }

// //   return false;
// // }

// // /**
// //  * Event listener for HTTP server "error" event.
// //  */

// // function onError(error) {
// //   if (error.syscall !== 'listen') {
// //     throw error;
// //   }

// //   var bind = typeof port === 'string'
// //     ? 'Pipe ' + port
// //     : 'Port ' + port;

// //   // handle specific listen errors with friendly messages
// //   switch (error.code) {
// //     case 'EACCES':
// //       console.error(bind + ' requires elevated privileges');
// //       process.exit(1);
// //       break;
// //     case 'EADDRINUSE':
// //       console.error(bind + ' is already in use');
// //       process.exit(1);
// //       break;
// //     default:
// //       throw error;
// //   }
// // }

// // /**
// //  * Event listener for HTTP server "listening" event.
// //  */

// // function onListening() {
// //   var addr = server.address();
// //   var bind = typeof addr === 'string'
// //     ? 'pipe ' + addr
// //     : 'port ' + addr.port;
// //   debug('Listening on ' + bind);
// // }
