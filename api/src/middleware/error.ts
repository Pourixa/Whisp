import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { NextFunction, Request, Response } from "express";
import { message } from '../generated/prisma/client';

type CustomError =  {
    message:string,
    code:number
}

export function errorHandler(err:CustomError | Error | PrismaClientKnownRequestError ,req:Request,res:Response,next:NextFunction) {
    console.log(err)
    if(err instanceof PrismaClientKnownRequestError) {
        if(err.code === "P2002")
            return res.status(409).json({ error: "Duplicate key" });
        else if (err.code == "P2025") 
            return res.status(404).json({error:" Not found "})
        else
            return res.status(500).json({error:" Something went wrong "})
    } 
    else if (err instanceof Error)
        return res.status(500).json({error :"Something went wrong"})
    return res.status(err.code).json({error :err.message})
}