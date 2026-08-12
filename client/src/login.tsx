import { Logo } from "#components/logo";
import { Input } from "#components/ui/input";
import { Button } from "#components/ui/button";
import { useState } from "react";

export function Login() {
    const [lenUser,setLenUser] = useState(0)
    const [lenPass,setLenPass] = useState(0)
    function handleSubmit() {

    }
    return <div className="flex flex-col  p-4 items-center justify-center h-dvh">
        <div className="grid gap-4">
        <Logo classname="pl-2"/>
        <Input minLength={5} required className="m-0.5 focus:placeholder:block focus:placeholder:text-xs focus:placeholder:-translate-y-full placeholder:transition-all p-5 pt-7 pb-7 placeholder:pb-1" onChange={(e) => setLenUser(e.target.value.length)} placeholder="Username"/>
        <Input type="password" onChange={(e) => setLenPass(e.target.value.length)} required minLength={8} className="m-0.5 focus:placeholder:block focus:placeholder:text-xs focus:placeholder:-translate-y-full p-5 pt-7 pb-7 placeholder:transition-all placeholder:pb-1" placeholder="Password"/>
        <Button disabled={(lenUser > 5 && lenPass > 8) ? false : true} className={"disabled:pointer-events-none"}>Sign In</Button>
        <a href="/signup" className="font-semibold">
            New to Whisp? Sign up now.
        </a> 
        </div>       
    </div>
}