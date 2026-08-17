import { ChatAvatar } from "#components/avatar"
import { Button } from "#components/ui/button"
import { Item, ItemActions, ItemDescription, ItemMedia, ItemTitle } from "#components/ui/item"
import { socket } from "#lib/socket"

export function Friend({selfUser,user,isFriend} : {selfUser:any,user:any,isFriend:boolean}) {

    return <Item className="flex flex-col border-accent-accent border-2 @sm:border-none @sm:flex-row @sm:items-center @sm:justify-between">
        <div className="flex gap-2">
            <ItemMedia variant="icon" >
                <ChatAvatar isOnline={user.isOnline} src={user.avatar} name={user.name}/>
            </ItemMedia>
                <div className="flex flex-col shrink min-w-0">
                    {isFriend && <ItemTitle >
                        <h4 className="truncate" >
                            @{user.username}
                        </h4>
                    </ItemTitle>}
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
                { isFriend ? <Button variant={"destructive"}>Remove Friend</Button> :
                user<div><Button disabled={true} variant="default">ACCEPT</Button> <Button disabled={true} variant="default">REJECT</Button></div> 
            }
            </ItemActions>
        </Item>
}