import { Socket,Server } from "socket.io";
import db from "../db"

export function UserEvents(socket: Socket,io:Server) {
    console.log(socket.data.user.username , "added friend")
    socket.on("user:addFriend",async (data:any) => {
    const friendShip = await db.friendShip.create({
        data: {
            senderUsername: socket.data.user.username,
            receiverUsername: data.username
        },
        })
    socket.emit("user:addFriend",{
        relation:friendShip,
        isSender:true
    })

    const userSockets = [...io.sockets.sockets.values()]
    .filter(socket => (socket.data.user.username === data.username))

    for(const userSocket of userSockets)
        {   
            userSocket.emit("user:addFriend",{relation : friendShip , isSender:false})
        }
})

}