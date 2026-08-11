import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "#components/ui/dropdown-menu";
import {Filter} from"lucide-react"

function FilterMenu ({filter,setFilter} : {filter:String,setFilter:React.Dispatch<React.SetStateAction<string>>}) 
{
    return <DropdownMenu>
            <DropdownMenuTrigger render={<Filter/>}/>
            <DropdownMenuContent>
            <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
              <DropdownMenuRadioItem value="online">
                Online
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="asc">
                A → Z
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="des">
                Z → A
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
}

export {FilterMenu}