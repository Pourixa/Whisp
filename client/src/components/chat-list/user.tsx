import { ChatAvatar } from "#components/avatar";
import { Button } from "#components/ui/button";
import { Item, ItemActions, ItemDescription, ItemMedia, ItemTitle } from "../ui/item";
import { socket } from "#lib/socket";

export function UserSearch({selfUser,user} : {selfUser:any,user:any}) {
    const sentRequests = selfUser.sentRequests.filter((req:any) => req.receiverUsername === user.username)
    const receivedRequests =  selfUser.receivedRequests.filter((req:any) => req.senderUsername === user.username)
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
                {sentRequests[0]?.status === "ACCEPTED" ||
                receivedRequests[0]?.status === "ACCEPTED" ? <Button variant={"destructive"}>Remove Friend</Button> :
                sentRequests[0]?.status === "PENDING" ||
                receivedRequests[0]?.status === "PENDING" ? <Button disabled={true} variant="default">PENDING</Button> :
                <Button variant={"default"} onClick={() => socket.emit("user:addFriend",{username:user.username})}>Add Friend</Button>}
            </ItemActions>
        </Item>
}