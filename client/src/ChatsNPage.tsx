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
    const [filter, setFilter] = useState("asc");
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

            setUser(res);
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
        socket.on("chat:message", onMessage);

        return () => {
            socket.off("chat:message", onMessage);
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
                socket={socket}
                openedChatID={openedChatID}
                setOpenedChatID={setOpenedChatID}
                selected={selected}
                setSelected={setSelected}
                filter={filter}
                setFilter={setFilter}
                user={user}
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