    import { Bubble, BubbleContent } from "#components/ui/bubble";
    import { Message, MessageContent, MessageFooter } from "#components/ui/message";
    import type { message } from "#lib/types";

    export function ChatMessage({message,username}:{message:message,username:string})
    {
        const date = new Date(message.dateCreated)
        return <Message className="grid" align={message.username === username ? "end" : "start"}>
        <MessageContent>
            <Bubble variant={message.username === username ? "default" : "muted"}>
            <BubbleContent>{message.content}</BubbleContent>
            </Bubble>
        </MessageContent>
        <MessageFooter>
            <span>{date.toLocaleDateString("en-GB") + " - " + date.toLocaleTimeString("en-GB").slice(0,5)}</span>
        </MessageFooter>
        </Message>
    } 