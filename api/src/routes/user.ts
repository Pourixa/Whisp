import express from "express"
import { authenticateUser, authReq } from '../middleware/auth';
import db from "../db"
import { validateCredentials } from "../middleware/inputValidation";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const userRouter = express.Router()

userRouter.get("/",authenticateUser,async (req:authReq, res,next) => {
    try {
    const user = db.user.findUnique({
      where:{
        username:req.user.username
    }, 
    include:{
      chats:true
    }})
    
    res.json(user)
} catch (e) {
    next(e)
}
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
        console.log(req.body)
        console.log(await bcrypt.compare(req.body.password,user.password))
        if(await bcrypt.compare(req.body.password,user.password))
            return res.status(202).json({token:jwt.sign(user.username,process.env.JWT_SECRET as string)})
        else
            return next({message:"Username or Password is wrong." , code:404})
    } catch(e) {
        next(e)
    }
})

export default userRouter