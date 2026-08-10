import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";

const app = express();

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

const server = http.createServer(app);

const wss = new WebSocketServer({
  server,
});

wss.on("connection", (socket) => {
  console.log("WebSocket client connected");

  socket.on("message", (message) => {
    console.log("Received:", message.toString());

    socket.send(
      JSON.stringify({
        type: "message",
        content: message.toString(),
      })
    );
  });

  socket.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

const PORT = 8585;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});