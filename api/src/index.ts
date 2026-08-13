import express from "express";
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import userRouter from "./routes/user";
import { errorHandler } from "./middleware/error";
import "dotenv/config";
import cors from "cors"

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors({
  origin:process.env.CLIENT
}))

app.use("/user",userRouter);

app.use(errorHandler)

io.on('connection', (socket) => {
  console.log('a user connected');
});

const PORT = 8585;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});