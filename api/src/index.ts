import express from "express";
import http from "http";
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
  });
});


io.on('connection', (socket) => {
  console.log('a user connected');
});

const PORT = 8585;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});