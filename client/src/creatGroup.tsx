import { EmptyChatList } from "#components/chat-list/emptychatList";
import { UserSearch } from "#components/chat-list/user";
import { GroupSearch } from "#components/group-page/groupuser";
import { Input } from "#components/ui/input";
import { Separator } from "#components/ui/separator";
import { makeAuthReq } from "#lib/fetch";
import { ArrowLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


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
        <div className="self-baseline flex gap-3">
            <ArrowLeft onClick={() => nav("/")} className='flex w-fit items-center '/>
            <h4>Create a new group</h4>
        </div>
        <div className="flex items-center p-4 gap-2">
          <Search/>
          <Input onChange={e => setSearchQuery(e.target.value)} id="search" type="text" placeholder="Search"/>
        </div>
        <div className="@container flex flex-col w-full gap-0.5 p-0.5">
    {selectedUsers.map((res,idx) => {
            return <GroupSearch setSelected={setSelectedUsers} isAdded={true}  user={res} key={idx} />})}
        </div>
        <Separator className={"mb-2 mt-2"}/>
         <main className="@container flex flex-col w-full gap-0.5 p-0.5">
                {result?.length > 0 ? result.map((res:any,idx) => {
                if(selectedUsers.filter((u:any) => u.username === res.username).length <= 0 )
                  return <GroupSearch setSelected={setSelectedUsers} isAdded={false}  user={res} key={idx} />
                }) : <EmptyChatList text="Search for some whisperers"/>}
              </main>
    </div>
}