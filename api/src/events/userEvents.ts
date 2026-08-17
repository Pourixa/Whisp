import { Socket,Server } from "socket.io";
import db from "../db"

export function UserEvents(socket: Socket,io:Server) {
    socket.on("user:addFriend",async (data:any) => {
    const friendShip = await db.friendShip.create({
        data: {
            senderUsername: socket.data.user.username,
            receiverUsername: data.username
        },
        include:{
            sender:{
                omit:{
                    password:true
                }
            },
            receiver:{  
                omit:{
                    password:true
                }
            }
        }
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
    socket.on("user:rejectFriend",async (data:any) => {
       const rel = await db.friendShip.findFirst({
    where: {
        OR: [
            {
                senderUsername: data.username,
                receiverUsername: socket.data.user.username
            },
            {
                senderUsername: socket.data.user.username,
                receiverUsername: data.username
            }
        ]
    }
})
    if (rel) {
        await db.friendShip.delete({
            where: {
                senderUsername_receiverUsername: {
                    senderUsername: rel.senderUsername,
                    receiverUsername: rel.receiverUsername
                }
            }
            })
                socket.emit("user:rejectFriend",{
                relation:rel,
            })
                const userSockets = [...io.sockets.sockets.values()]
        .filter(socket => (socket.data.user.username === data.username))
        for(const userSocket of userSockets)
            {   
                userSocket.emit("user:rejectFriend",{relation : rel})
            }
} else {
    socket.emit("error" , {message:"relationship not found."})
}
    })

}