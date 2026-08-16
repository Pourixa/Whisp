import { useState, useEffect } from 'react';
import { ChatPage } from "./chatPage";
import Chats from "./chats";
import { Navigate } from 'react-router';
import { makeAuthReq } from '#lib/fetch';
import { chat, User, type Message }from '#lib/types';
import { socket } from '#lib/socket';
import { Spinner } from '#components/ui/spinner';

export function ChatsNPage() {
    const token = localStorage.getItem("token") as string;

    const [selected, setSelected] = useState("all");
    const [user, setUser] = useState<any | null>(null);
    const [openedChatID, setOpenedChatID] = useState<string | null>(null);
    if (!token) {
        return <Navigate to="/login" />;
    }

    socket.auth = { token };

    useEffect(() => {

        async function loadUser() {
            const res = await (
                await makeAuthReq("/user", token)
            ).json();
            const sortedUser = {
                ...res,
                chats: [...res.chats].sort((a: any, b: any) => {
                    const dateA = a.messages[0]?.dateCreated ?? 0;
                    const dateB = b.messages[0]?.dateCreated ?? 0;

                    return new Date(dateB).getTime() - new Date(dateA).getTime();
                })
            };        
            console.log(sortedUser)   
            setUser(sortedUser);
            socket.connect();
            for(const chat of res.chats)
                socket.emit("chat:join",{chatid:chat.id})
        }

        loadUser();
        function onMessage(message: Message) {
            setUser((prev:any) => {
                if (!prev) return prev;

                const chatIndex = prev.chats.findIndex(
                    (chat:any) => chat.id === message.groupID
                );

                if (chatIndex === -1) {
                    return prev;
                }

                const chats = [...prev.chats];

                chats[chatIndex] = {
                    ...chats[chatIndex],
                    messages: [
                        message,
                        ...chats[chatIndex].messages,
                    ]
                };
                
                return {
                    ...prev,
                    chats
                };
            });
        }

        function onUserOnline(data:any) {
            console.log(data.username,"is online")
            setUser((prev: any) => {
                if (!prev) return prev;

                return {
                    ...prev,

                    chats: prev.chats.map((chat: any) => {
                        if (chat.id !== data.chatid) {
                            return chat;
                        }

                        return {
                            ...chat,

                            members: chat.members.map((member: any) =>
                                member.username === data.username
                                    ? { ...member, isOnline: true }
                                    : member
                            )
                        };
                    })
                };
            });
        }

        function onUserOffline(data:any) {
            console.log(data.username,"is offline")
            setUser((prev: any) => {
                if (!prev) return prev;

                return {
                    ...prev,

                    chats: prev.chats.map((chat: any) => {
                        if (chat.id !== data.chatid) {
                            return chat;
                        }

                        return {
                            ...chat,

                            members: chat.members.map((member: any) =>
                                member.username === data.username
                                    ? { ...member, isOnline: false }
                                    : member
                            )
                        };
                    })
                };
            });
        }

        function onChatSelect(data:any) {
         setOpenedChatID(data.chatid)   
        }

        function onChatCreate(data:any)
        {
        setUser((prev: any) => ({
            ...prev,
            chats: [data,...prev.chats]
        }));
        }

        socket.on("chat:message", onMessage);
        socket.on("user-online",onUserOnline)
        socket.on("user-offline",onUserOffline)
        socket.on("chat:create",onChatCreate);
        socket.on("chat:select",onChatSelect)
        return () => {
            socket.off("chat:message", onMessage);
            socket.off("user-online",onUserOnline)
            socket.off("user-offline",onUserOffline)
            socket.off("chat:create",onChatCreate);
            socket.off("chat:select",onChatSelect)
            socket.disconnect();
        };

    }, []);

    if (!user) {
        return  <div className="w-dvw h-dvh flex items-center justify-center  gap-4">
      <Spinner className='size-15' />
    </div>;
    }
    return (
        <div className="flex">
            <Chats
                openedChatID={openedChatID}
                setOpenedChatID={setOpenedChatID}
                selected={selected}
                setSelected={setSelected}
                user={user}
                setUser={setUser}
            />

            <ChatPage
                socket={socket}
                user={user}
                openedChatID={openedChatID}
                setOpenedChatID={setOpenedChatID}
            />
        </div>
    );
}