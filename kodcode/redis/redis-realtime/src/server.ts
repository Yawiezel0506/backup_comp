import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import Redis from 'ioredis';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const redis = new Redis();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
