import { BsWind } from "react-icons/bs";

export function Logo({classname} : {classname:string}) {
    return <div className={classname}>
            <BsWind />
            <h1 className="flex items-center">Whisp</h1>
          </div>
}