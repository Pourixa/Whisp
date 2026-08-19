import {type SetStateAction } from "react";
import { Item, ItemDescription, ItemMedia, ItemTitle } from "../ui/item";
import { ChatAvatar } from "#components/avatar";

function Chat({chat  , setOpenedChatID }: 
    {chat: any ,openedChatID:string | null, setOpenedChatID:React.Dispatch<SetStateAction<string | null>> }) {
    const lastMessage = chat.messages[0] ;
    return (
        <Item onClick={() => setOpenedChatID(chat.id)} className={"grid grid-cols-[auto_1fr] grid-rows-2 gap-x-3.5 gap-y-0.5 items-center px-4 py-3.5 active:bg-ring rounded-none"}>
            <ItemMedia variant="icon" className="row-span-2 col-start-1 flex items-center justify-center h-full">
                {chat.members.length > 1 ? <ChatAvatar isOnline={false} src="" name={chat.name}/> : <ChatAvatar isOnline={chat.members[0].isOnline} src={chat.members[0].avatar} name={chat.members[0].name}/>}
            </ItemMedia>
            <ItemTitle className="row-start-1 col-start-2 flex items-baseline justify-between w-full">
                <h4 className="font-semibold text-base line-clamp-1 text-foreground">
                    {chat.members.length > 1 ? chat.name : chat.members[0].name}
                </h4>
                <span className="text-xs text-muted-foreground ml-2 shrink-0">
                    {lastMessage ? new Date(lastMessage.dateCreated).toLocaleDateString("en-GB") : ""}
                </span>
            </ItemTitle>

            <ItemDescription className="row-start-2 col-start-2 text-sm font-normal text-muted-foreground line-clamp-1">
                {lastMessage?.content || (lastMessage?.imageSrc ? "Image" : "No messages yet")}
            </ItemDescription>
        </Item>
    );
}

export { Chat };
