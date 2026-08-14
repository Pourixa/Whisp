import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "#components/ui/empty";
import { LucideMessageSquareX } from "lucide-react";

export function EmptyChatList() {
    return <Empty>
        <EmptyHeader>
            <EmptyMedia variant={"icon"}>
                <LucideMessageSquareX/>
            </EmptyMedia>
        <EmptyTitle>
            No Chats Yet
        </EmptyTitle>
        </EmptyHeader>
    </Empty>
}