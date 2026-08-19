import { ChatAvatar } from '#components/avatar';
import { Input } from '#components/ui/input';
import { Spinner } from '#components/ui/spinner';
import { Textarea } from '#components/ui/textarea';
import { makeAuthReq } from '#lib/fetch';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';

export function ViewProfile() {
    const [user,setUser] =useState<null | any>(null)
    const token = localStorage.getItem("token") as string;
    const params = useParams()
    const nav = useNavigate()
    useEffect(() => {
        async function loadUser() {
            const res = await (
                await makeAuthReq("/user/"+params.username, token)
            ).json();      

            setUser(res);
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
        <ArrowLeft onClick={() => nav("/")} className='flex justify-centerv self-start items-center '/>
        <ChatAvatar src={user.avatar} name={user.name} isOnline={false} size={"lg"}/>
        <div className='grid gap-0.5'>
            <p className='pl-4'>Name</p>
            <Input  className='pointer-events-none' readOnly defaultValue={String(user.name)}/>
        </div>
        <div className='grid gap-0.5'>
            <p className='pl-4'>Bio</p>
            <Textarea className='pointer-events-none' readOnly defaultValue={String(user.about)}/>
        </div>
        
        <div className='grid gap-0.5'>
            <p className='pl-4'>Username</p>
            <Input className='pointer-events-none' readOnly value={String(user.username)}/>
        </div>
    </div>
}