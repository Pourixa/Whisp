import { ChatAvatar } from '#components/avatar';
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
    const [AboutChars,setAboutChars] = useState<null | string>(null)
    const [nameChars,setNameChars] = useState<null | string>(null)
    const [photoSrc,setPhotoSrc] = useState<null | any>(null)
    const [remove,setRemove] = useState<string>("false")
    const nav = useNavigate()
    const token = localStorage.getItem("token") as string;
    const [buttonText,setButtonText] = useState("Save")
    useEffect(() => {
        async function loadUser() {
            const res = await (
                await makeAuthReq("/user", token)
            ).json();      
            setUser(res);
            setAboutChars(res.about)
            setNameChars(res.name)
            setPhotoSrc(res.avatar)
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
                <label htmlFor='avatar' className="group/button inline-flex shrink-0 items-center justify-center rounded-2xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/80 h-8 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5">UPLOAD</label>
                <Input type='file' id='avatar' className='hidden' onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;
                setPhotoSrc(file)
                setRemove("false")
                setUser((prev: any) => ({
                    ...prev,
                    avatar: URL.createObjectURL(file),
                }));
            }} />
            {user.avatar != "" && <Button variant={"destructive"} onClick={() => {
                setRemove("true")
                setUser((prev:any) => ({...prev,avatar:""}))
            }}>Remove</Button>}
        </div>
        <div className='grid gap-0.5'>
            <p className='pl-4'>Name</p>
            <Input maxLength={MAX_NAME_CHARS} defaultValue={String(user.name)} onChange={(e) => {
                return setNameChars(e.target.value)
            }}/>
            <span className='justify-self-end pr-2'>{nameChars?.length ?? 0} / {MAX_NAME_CHARS} </span>
        </div>
        <div className='grid gap-0.5'>
            <p className='pl-4'>Bio</p>
            <Textarea maxLength={MAX_ABOUT_CHARS} defaultValue={String(user.about)} onChange={(e) => {
                return setAboutChars(e.target.value)
            }}/>
            <span className='justify-self-end pr-2'>{AboutChars?.length ?? 0} / {MAX_ABOUT_CHARS} </span>
        </div>
        
        <div className='grid gap-0.5'>
            <p className='pl-4'>Username (Read Only)</p>
            <Input className='pointer-events-none text-muted-foreground' readOnly value={String(user.username)}/>
        </div>
        <Button onClick={async () => 
            {
            setButtonText("Updating...")     
            const data = new FormData()
            data.append("about",AboutChars ?? "")    
            data.append("name",nameChars ?? "") 
            data.append("remove",remove)   
            data.append("photoSrc",photoSrc)  
            const res = await fetch(`${import.meta.env.VITE_API_URL}/user/update`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data,
        });
        if(!res.ok){
            setButtonText("Update Failed")
            return setTimeout(() => {
                setButtonText("Save")
            }, 2000);
        }
        setButtonText("Success. Redirecting...")
        return setTimeout(() => {
            nav("/")
        }, 2000)
         }
        } disabled={buttonText != "Save"}  className={`${buttonText === "Update Failed" ? "bg-destructive" : buttonText==="Success. Redirecting..." ? "bg-green-600" : ""}`}>{buttonText}</Button>
        <Button onClick={() => {localStorage.clear() , nav("/login")}} variant={'destructive'}>Logout</Button>
    </div>
}