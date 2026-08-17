import { Badge } from "#components/ui/badge";
import { Separator } from "#components/ui/separator";
function Tabs({selected,setSelected} : {selected:String,setSelected:React.Dispatch<React.SetStateAction<string>>})
{
          return <div className="flex gap-2 p-4 justify-center">
        <Badge className="hover:cursor-pointer" onClick={() => {
          (document.querySelector("#search") as HTMLElement).focus()
          setSelected("search")
          }} variant={selected === "search" ? "default" : "outline"}>
          Search
        </Badge>
        <Badge className="hover:cursor-pointer" onClick={() => setSelected("friends")} variant={selected === "friends" ? "default" : "outline"}>
          Friends
        </Badge>
        <Separator orientation="vertical"/>
        <Badge className="hover:cursor-pointer" onClick={() => setSelected("all")} variant={selected === "all" ? "default" : "outline"}>
          All
        </Badge>
        <Badge className="hover:cursor-pointer" onClick={() => setSelected("groups")} variant={selected === "groups" ? "default" : "outline"}>
          Groups
        </Badge>
      </div>
}

export {Tabs}