import { Button } from '#components/ui/button';
import { Input } from '#components/ui/input';
import { makeAuthReq } from '#lib/fetch';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router';


const MAX_NAME_CHARS = 25
export function CreateGroupDetails() {
    const {nav,selectedUsers} = useOutletContext<any>()
    const [nameChars,setNameChars] = useState<string>("")
    const token = localStorage.getItem("token") as string;
    const [buttonText,setButtonText] = useState("Create")
    return <div className='grid  items-center h-dvh p-4 w-full'>
        <div className='flex gap-2  self-start'>
            <ArrowLeft onClick={() => nav("/creategroup")} className='flex justify-center items-center '/>
            <h4>Select Members</h4>
        </div>
        <div className='grid gap-0.5 justify-self-center'>
            <p className='pl-4'>Name</p>
            <Input maxLength={MAX_NAME_CHARS} value={nameChars} onChange={(e) => {
                return setNameChars(e.target.value)
            }}/>
            <span className='justify-self-end pr-2'>{nameChars?.length ?? 0} / {MAX_NAME_CHARS} </span>
        </div>
        
        <Button onClick={async () => 
            {
            setButtonText("Creating...")     
            const data:any = {}
            data.name = nameChars    
            data.users = selectedUsers
            const res = await makeAuthReq("/creategroup",token,"post",data)
        console.log(res)
        if(!res.ok){
            setButtonText("Creation Failed")
            return setTimeout(() => {
                setButtonText("Create")
            }, 2000);
        }
        setButtonText("Success. Redirecting...")
        return setTimeout(() => {
            nav("/")
        }, 2000)
         }
        } disabled={buttonText != "Create" || nameChars.length < 3}  className={`${buttonText === "Creation Failed" ? "bg-destructive" : buttonText==="Success. Redirecting..." ? "bg-green-600" : ""} justify-self-center`}>{buttonText}</Button>
    </div>
}