import { ChatMessage } from "#components/chat-page/message";
import { Avatar } from "#components/ui/avatar";
import type { message, user } from "#lib/types";
import { Button } from "./components/ui/button";
import { ChatInput } from './components/chat-page/input';
import { ArrowLeft } from "lucide-react";


const user1:user = {
    name:"makjsdlkjfklsdjflkjsdkfjklsjfklsdjfklsdjfkldsmad",
    username:"MoxSad",
    messages: [
           {
        content: "Hey Bob! How is the messaging app going?", 
        username: "moxsad",
        dateCreated:new Date()
      },
      {
        content: "It's going great! The Prisma schema is done.",
        username: "moxsad",
        dateCreated:new Date()
      },
    ],
    isOnline:true,
    lastOnline:new Date(),
    about:"Yo",
    avatar:"",
    isFriend:false,
}

const user2:user = {
    name:"mamafkldsjkfjdslkfjlsdkjflksdjfklsdjlfkjdd",
    username:"moxsad",
    messages: [
           {
        content: "Hey Bob! How is the messaging app going?", 
        username: "moxsad",
        dateCreated:new Date()
      },
      {
        content: "It's going great! The Prisma schema is done.",
        username: "moxsad",
        dateCreated:new Date()
      },
    ],
    isOnline:true,
    lastOnline:new Date(),
    about:"Yo",
    avatar:"",
    isFriend:true,
} 

const messages:message[] = [
           {
        content: "Hey Bob! How is the messaging app going?", 
        username: "moxsad",
        dateCreated:new Date()
      },
      {
        content: "It's going great! The Prisma schema is done.",
        username: "moxsad",
        dateCreated:new Date()
      },  
           {
        content: "Hey Bob! How is the messaging app going?", 
        username: "moxsad",
        dateCreated:new Date()
      },
      {
        content: "It's going great! The Prisma schema is done.",
        username: "moxsad",
        dateCreated:new Date()
      },{
        content: "Hey Bob! How is the messaging app going?", 
        username: "moxsad",
        dateCreated:new Date()
      },
      {
        content: "It's going great! The Prisma schema is done.",
        username: "moxsad",
        dateCreated:new Date()
      },  
           {
        content: "Hey Bob! How is the messaging app going?", 
        username: "moxsad",
        dateCreated:new Date()
      },
      {
        content: "It's going great! The Prisma schema is done.",
        username: "moxsad",
        dateCreated:new Date()
      },{
        content: "Hey Bob! How is the messaging app going?", 
        username: "moxsad",
        dateCreated:new Date()
      },
      {
        content: "It's going great! The Prisma schema is done.",
        username: "moxsad",
        dateCreated:new Date()
      },  
           {
        content: "Hey Bob! How is the messaging app going?", 
        username: "moxsad",
        dateCreated:new Date()
      },
      {
        content: "It's going great! The Prisma schema is done.",
        username: "moxsad",
        dateCreated:new Date()
      },{
        content: "Hey Bob! How is the messaging app going?", 
        username: "moxsad",
        dateCreated:new Date()
      },
      {
        content: "It's going great! The Prisma schema is done.",
        username: "moxsad",
        dateCreated:new Date()
      },  
           {
        content: "Hey Bob! How is the messaging app going?", 
        username: "moxsad",
        dateCreated:new Date()
      },
      {
        content: "It's going great! The Prisma schema is done.",
        username: "moxsad",
        dateCreated:new Date()
      },
]
export function ChatPage() {
    return <div className="h-svh flex flex-col justify-between">
        <header className="flex justify-between gap-4 p-2 items-center">

            <div className="flex items-center gap-4">
              <ArrowLeft/>
              <Avatar/>
              </div>
            <div className="grid">
                <span className="line-clamp-1 text-ellipsis">{user1.name}</span>
                <span className="text-muted-foreground">{user1.isOnline ? "Online" : "Last seen " + user1.lastOnline.toLocaleTimeString("en-GB").slice(0,5)}</span>
            </div>
            {user1.isFriend ? <Button variant={"destructive"}>Remove Friend</Button> : <Button variant={"default"}>Add Friend</Button>}
        </header>
        <main className="grow overflow-y-scroll mb-1 ml-1 mr-1">
            {messages.map((mes,idx) => {
                return <ChatMessage message={mes} key={idx}/>
            })}
        </main>
        <footer>
            <ChatInput/>    
        </footer>
    </div>
}
