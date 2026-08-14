import { chat, User, type ChatT, type message } from "#lib/types";
import { Button } from "./components/ui/button";
import { ChatInput } from './components/chat-page/input';
import { ArrowLeft } from "lucide-react";
import type React from "react";
import type { SetStateAction } from "react";
import { ChatAvatar } from "#components/avatar";
import { ChatMessage } from "#components/chat-page/message";



export function ChatPage({username,openedChat,setOpenedChat}:{username:string,openedChat:ChatT,setOpenedChat:React.Dispatch<SetStateAction<ChatT>>}) {
    return <div className={`h-svh w-full flex-col justify-between ${openedChat.id === "" ? "hidden" : "flex"}`}>
        <header className="flex justify-between gap-4 p-2 items-center">

            <div className="flex gap-3 items-center">
                <div className="flex items-center gap-4">
                  <ArrowLeft onClick={() => setOpenedChat(chat)}/>
                  {openedChat.members.length > 1 ? <ChatAvatar src="" name={openedChat.name}/> : <ChatAvatar src={openedChat.members[0].avatar} name={openedChat.members[0].name}/>}
                  </div>
                <div className="grid">
                    <span className="line-clamp-1 text-ellipsis">{openedChat.members.length > 1 ? openedChat.name : openedChat.members[0].name}</span>
                    <span className="text-muted-foreground">{openedChat.members.length > 1 ? openedChat.members.length + " Members" : openedChat.members[0].isOnline ? "Online" : "Last seen " + openedChat.members[0].lastOnline.toLocaleTimeString("en-GB").slice(0,5)}</span>
                </div>
            </div>
            {openedChat.members.length > 1 ? <Button variant={"destructive"}>Leave the group</Button> 
            : openedChat.members[0].sentRequests[0]?.status === "ACCEPTED" || 
            openedChat.members[0].receivedRequests[0]?.status === "ACCEPTED" ? <Button variant={"destructive"}>Remove Friend</Button> :
            openedChat.members[0].sentRequests[0]?.status === "PENDING" || 
            openedChat.members[0].receivedRequests[0]?.status === "PENDING" ? <Button variant={"default"}>PENDING</Button> : 
            <Button variant={"default"}>Add Friend</Button>}
        </header>
        <main className="grow overflow-y-auto mb-1 ml-1 mr-1 flex flex-col p-1">
            {openedChat.messages.map((message,idx) => {
              return <ChatMessage message={message} username={username} key={idx}/>
                        })}
        </main>
        <footer>
            <ChatInput/>    
        </footer>
    </div>
}
