import { Input } from "#components/ui/input";
import { Search} from"lucide-react"
import { Button } from "./components/ui/button";
import type { chat } from "#lib/types";
import { Avatar } from "#components/ui/avatar";
import { Chat } from "#components/chat-list/chat";
import { useState } from "react";
import { FilterMenu } from "#components/chat-list/filter";
import { Tabs } from "#components/chat-list/badges";

  const chat1:chat = {
    name:"Our group",
    members: ["reqz","mmd"],
    messages: [
      {
        username:"mmd",
        content:'HI',
        dateCreated:new Date(),
      },
            {
        username:"mmd",
        content:'byeI',
        dateCreated:new Date(),
      }
    ]
  }
  const chats:chat[] = [chat1,chat1]

function App() {
  const [selected,setSelected] = useState("phone")
  const [filter,setFilter] = useState("asc")
  return (
    <div className="flex-col">
      <div className="flex justify-between p-4">
        <h1 className="flex justify-center items-center">Whisp</h1>
        <div className="flex gap-4 items-center">
          <FilterMenu filter={filter} setFilter={setFilter}/>
          <Avatar/>
        </div>
      </div>
      <div className="flex items-center p-4 gap-2">
        <Search/>
        <Input type="text" placeholder="Search"/>
      </div>
        <Tabs selected={selected} setSelected={setSelected}/>
      <div>
        {chats.map((chat,idx) => {
          return <Chat chat={chat} key={idx} />
        })}
      </div>
    </div>
  );
}

export default App;