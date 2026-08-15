import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "#components/ui/empty";
import { LucideMessageSquareX } from "lucide-react";

export function EmptyChatList({text} : {text:string}) {
    return <Empty >
        <EmptyHeader>
            <EmptyMedia variant={"icon"}>
                <LucideMessageSquareX/>
            </EmptyMedia>
        <EmptyTitle>
            {text}
        </EmptyTitle>
        </EmptyHeader>
    </Empty>
}