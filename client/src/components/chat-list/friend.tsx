import { ChatAvatar } from "#components/avatar"
import { Button } from "#components/ui/button"
import { Item, ItemActions, ItemDescription, ItemMedia, ItemTitle } from "#components/ui/item"
import { socket } from "#lib/socket"

export function Friend({user,isFriend} : {user:any,isFriend:boolean}) {
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
                {isFriend && <Button onClick={() =>  socket.emit("chat:create",{
                    username:user.username
                })}>
                    Chat
                </Button>}
                {isFriend ? <Button onClick={() => socket.emit("user:rejectFriend",{username:user.username})}  variant={"destructive"}>Remove Friend</Button> :
                <div><Button onClick={() => socket.emit("user:acceptFriend",{username:user.username})}  className={"bg-green-600"}  variant="default">ACCEPT</Button> <Button onClick={() => socket.emit("user:rejectFriend",{username:user.username})} variant="destructive">REJECT</Button></div> 
            }
            </ItemActions>
        </Item>
}