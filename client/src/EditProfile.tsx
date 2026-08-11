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
    isFriend:false,
}


const MAX_ABOUT_CHARS = 50
const MAX_NAME_CHARS = 25
export function EditProfile() {
    const [AboutChars,setAboutChars] = useState(user1.about.length)
    const [nameChars,setNameChars] = useState(user1.name.length)
    return <div className='grid  items-center h-dvh p-4'>
        <ArrowLeft className='flex justify-center items-center '/>
        <Avatar className={'w-24 h-24 justify-self-center'}/>
        <div className='flex w-full justify-around items-center'>
            <Button>Upload</Button>
            {user1.avatar != "" && <Button variant={"destructive"}>Remove</Button>}
        </div>
        <div className='grid'>
            <p className='pl-4'>Name</p>
            <Input maxLength={MAX_NAME_CHARS} defaultValue={String(user1.name)} onChange={(e) => {
                return setNameChars(e.target.value.length)
            }}/>
            <span className='justify-self-end pr-2'>{nameChars} / {MAX_NAME_CHARS} </span>
        </div>
        <div className='grid'>
            <p className='pl-4'>Bio</p>
            <Textarea maxLength={MAX_ABOUT_CHARS} defaultValue={String(user1.about)} onChange={(e) => {
                return setAboutChars(e.target.value.length)
            }}/>
            <span className='justify-self-end pr-2'>{AboutChars} / {MAX_ABOUT_CHARS} </span>
        </div>
        
        <div>
            <p className='pl-4'>Username (Read Only)</p>
            <Input className='pointer-events-none text-muted-foreground' readOnly value={String(user1.username)}/>
        </div>
        <Button>Save</Button>
    </div>
}