import { Button } from '#components/ui/button';
import { Input } from '#components/ui/input';
import { Textarea } from '#components/ui/textarea';
import { makeAuthReq } from '#lib/fetch';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router';


const MAX_ABOUT_CHARS = 50
const MAX_NAME_CHARS = 25
export function CreateGroupDetails() {
    const {nav} = useOutletContext<any>()
    const [group,setgroup] =useState<null | any>(null)
    const [AboutChars,setAboutChars] = useState<string>("")
    const [nameChars,setNameChars] = useState<string>("")
    const token = localStorage.getItem("token") as string;
    const [buttonText,setButtonText] = useState("Create")
    return <div className='grid  items-center h-dvh p-4'>
        <div className='flex gap-2'>
            <ArrowLeft onClick={() => nav("/creategroup")} className='flex justify-center items-center '/>
            <h4>Select Members</h4>
        </div>
        <div className='grid gap-0.5'>
            <p className='pl-4'>Name</p>
            <Input maxLength={MAX_NAME_CHARS} value={nameChars} onChange={(e) => {
                return setNameChars(e.target.value)
            }}/>
            <span className='justify-self-end pr-2'>{nameChars?.length ?? 0} / {MAX_NAME_CHARS} </span>
        </div>
        <div className='grid gap-0.5'>
            <p className='pl-4'>Bio</p>
            <Textarea maxLength={MAX_ABOUT_CHARS} value={AboutChars} onChange={(e) => {
                return setAboutChars(e.target.value)
            }}/>
            <span className='justify-self-end pr-2'>{AboutChars?.length ?? 0} / {MAX_ABOUT_CHARS} </span>
        </div>
        
        <Button onClick={async () => 
            {
            setButtonText("Updating...")     
            const data:any = {}
            data.about = AboutChars    
            data.name = nameChars    

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
        } disabled={buttonText != "Create"}  className={`${buttonText === "Creation Failed" ? "bg-destructive" : buttonText==="Success. Redirecting..." ? "bg-green-600" : ""}`}>{buttonText}</Button>
    </div>
}