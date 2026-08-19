import { InputGroup, InputGroupButton, InputGroupTextarea } from "#components/ui/input-group";
import { Image, Send } from "lucide-react";
import { useRef, useState } from "react";
import type {Socket} from 'socket.io-client';
import { makeurl } from "#lib/fetch";
import { Attachment, AttachmentMedia } from "#components/ui/attachment";


export function ChatInput({socket,chatid} : {socket:Socket,chatid:string}) 
{
    const [message,setMessage] = useState("")
    const [selectedImage,setSelectedImage] = useState<File | null>(null)
    const [isSending,setIsSending] = useState(false)
    const imageInputRef = useRef<HTMLInputElement>(null)

    async function sendMessage() {
        if ((!message.trim() && !selectedImage) || isSending)
            return

        setIsSending(true)
        try {
            let imageSrc: string | undefined
            if (selectedImage) {
                const formData = new FormData()
                formData.append("image",selectedImage)
                const response = await fetch(makeurl("/user/message-image"),{
                    method:"POST",
                    headers:{authorization:"Bearer " + localStorage.getItem("token")},
                    body:formData
                })
                if (!response.ok)
                    throw new Error("Image upload failed")
                imageSrc = (await response.json()).imageSrc
            }

            socket.emit("chat:message",{content:message, imageSrc, chatid})
            setMessage("")
            setSelectedImage(null)
        } finally {
            setIsSending(false)
        }
    }
    return <div>
        <InputGroup className={`grid grid-rows-${selectedImage ? 2 : 1} grid-cols-[auto_1fr_auto] p-1 rounded-none rounded-tl-md rounded-tr-md border-t-0.1 border-t-ring border-l-0.1 border-l-ring border-r-0.1 border-r-ring`}>
        {selectedImage && <Attachment className="col-span-3" orientation={"vertical"}>
                <AttachmentMedia variant={"image"}>
                    <img src={URL.createObjectURL(selectedImage)} alt="" />
                </AttachmentMedia>
                </Attachment>}
                <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => setSelectedImage(event.target.files?.[0] || null)}/>
                <InputGroupButton  onClick={() => imageInputRef.current?.click()} aria-label="Attach image" className="row-2 col-1 self-baseline-last">
                    <Image/>
                </InputGroupButton>
                <InputGroupTextarea value={message} placeholder="Write something" minLength={1} className="row-2 col-2 max-h-32 ml-0.5 mr-0.5" onChange={(e) => {
                    setMessage(e.target.value)
                }}/>
                <InputGroupButton onClick={sendMessage} className={" col-3 row-2 text-background bg-foreground flex justify-center align-middle disabled:pointer-events-none self-baseline-last"} disabled={(!message.trim() && !selectedImage) || isSending}>
                    <Send />
                </InputGroupButton>
                </InputGroup>
    </div>
}