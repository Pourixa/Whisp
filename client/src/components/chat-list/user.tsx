import { ChatAvatar } from "#components/avatar";
import { Button } from "#components/ui/button";
import type React from "react";
import { Item, ItemActions, ItemDescription, ItemMedia, ItemTitle } from "../ui/item";
import type { SetStateAction } from "react";
import { socket } from "#lib/socket";

export function UserSearch({user} : {setOpenedChatID:React.Dispatch<SetStateAction<string | null>>,user:any,setUser:React.Dispatch<SetStateAction<any>>}) {
    
    return <Item className="flex flex-col border-accent-accent border-2 @sm:border-none @sm:flex-row @sm:items-center @sm:justify-between">
        <div className="flex gap-2">
            <ItemMedia variant="icon" >
                <ChatAvatar isOnline={user.isOnline} src={user.avatar} name={user.name}/>
            </ItemMedia>
                <div className="flex flex-col shrink min-w-0">
                    <ItemTitle >
                        <h4 className="truncate" >
                            @{user.username}
                        </h4>
                    </ItemTitle>
                    <ItemDescription className="truncate">
                        {user.name}
                    </ItemDescription>
                </div>
            </div>
            <ItemActions>
                <Button onClick={() =>  socket.emit("chat:create",{
                    username:user.username
                })}>
                    Chat
                </Button>
                {user.sentRequests[0]?.status === "ACCEPTED" ||
                user.receivedRequests[0]?.status === "ACCEPTED" ? <Button variant={"destructive"}>Remove Friend</Button> :
                user.sentRequests[0]?.status === "PENDING" ||
                user.receivedRequests[0]?.status === "PENDING" ? <Button variant={"default"}>PENDING</Button> :
                <Button variant={"default"}>Add Friend</Button>}
            </ItemActions>
        </Item>
}