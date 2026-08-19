import { Socket,Server } from "socket.io";
import db from "../db"


function validateMessage(data: any) {
    if (typeof data.content !== "string" || (!data.content.trim() && !data.imageSrc))
        return "Message cannot be empty";

    if (data.imageSrc && typeof data.imageSrc !== "string")
        return "Invalid image";

    if (typeof data.chatid !== "string")
        return "Invalid chat ID";

    return null;
}

async function hasAccess(socket: Socket, data: any) {
    try {
        await db.chat.findFirstOrThrow({
            where: {
                id: data.chatid,
                members: {
                    some: {
                        username: socket.data.user.username
                    }
                }
            }
        });
        return true
    } catch (e) {
        return false
    }
}

export function ChatEvents(socket: Socket,io:Server) {
    socket.on("chat:message", async data => {
        console.log(socket.data.user.username, "Sent a message")
        const invalid = validateMessage(data)
        if (invalid)
            return socket.emit("error", { message: invalid })
        try {
            if(!(await hasAccess(socket,data)))
                return socket.emit("error", {
                            message: "You don't have access to this chat."
                        });
            const message = await db.message.create({
                data:{
                    username:socket.data.user.username,
                    content:data.content?.trim() || null,
                    isImage:Boolean(data.imageSrc),
                    imageSrc:data.imageSrc || null,
                    groupID:data.chatid
                }
            })
            io.to(`chat:${data.chatid}`).emit("chat:message",message)
        } catch (e) {
            socket.emit("error",{message:"Something went wrong"})
         }})
    socket.on("chat:create" , async data => {
        try {
                const existingChats = await db.chat.findMany({
                    where:{
                        AND: [
                            {
                                members:
                                {
                                    some:{
                                        username:socket.data.user.username
                                    }
                                }
                            },
                            {
                                members:{
                                    some:{
                                        username:data.username
                                    }
                                }
                            }
                        ]
                    },
                    include:{
                        members:{
                            omit:{
                                password:true
                            }
                        }
                    }
                })
                const soloChat = existingChats.find((chat) => chat.members.length === 2)
                if(soloChat)
                    return socket.emit("chat:select",{
                        chatid:soloChat.id
                    })

                const newChat = await db.chat.create({
                    data:{
                        members:{
                            connect:[
                                {
                                    username:socket.data.user.username
                                },
                                {
                                    username:data.username
                                }
                            ]
                        }
                    },
                    include:{
                        members:{
                            where:{
                                username:{
                                    not:socket.data.user.username
                                }
                            },
                            include:{
                                sentRequests:{
                                    where:{
                                        receiverUsername:socket.data.user.username
                                    }
                                },
                                receivedRequests:{
                                    where:{
                                        senderUsername:socket.data.user.username
                                    }
                                }
                            },
                            omit:{
                                password:true
                            }
                        },
                        messages:true
                    }
                })
                const userSockets = [...io.sockets.sockets.values()]
                .filter(socket => (socket.data.user.username === data.username))
                
                const newChatForUser = await db.chat.findUnique({where:{id:newChat.id},include:{messages:true,members:
                        {
                            where:{
                                username:{
                                    not:data.username
                                }
                            },
                            include:{
                                sentRequests:{
                                    where:{
                                        receiverUsername:data.username
                                    }
                                },
                                receivedRequests:{
                                    where:{
                                        senderUsername:data.username
                                    }
                                }
                            }
                        }
                    }})

                for(const userSocket of userSockets)
                {   
                    userSocket.join(`chat:${newChat.id}`)
                    userSocket.emit("chat:create",newChatForUser)
                }
                socket.join(`chat:${newChat.id}`)
                socket.emit("chat:create",newChat)
                socket.emit(`chat:select`,{
                    chatid:newChat.id
                })
            } catch (e) {
                socket.emit("error",{message:"Something went wrong"})
            }
    })
}
