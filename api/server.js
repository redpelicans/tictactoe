import socketIo from 'socket.io';
import express from 'express';
import http from 'http';
import connector from './connector';
import createOrganizer from './organizer';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const organizer = createOrganizer();
connector(io, organizer);

export default server;
