import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ChatAvatar({src,name,isOnline,size="default"}:{size?:any ,src:string,name:string,isOnline:boolean}) {
    return <Avatar className={size === "lg" ? 'w-40 h-40 justify-self-center' : ""}>
        <AvatarImage src={ src==="" ? undefined : src} />
        <AvatarFallback>
            {name[0]}
        </AvatarFallback>
        {isOnline && <AvatarBadge className="bg-green-600 dark:bg-green-800" />}
    </Avatar>
}