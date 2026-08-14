import { Logo } from "#components/logo";
import { Input } from "#components/ui/input";
import { Button } from "#components/ui/button";
import { useState } from "react";
import type { MouseEvent } from "react";
import { Notif } from "#components/Alert";
import {makeOptions, makeurl } from "#lib/fetch";
import { Navigate, useNavigate } from "react-router";

export function Login() {
    const [user,setUser] = useState("")
    const [pass,setPass] = useState("")
    const [error,setError] = useState({message:"",type:""})
    const [loading,setLoading] = useState(false)
    const nav = useNavigate()
    async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        setLoading(true)
        const res = await fetch(makeurl("/user/login"),makeOptions("post",{
            username:user,
            password:pass
        }))
        if(res.ok)
        {
            setError({message:"Sign in Successful. \n Redirecting...",type:"Success"})
            setTimeout(() => {
                nav("/")
            },2000)
            localStorage.setItem("token" ,(await res.json()).token)
        } else {
            setError({message:(await res.json()).error ,type:"Danger"})
            setLoading(false)
        }
    }
     const token  = localStorage.getItem("token")
    if(token)
        return <Navigate to={"/"}/>
    return <div className="flex flex-col relative p-4 items-center justify-center h-dvh">
        <Notif data={error}/>
        <div className="grid gap-4">
        <Logo classname="pl-2"/>
        <Input minLength={5} required className="m-0.5 focus:placeholder:block focus:placeholder:text-xs focus:placeholder:-translate-y-full placeholder:transition-all p-5 pt-7 pb-7 placeholder:pb-1" onChange={(e) => setUser(e.target.value)} placeholder="Username"/>
        <Input type="password" onChange={(e) => setPass(e.target.value)} required minLength={8} className="m-0.5 focus:placeholder:block focus:placeholder:text-xs focus:placeholder:-translate-y-full p-5 pt-7 pb-7 placeholder:transition-all placeholder:pb-1" placeholder="Password"/>
        <Button disabled={ loading || user.length < 5 || pass.length < 8 ? true : false } className={"disabled:pointer-events-none"} onClick={e => handleSubmit(e)}>Sign In</Button>
        <a href="/signup" className="font-semibold">
            New to Whisp? Sign up now.
        </a> 
        </div>       
    </div>
}