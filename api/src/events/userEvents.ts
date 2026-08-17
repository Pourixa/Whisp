import { Socket,Server } from "socket.io";
import db from "../db"

export function ChatEvents(socket: Socket,io:Server) {
    socket.on("user:addFriend",async (data:any) => {
    const friendShip = await db.friendShip.create({
        data: {
            senderUsername: socket.data.user.username,
            receiverUsername: data.username
        },
        })
    socket.emit("user:addFriend",{
        sentRequests:friendShip
    })

    const userSockets = [...io.sockets.sockets.values()]
    .filter(socket => (socket.data.user.username === data.username))

    const otherUserFriendships = await db.user.findUnique({
        where:{
            username:data.username
        },
        select:{
            receivedRequests:true
        }
    })

    for(const userSocket of userSockets)
        {   
            userSocket.emit("user:addFriend",otherUserFriendships)
        }
})

}