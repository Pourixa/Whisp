import { Input } from "#components/ui/input";
import { Search} from"lucide-react"
import { Chat } from "#components/chat-list/chatItem";
import React, { useState, type SetStateAction } from "react";
import { Tabs } from "#components/chat-list/badges";
import { Logo } from "#components/logo";
import type { User } from "#lib/types";
import { EmptyChatList } from "#components/chat-list/emptychatList";
import { useNavigate } from "react-router";
import { ChatAvatar } from "#components/avatar";
import type { Socket } from "socket.io-client";

  

function Chats({socket,openedChatID,setOpenedChatID , selected,setSelected,user} : 
  { socket:Socket,
    openedChatID:string | null, setOpenedChatID:React.Dispatch<SetStateAction<string | null>>,
    selected:string,setSelected:React.Dispatch<SetStateAction<string>>,
    user:User
}) {
  const nav = useNavigate()
  const [result,setResult] = useState([])
  const selectedChats = (() => {
    const all = user.chats
    if(selected==="all")
      return all
    else if (selected === "groups")
      return all.filter((chat:any) => chat.members > 1)
    else if (selected === "friends")
    {
      return( all.filter((chat:any) => chat.members.length === 1 && (chat.members[0].receivedRequests.length === 1 || chat.members[0].sentRequests.length === 1)))
    }
    else (selected === "search")
    return result
  })()
  return (
    <div className={`flex-col ${!openedChatID ? "flex" : "hidden"} w-full`}>
      <div className="sticky top-0 bg-background z-50">
        <header className="flex justify-between p-4">
          <Logo classname=""/>
          <div className="flex gap-4 items-center">
            <div onClick={() => {
                nav("profile")
              }}>
              <ChatAvatar isOnline={false} src={user.avatar} name={user.name}/>
            </div>
          </div>
        </header>
        <div className="flex items-center p-4 gap-2">
          <Search/>
          <Input id="search" onFocus={() => setSelected("search")} type="text" placeholder="Search"/>
        </div>
      </div>
        <Tabs selected={selected} setSelected={setSelected}/>
      <main>
        {selectedChats?.length > 0 ? user.chats.map((chat,idx) => {
          return <Chat socket={socket} openedChatID={openedChatID} setOpenedChatID={setOpenedChatID} chat={chat} key={idx} />
        }): <EmptyChatList/>}
      </main>
    </div>
  );
}

export default Chats;