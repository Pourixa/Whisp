export function makeurl(path:string)
{
    return import.meta.env.VITE_API_URL + path
}

export function makeOptions(method:string, body:object)
{
    return {
        headers:{
            "Content-Type" : "application/json"
        },
        method:method,
        body:JSON.stringify(body)
    }
}

export async function makeAuthReq(path:string,token:string,method = "get",body?:any)
{
    if (body) 
        {
            return await fetch(makeurl(path),{
            headers:{
                "Content-Type" : "application/json",
                "authorization" : "Bearer " + token
            },
            method:method,
            body:JSON.stringify(body)
        })
        }
    return await fetch(makeurl(path),{
        headers:{
            "Content-Type" : "application/json",
            "authorization" : "Bearer " + token
        },
        method:method,
    })
}