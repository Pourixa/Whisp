import { InputGroup, InputGroupButton, InputGroupTextarea } from "#components/ui/input-group";
import { Image, Send } from "lucide-react";
import { useState } from "react";
import type {Socket} from 'socket.io-client';


export function ChatInput({socket,chatid} : {socket:Socket,chatid:string}) 
{
    const [message,setMessage] = useState("")
    return    <InputGroup className="p-1 rounded-none rounded-tl-md rounded-tr-md border-t-0.1 border-t-ring border-l-0.1 border-l-ring border-r-0.1 border-r-ring">
            <InputGroupButton className="self-baseline-last">
                <Image/>
            </InputGroupButton>
            <InputGroupTextarea value={message} placeholder="Write something" minLength={1} className="max-h-32 ml-0.5 mr-0.5" onChange={(e) => {
                setMessage(e.target.value)
            }}/>
            <InputGroupButton onClick={() =>{ socket.emit("chat:message",{
                content:message,
                chatid:chatid
            })
            setMessage("")
        }} className={"self-baseline-last text-background bg-foreground flex justify-center align-middle disabled:pointer-events-none"} disabled={message.length > 0 ? false : true}>
                <Send />
            </InputGroupButton>
            </InputGroup>
}