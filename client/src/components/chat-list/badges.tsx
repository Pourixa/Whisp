import { Badge } from "#components/ui/badge";
import { Separator } from "#components/ui/separator";
function Tabs({selected,setSelected} : {selected:String,setSelected:React.Dispatch<React.SetStateAction<string>>})
{
          return <div className="flex gap-2 p-4 justify-center">
        <Badge onClick={() => setSelected("phone")} variant={selected === "phone" ? "default" : "outline"}>
          Phone Book
        </Badge>
        <Separator orientation="vertical"/>
        <Badge onClick={() => setSelected("all")} variant={selected === "all" ? "default" : "outline"}>
          All
        </Badge>
        <Badge onClick={() => setSelected("groups")} variant={selected === "groups" ? "default" : "outline"}>
          Groups
        </Badge>
        <Badge onClick={() => setSelected("friends")} variant={selected === "friends" ? "default" : "outline"}>
          Friends
        </Badge>
      </div>
}

export {Tabs}