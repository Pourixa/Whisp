
import { makeAuthReq } from "#lib/fetch";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";


export function CreateGroup() {
    const nav = useNavigate()
    const [result,setResult] = useState([])
    const [searchQuery,setSearchQuery] = useState<String>()
    const [selectedUsers,setSelectedUsers] = useState([])
    useEffect(() => {
          (async () => {const stream = await makeAuthReq("/user/search?q="+searchQuery,localStorage.token,"post",{})
          setResult(await stream.json())})()
      },[searchQuery])
    return <div className='flex flex-col  items-center h-dvh p-4'>
        <Outlet context={{nav,result,setSearchQuery,selectedUsers,setSelectedUsers}} />
    </div>
}