    import { Bubble, BubbleContent } from "#components/ui/bubble";
    import { Message, MessageContent, MessageFooter } from "#components/ui/message";

    export function ChatMessage({isGroup , message,username}:{isGroup:boolean , message:any,username:string})
    {
        const date = new Date(message.dateCreated)
        return <Message className="grid" align={message.username === username ? "end" : "start"}>
        <MessageContent>
            <Bubble variant={message.username === username ? "default" : "muted"}>
            <BubbleContent className="flex flex-col gap-2">
                {message.imageSrc && <img src={message.imageSrc} alt="" className="max-h-80 max-w-full rounded-md object-contain" />}
                {message.content && <span>{message.content}</span>}
            </BubbleContent>
            </Bubble>
        </MessageContent>
        <MessageFooter>
            <span>{(isGroup ? message.username + " - " : "") + date.toLocaleDateString("en-GB") + " - " + date.toLocaleTimeString("en-GB").slice(0,5)}</span>
        </MessageFooter>
        </Message>
    } 