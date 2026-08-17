import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ChatAvatar({src,name,isOnline}:{src:string,name:string,isOnline:boolean}) {
    return <Avatar>
        <AvatarImage src={ src==="" ? undefined : src} />
        <AvatarFallback>
            {name[0]}
        </AvatarFallback>
        {isOnline && <AvatarBadge className="bg-green-600 dark:bg-green-800" />}
    </Avatar>
}