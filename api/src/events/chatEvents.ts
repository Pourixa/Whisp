import { Socket,Server } from "socket.io";
import db from "../db"


function validateMessage(data: any) {
    if (typeof data.content !== "string")
        return "Invalid content";

    if (!data.content.trim())
        return "Message cannot be empty";

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
                    content:data.content,
                    groupID:data.chatid
                }
            })
            io.to(`chat:${data.chatid}`).emit("chat:message",message)
        } catch (e) {
            socket.emit("error",{message:"Something went wrong"})
         }})
}
