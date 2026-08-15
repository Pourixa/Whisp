import { Input } from "#components/ui/input";
import { Search} from"lucide-react"
import { Avatar } from "#components/ui/avatar";
import { Chat } from "#components/chat-list/chatItem";
import React, { type SetStateAction } from "react";
import { FilterMenu } from "#components/chat-list/filter";
import { Tabs } from "#components/chat-list/badges";
import { Logo } from "#components/logo";
import type { User } from "#lib/types";
import { EmptyChatList } from "#components/chat-list/emptychatList";
import { useNavigate } from "react-router";
import { ChatAvatar } from "#components/avatar";
import type { Socket } from "socket.io-client";

  

function Chats({socket,openedChatID,setOpenedChatID , selected,setSelected,filter,setFilter,user} : 
  { socket:Socket,
    openedChatID:string | null, setOpenedChatID:React.Dispatch<SetStateAction<string | null>>,
    selected:string,setSelected:React.Dispatch<SetStateAction<string>>,
  filter:string,setFilter:React.Dispatch<SetStateAction<string>>,
  user:User
}) {
  const nav = useNavigate()
  return (
    <div className={`flex-col ${!openedChatID ? "flex" : "hidden"} w-full`}>
      <div className="sticky top-0 bg-background z-50">
        <header className="flex justify-between p-4">
          <Logo classname=""/>
          <div className="flex gap-4 items-center">
            <FilterMenu filter={filter} setFilter={setFilter}/>
            <div onClick={() => {
                nav("profile")
              }}>
              <ChatAvatar src={user.avatar} name={user.name}/>
            </div>
          </div>
        </header>
        <div className="flex items-center p-4 gap-2">
          <Search/>
          <Input type="text" placeholder="Search"/>
        </div>
      </div>
        <Tabs selected={selected} setSelected={setSelected}/>
      <main>
        {user.chats.length > 0 ? user.chats.map((chat,idx) => {
          return <Chat socket={socket} openedChatID={openedChatID} setOpenedChatID={setOpenedChatID} chat={chat} key={idx} />
        }): <EmptyChatList/>}
      </main>
    </div>
  );
}

export default Chats;