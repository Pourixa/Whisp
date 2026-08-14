import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ChatAvatar({src,name}:{src:string,name:string}) {
    return <Avatar>
        <AvatarImage src={src} />
        <AvatarFallback>
            {name[0]}
        </AvatarFallback>
    </Avatar>
}