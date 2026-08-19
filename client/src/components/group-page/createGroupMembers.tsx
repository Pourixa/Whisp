
import { ArrowLeft, Search } from "lucide-react"
import { EmptyChatList } from "#components/chat-list/emptychatList";
import { GroupSearch } from "#components/group-page/groupuser";
import { Separator } from "#components/ui/separator";
import { useOutletContext } from "react-router";
import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
export function CreateGroupMembers() {
    
    const {nav,result,setSearchQuery,selectedUsers,setSelectedUsers} = useOutletContext<any>()
    return <>
        <div className="flex justify-between w-full">
              <div className="self-baseline flex gap-3">
                  <ArrowLeft onClick={() => nav("/")} className='flex w-fit items-center '/>
                  <h4>Create a new group</h4>
              </div>
             <Button onClick={() => nav("creategroup/details")}>Next</Button>
            </div>
            <div className="flex items-center p-4 gap-2">
              <Search/>
              <Input onChange={e => setSearchQuery(e.target.value)} id="search" type="text" placeholder="Search"/>
            </div>
            <div className="@container flex flex-col w-full gap-0.5 p-0.5">
        {selectedUsers.map((res:any,idx:any) => {
                return <GroupSearch setSelected={setSelectedUsers} isAdded={true}  user={res} key={idx} />})}
            </div>
            <Separator className={"mb-2 mt-2"}/>
             <main className="@container flex flex-col w-full gap-0.5 p-0.5">
                    {result?.length > 0 ? result.map((res:any,idx:any) => {
                    if(selectedUsers.filter((u:any) => u.username === res.username).length <= 0 )
                      return <GroupSearch setSelected={setSelectedUsers} isAdded={false}  user={res} key={idx} />
                    }) : <EmptyChatList text="Search for some whisperers"/>}
                  </main>
    </>
}