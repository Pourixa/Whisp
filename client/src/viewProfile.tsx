import { Avatar } from '#components/ui/avatar';
import { Button } from '#components/ui/button';
import { Input } from '#components/ui/input';
import { Textarea } from '#components/ui/textarea';
import type { user } from '#lib/types';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

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
    avatar:"d",
    isFriend:true,
}


export function ViewProfile() {
    return <div className='grid  items-center h-dvh p-4'>
        <ArrowLeft className='flex justify-center items-center '/>
        <Avatar className={'w-32 h-32 justify-self-center'}/>
        <div className='grid'>
            <p className='pl-4'>Name</p>
            <Input className='pointer-events-none' readOnly defaultValue={String(user1.name)}/>
        </div>
        <div className='grid'>
            <p className='pl-4'>Bio</p>
            <Textarea className='pointer-events-none' readOnly defaultValue={String(user1.about)}/>
        </div>
        
        <div>
            <p className='pl-4'>Username</p>
            <Input className='pointer-events-none' readOnly value={String(user1.username)}/>
        </div>
            {user1.isFriend ? <Button variant={"destructive"}>Remove Friend</Button> : <Button variant={"default"}>Add Friend</Button>}
    </div>
}