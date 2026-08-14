import { useState, useEffect } from 'react';
import { ChatPage } from "./chatPage";
import Chats from "./chats";
import { Navigate } from 'react-router';
import { makeAuthReq } from '#lib/fetch';
import { chat, User }from '#lib/types';

export function ChatsNPage() {
    const token = localStorage.getItem("token")
    const [selected,setSelected] = useState("all")
    const [filter,setFilter] = useState("asc")
    const [user,setUser] = useState<any>(User)
    const [openedChat,setOpenedChat] = useState(chat)
    if(!token)
        return <Navigate to={"/login"}/>
    useEffect(() => {
    (async () => {
    const res = await (await makeAuthReq("/user",token)).json()
    console.log(res)
    setUser(res)
    })()
},[])
    return <div className="flex">
    <Chats openedChat={openedChat} setOpenedChat={setOpenedChat} selected={selected} setSelected={setSelected} filter={filter} setFilter={setFilter} user={user} />
    <ChatPage username={user.username} openedChat={openedChat} setOpenedChat={setOpenedChat}/>
    </div> 

     
}