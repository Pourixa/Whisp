import { Input } from "#components/ui/input";
import { Search} from"lucide-react"
import { Chat } from "#components/chat-list/chatItem";
import React, { useEffect, useState, type SetStateAction } from "react";
import { Tabs } from "#components/chat-list/badges";
import { Logo } from "#components/logo";
import { EmptyChatList } from "#components/chat-list/emptychatList";
import { useNavigate } from "react-router";
import { ChatAvatar } from "#components/avatar";
import { makeAuthReq } from "#lib/fetch";
import { UserSearch } from "#components/chat-list/user";
import { Friend } from "#components/chat-list/friend";
import { Separator } from "#components/ui/separator";
import { BsPeople } from "react-icons/bs";
import { Button } from "#components/ui/button";

  

function Chats({openedChatID,setOpenedChatID , selected,setSelected,user,setUser} : 
  {
    openedChatID:string | null, setOpenedChatID:React.Dispatch<SetStateAction<string | null>>,
    selected:string,setSelected:React.Dispatch<SetStateAction<string>>,
    user:any , setUser:React.Dispatch<SetStateAction<any>>
}) {
  const nav = useNavigate()
    const [result,setResult] = useState([])
    const [searchQuery,setSearchQuery] = useState<String>()
  const sentfriends:any = [] ;
  const recivedfriends:any = [] ; 
  const pending:any =[];
  const selectedChats = (() => {
    const all = user.chats
    if(selected==="all")
      return all
    else if (selected === "groups")
      return all.filter((chat:any) => chat.members.length > 1)
    else if (selected === "friends")
    {
      pending.push(...user.receivedRequests.filter((req:any) => req.status === "PENDING"))
      recivedfriends.push(...user.receivedRequests.filter((req:any) => req.status === "ACCEPTED"))
      sentfriends.push(...user.sentRequests.filter((req:any) => req.status === "ACCEPTED"))
    }
    else (selected === "search")
    return result
  })()
  useEffect(() => {
      (async () => {const stream = await makeAuthReq("/user/search?q="+searchQuery,localStorage.token,"post",{})
      setResult(await stream.json())})()
  },[searchQuery])
  return (
    <div className={`flex-col @lg:overflow-auto @lg:border-ring  @lg:border-r-2 @lg:relative @lg:flex ${!openedChatID ? "flex" : "hidden"} w-full`}>
      <div className="sticky top-0 bg-background z-50">
        <header className="flex justify-between p-4">
          <Logo classname=""/>
          <div className="flex gap-4 items-center">
            <div onClick={() => {
                nav("editProfile")
              }}>
              <ChatAvatar isOnline={false} src={user.avatar} name={user.name}/>
            </div>
          </div>
        </header>
        <div className="flex items-center p-4 gap-2">
          <Search/>
          <Input onChange={e => setSearchQuery(e.target.value)} id="search" onFocus={() => setSelected("search")} type="text" placeholder="Search"/>
        </div>
      </div>
        <Tabs selected={selected} setSelected={setSelected}/>
            {
        selected === "friends" ? (
          <main className="@container flex flex-col gap-0.5 p-0.5">
            {sentfriends.length + recivedfriends.length + pending.length > 0 ? (
              <>
                {pending.length > 0 &&
                  pending.map((res: any) => (
                    <Friend
                      isFriend={false}
                      user={res.sender}
                      key={res.senderUsername + res.receiverUsername}
                    />
                  ))}

                <Separator orientation="horizontal" className="mt-2 mb-2" />

                {sentfriends.length > 0 &&
                  sentfriends.map((res: any) => (
                    <Friend
                      isFriend={true}
                      user={res.receiver}
                      key={res.senderUsername + res.receiverUsername}
                    />
                  ))}

                {recivedfriends.length > 0 &&
                  recivedfriends.map((res: any) => (
                    <Friend
                      isFriend={true}
                      user={res.sender}
                      key={res.senderUsername + res.receiverUsername}
                    />
                  ))}
              </>
            ) : (
              <EmptyChatList text="No friends yet" />
            )}
          </main>
        ) : selected === "groups" ? (
          <main className="flex flex-col gap-0.5 p-0.5">
            {selectedChats?.length > 0 ? (
              selectedChats
                .map((chat: any) => (
                  <Chat
                    openedChatID={openedChatID}
                    setOpenedChatID={setOpenedChatID}
                    chat={chat}
                    key={chat.id}
                  />
                ))
            ) : (
              <EmptyChatList text="No groups yet" />
            )}
          </main>
        ) : selected !== "search" ? (
          <main className="flex flex-col gap-0.5 p-0.5">
            {selectedChats?.length > 0 ? (
              user.chats.map((chat: any) => (
                <Chat
                  openedChatID={openedChatID}
                  setOpenedChatID={setOpenedChatID}
                  chat={chat}
                  key={chat.id}
                />
              ))
            ) : (
              <EmptyChatList text="No chats yet" />
            )}
          </main>
        ) : (
          <main className="@container flex flex-col gap-0.5 p-0.5">
            {result?.length > 0 ? (
              result.map((res: any, idx: number) => (
                <UserSearch
                  selfUser={user}
                  user={res}
                  key={idx}
                />
              ))
            ) : (
              <EmptyChatList text="Search for some whisperers" />
            )}
          </main>
        )
      }
      <Button onClick={() => nav("/creategroup")} className={" @lg:right-[calc(50%+1em)] fixed bottom-4 right-4  rounded-full p-4"}>
        <BsPeople/>
        </Button>
    </div>
  );
}

export default Chats;