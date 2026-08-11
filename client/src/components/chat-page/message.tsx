import { Message, MessageContent, MessageFooter } from "#components/ui/message";
import type { message } from "#lib/types";

export function ChatMessage({message}:{message:message})
{
    return <Message>
        <MessageContent>
            {message.content}
        </MessageContent>
        <MessageFooter>
            {message.dateCreated.toLocaleTimeString("en-GB").slice(0,5)}
        </MessageFooter>
    </Message>
} 