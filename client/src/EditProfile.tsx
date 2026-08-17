import { ChatAvatar } from '#components/avatar';
import { Avatar } from '#components/ui/avatar';
import { Button } from '#components/ui/button';
import { Input } from '#components/ui/input';
import { Spinner } from '#components/ui/spinner';
import { Textarea } from '#components/ui/textarea';
import { makeAuthReq } from '#lib/fetch';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';



const MAX_ABOUT_CHARS = 50
const MAX_NAME_CHARS = 25
export function EditProfile() {
    const [user,setUser] =useState<null | any>(null)
    const [AboutChars,setAboutChars] = useState<null | any>(null)
    const [nameChars,setNameChars] = useState<null | any>(null)
    const nav = useNavigate()
    const token = localStorage.getItem("token") as string;
    useEffect(() => {
        async function loadUser() {
            const res = await (
                await makeAuthReq("/user", token)
            ).json();      
            setUser(res);
            setAboutChars(res.about)
            setNameChars(res.name)
            console.log(res)
        }
        loadUser()
    },[])
    if (!token) {
        return <Navigate to="/login" />;
    }

    if (!user) {
        return  <div className="w-dvw h-dvh flex items-center justify-center  gap-4">
      <Spinner className='size-15' />
    </div>;
    }

    return <div className='grid  items-center h-dvh p-4'>
        <ArrowLeft onClick={() => nav("/")} className='flex justify-center items-center '/>
        <ChatAvatar src={user.avatar} name={user.name} isOnline={false} size={"lg"}/>
        <div className='flex w-full justify-around items-center'>
            <Button>Upload</Button>
            {user.avatar != "" && <Button variant={"destructive"}>Remove</Button>}
        </div>
        <div className='grid gap-0.5'>
            <p className='pl-4'>Name</p>
            <Input maxLength={MAX_NAME_CHARS} defaultValue={String(user.name)} onChange={(e) => {
                return setNameChars(e.target.value)
            }}/>
            <span className='justify-self-end pr-2'>{nameChars.length} / {MAX_NAME_CHARS} </span>
        </div>
        <div className='grid gap-0.5'>
            <p className='pl-4'>Bio</p>
            <Textarea maxLength={MAX_ABOUT_CHARS} defaultValue={String(user.about)} onChange={(e) => {
                return setAboutChars(e.target.value)
            }}/>
            <span className='justify-self-end pr-2'>{AboutChars.length} / {MAX_ABOUT_CHARS} </span>
        </div>
        
        <div className='grid gap-0.5'>
            <p className='pl-4'>Username (Read Only)</p>
            <Input className='pointer-events-none text-muted-foreground' readOnly value={String(user.username)}/>
        </div>
        <Button>Save</Button>
    </div>
}