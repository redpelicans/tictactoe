import socketIo from 'socket.io';
import express from 'express';
import http from 'http';
import connector from './connector';

const createServer = (organizer, config) => new Promise((resolve) => {
  const app = express();
  const server = http.createServer(app);
  const io = socketIo(server);
  connector(io, organizer);
  server.listen(config.api.port, () => {
    resolve(config.api.port);
  });
});

export default createServer;
