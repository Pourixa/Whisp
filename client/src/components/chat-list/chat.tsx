import type { chat } from "#lib/types";
import { Avatar } from "../ui/avatar";
import { Item, ItemDescription, ItemMedia, ItemTitle } from "../ui/item";

function Chat({ chat }: { chat: chat }) {
    const lastMessage = chat.messages[chat.messages.length - 1];

    return (
        <Item className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-3.5 gap-y-0.5 items-center px-4 py-3.5">
            <ItemMedia variant="icon" className="row-span-2 col-start-1 flex items-center justify-center h-full">
                <Avatar />
            </ItemMedia>

            <ItemTitle className="row-start-1 col-start-2 flex items-baseline justify-between w-full">
                <h4 className="font-semibold text-base line-clamp-1 text-foreground">
                    {chat.name}
                </h4>
                <span className="text-xs text-muted-foreground ml-2 shrink-0">
                    {lastMessage ? new Date(lastMessage.dateCreated).toLocaleDateString("en-GB") : ""}
                </span>
            </ItemTitle>

            <ItemDescription className="row-start-2 col-start-2 text-sm font-normal text-muted-foreground line-clamp-1">
                {lastMessage?.content || "No messages yet"}
            </ItemDescription>
        </Item>
    );
}

export { Chat };
