    import { Bubble, BubbleContent } from "#components/ui/bubble";
    import { Message, MessageContent, MessageFooter } from "#components/ui/message";

    export function ChatMessage({isGroup , message,username}:{isGroup:boolean , message:any,username:string})
    {
        const date = new Date(message.dateCreated)
        return <Message className="grid" align={message.username === username ? "end" : "start"}>
        <MessageContent>
            <Bubble variant={message.username === username ? "default" : "muted"}>
            <BubbleContent>{message.content}</BubbleContent>
            </Bubble>
        </MessageContent>
        <MessageFooter>
            <span>{(isGroup ? message.username + " - " : "") + date.toLocaleDateString("en-GB") + " - " + date.toLocaleTimeString("en-GB").slice(0,5)}</span>
        </MessageFooter>
        </Message>
    } 