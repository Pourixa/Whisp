import { Button } from "./components/ui/button";
import { ChatInput } from './components/chat-page/input';
import { ArrowLeft } from "lucide-react";
import type React from "react";
import { useEffect, useRef, type SetStateAction } from "react";
import { ChatAvatar } from "#components/avatar";
import { ChatMessage } from "#components/chat-page/message";
import type { Socket } from "socket.io-client";
import { chat } from "#lib/types";


export function ChatPage({user , socket ,openedChatID,setOpenedChatID}:{socket:Socket,user:any,openedChatID:string | null,setOpenedChatID:React.Dispatch<SetStateAction<string | null>>}) {
    const openedChat = user.chats.find((chat:any) => chat.id === openedChatID)
    const bottomRef = useRef<HTMLDivElement>(null)
    const sentRequests = user.sentRequests.filter((req:any) => req.receiverUsername === openedChat?.members[0].username)
    const receivedRequests =  user.receivedRequests.filter((req:any) => req.senderUsername === openedChat?.members[0].username)
    const lastseen = new Date(openedChat?.members[0].lastOnline)
    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior:"smooth"})
    },[openedChat?.messages])
    return <div className={`h-svh w-full flex-col justify-between ${!openedChatID ? "hidden" : "flex"}`}>
        {openedChat ? <>
            <header className="flex justify-between gap-4 p-2 items-center">
                <div className="flex gap-3 items-center">
                    <div className="flex items-center gap-4">
                      <ArrowLeft onClick={() => setOpenedChatID(null)}/>
                      {openedChat.members.length > 1 ? <ChatAvatar isOnline={false} src="" name={openedChat.name}/> : <ChatAvatar isOnline={openedChat.members[0].isOnline} src={openedChat.members[0].avatar} name={openedChat.members[0].name}/>}
                      </div>
                    <div className="grid">
                        <span className="line-clamp-1 text-ellipsis">{openedChat.members.length > 1 ? openedChat.name : openedChat.members[0].name}</span>
                        <span className="text-muted-foreground">{openedChat.members.length > 1 ? openedChat.members.length + " Members" : openedChat.members[0].isOnline ? "Online" : "Last seen " + lastseen.toLocaleDateString("en-GB") + " at " +  lastseen.toLocaleTimeString("en-GB").slice(0,5)}</span>
                    </div>
                </div>
                {openedChat.members.length > 1 ? <Button variant={"destructive"}>Leave the group</Button>
                : receivedRequests[0]?.status === "ACCEPTED" ||
                sentRequests[0]?.status === "ACCEPTED" ? <Button onClick={() => socket.emit("user:rejectFriend",{username: (sentRequests.length > 0 ? sentRequests[0].receiverUsername : receivedRequests[0].senderUsername)})} variant={"destructive"}>Remove Friend</Button> :
                receivedRequests[0]?.status === "PENDING" ||
                sentRequests[0]?.status === "PENDING" ? <Button disabled={true} variant={"default"}>PENDING</Button> :
                <Button variant={"default"} onClick={() => socket.emit("user:addFriend",{username:openedChat.members[0].username})}>Add Friend</Button>}
            </header>
            <main className="grow overflow-y-auto mb-1 ml-1 mr-1 flex flex-col p-1">
                {[...openedChat.messages].reverse().map((message,idx) => {
                  return <ChatMessage message={message} username={user.username} key={idx}/>
                })}
                <div ref={bottomRef} />
            </main>
            <footer>
                <ChatInput socket={socket} chatid={openedChat.id}/>
            </footer>
        </> : <main></main>}
    </div>
}
