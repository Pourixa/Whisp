import express from "express"
import { authenticateUser, authReq } from '../middleware/auth';
import db from "../db"
import { validateCredentials } from "../middleware/inputValidation";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { io } from "..";

const userRouter = express.Router()

userRouter.get("/",authenticateUser,async (req:authReq, res,next) => {
    try {
    const user = await db.user.findUnique({
      where:{
        username:req.user.username
    }, 
include: {
        chats: {
          include: {
            messages: {
              orderBy: {
                dateCreated: 'desc' 
              }
            },
            members:{
                where: {
                    username:{
                        not:req.user.username,
                    }
                },
                include:{
                    sentRequests:{
                        where:{
                            receiverUsername:req.user.username
                        }
                    },
                    receivedRequests:{
                        where:{
                            senderUsername:req.user.username
                        }
                    }
                },
                omit:{
                    password:true,
                }
            },      
          }
        }
      },
    omit:{
        password:true,
    }})
    res.json(user)
} catch (e) {
    next(e)
}
})

userRouter.get("/search",authenticateUser,async (req:authReq,res) => {
    const q = req.query.q as string
    res.json(
        await db.user.findMany(
            {
                where:
                {
                    username:{
                        not:req.user.username,
                        contains:q
                    },
                },
                include:
                {
                    receivedRequests:{
                        where:{
                            senderUsername:req.user.username
                        }
                    },
                    sentRequests:{
                        where:{
                            receiverUsername:req.user.username
                        }
                    }
                },
                take:10
            }
        )
    )
})


userRouter.post("/signup",validateCredentials as any , async (req,res,next) => {
    try {
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(req.body.password, salt)
    const user = await db.user.create({
        data:{
            username:req.body.username,
            password: hashed,
            name:req.body.username
        }
    })
    const token = jwt.sign({
        username:user.username,
    } , process.env.JWT_SECRET as string)
    res.status(201).json({ token :  token})
    } catch(e) {
        next(e)
    }
})

userRouter.post("/login" , validateCredentials as any , async (req:authReq,res,next) => {
    try {
        const user = await db.user.findUnique({
            where: 
            {
                username:req.body.username,
            }
        })
        if(!user)
           return next({message:"Username or Password is wrong." , code:404})        
        if(await bcrypt.compare(req.body.password,user.password))
            return res.status(202).json({token:jwt.sign({username:user.username},process.env.JWT_SECRET as string)})
        else
            return next({message:"Username or Password is wrong." , code:404})
    } catch(e) {
        next(e)
    }
})

export default userRouter