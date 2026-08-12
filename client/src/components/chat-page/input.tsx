import { InputGroup, InputGroupButton, InputGroupInput, InputGroupTextarea } from "#components/ui/input-group";
import { Image, Send } from "lucide-react";
import { useState } from "react";


export function ChatInput() 
{
    const [active,setActive] = useState(false)
    return             <InputGroup className="p-1 rounded-none rounded-tl-md rounded-tr-md border-t-0.1 border-t-ring border-l-0.1 border-l-ring border-r-0.1 border-r-ring">
            <InputGroupButton className="self-baseline-last">
                <Image/>
            </InputGroupButton>
            <InputGroupTextarea placeholder="Write something" minLength={1} className="max-h-32 ml-0.5 mr-0.5" onChange={(e) => {
                if(e.target.value.length > 0)
                    return setActive(true)
                setActive(false)
            }}/>
            <InputGroupButton className={"self-baseline-last text-background bg-foreground flex justify-center align-middle disabled:pointer-events-none"} disabled={active ? false : true}>
                <Send />
            </InputGroupButton>
            </InputGroup>
}