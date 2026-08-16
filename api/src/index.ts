import express from "express";
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import userRouter from "./routes/user";
import { errorHandler } from "./middleware/error";
import "dotenv/config";
import cors from "cors";
import { authenticateUserOnSocket } from "./middleware/auth";
import db from "./db"
import { ChatEvents } from "./events/chatEvents";
const app = express();
const server = createServer(app);
export const io = new Server(server,{cors:{
  origin:process.env.CLIENT
}});

app.use(express.json());
app.use(cors({
  origin:process.env.CLIENT
}))

app.use("/user",userRouter);

app.use(errorHandler)

io.use(authenticateUserOnSocket);


io.on("connection", async (socket) => {
  console.log(socket.data.user.username + " Connected")
    const username = socket.data.user.username;

    const user = await db.user.findUnique({
        where: { username },
        include: {
            chats: true
        }
    });

    if (!user) {
        socket.disconnect();
        return;
    }
    const rooms = user.chats.map(chat => `chat:${chat.id}`);

    for (const room of rooms) {
        socket.join(room);

        socket.to(room).emit("user-online", {
            username,
            chatid: room.replace("chat:", "")
        });
    }

    socket.on("disconnect", async () => {
        console.log(username, "disconnected");

        await db.user.update({
            where: { username },
            data: { isOnline: false ,lastOnline:new Date()},
        });

        for (const room of rooms) {
            socket.to(room).emit("user-offline", {
                username,
                chatid: room.replace("chat:", "")
            });
        }
    });
  try {
  await db.user.update({
    where:{
      username:socket.data.user.username
    },
    data: {
      isOnline:true
    }
  }) 
} catch (e){
    socket.emit("err" , {
      message:"Something went wrong"
    })
  }
  ChatEvents(socket,io)
  
});




const PORT = 8585;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});