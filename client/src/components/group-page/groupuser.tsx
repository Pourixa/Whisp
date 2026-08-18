import { ChatAvatar } from "#components/avatar";
import { Button } from "#components/ui/button";
import { Item, ItemActions, ItemDescription, ItemMedia, ItemTitle } from "../ui/item";
import type React from "react";
import type { SetStateAction } from "react";

export function GroupSearch({user,isAdded,setSelected} : {user:any,isAdded:boolean,setSelected:React.Dispatch<SetStateAction<any>>}) {
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
                {isAdded ? <Button onClick={() =>  setSelected((prev:any) => {
                    const addedUsers = [...prev];
                    const i = addedUsers.findIndex(e => user.username === e.username)
                    if(i === -1)
                        return prev
                    addedUsers.splice(i,1)
                    return addedUsers
                })} variant={"destructive"}>
                    Remove
                </Button> : <Button onClick={() =>  setSelected((prev:any) => ([...prev,user]))}>
                    Add
                </Button>}
            </ItemActions>
        </Item>
}