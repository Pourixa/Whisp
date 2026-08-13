export function makeurl(path:string)
{
    return import.meta.env.VITE_API_URL + path
}

export function makeOptions(method:string,body:Object)
{
    return {
        headers:{
            "Content-Type" : "application/json"
        },
        method:method,
        body:JSON.stringify(body)
    }
}