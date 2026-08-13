import { Alert, AlertDescription, AlertTitle } from "#components/ui/alert";
import { AlertCircleIcon, Verified } from "lucide-react";

export function Notif({data} : {data : {type: string | "Danger" | "Success",message:string}}) {

    if(data.type === "Success")
    {
        return <Alert className=" absolute text-green-600 border-green-600 top-20 w-9/10">
            <Verified/>
            <AlertTitle>
                Success
            </AlertTitle>
            <AlertDescription className="text-green-600">
                {data.message}
            </AlertDescription>
        </Alert>
    } else if(data.type === "Danger")
    {
        return <Alert variant={"destructive"} className="absolute top-20 w-9/10 border-destructive">
            <AlertCircleIcon/>
            <AlertTitle>
                Error
            </AlertTitle>
            <AlertDescription>
                {data.message}
            </AlertDescription>
        </Alert>
    }
}