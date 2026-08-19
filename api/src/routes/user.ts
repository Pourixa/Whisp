import express from "express"
import { authenticateUser, authReq } from '../middleware/auth.js';
import db from "../db.js"
import { validateCredentials } from "../middleware/inputValidation.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import multer from "multer";
import { createClient } from '@supabase/supabase-js'
import prisma from "../db.js";

const supabase = createClient(process.env.PROJECT_URL as string, process.env.ACCESS_TOKEN as string)
const upload = multer({storage: multer.memoryStorage()})
const messageImageUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }
})

const userRouter = express.Router()

userRouter.get("/",authenticateUser,async (req:authReq, res,next) => {
    try {
    const user = await db.user.findUnique({
      where:{
        username:req.user.username
    }, 
include: {
        sentRequests:{
            include:{
                receiver:{
                    omit:{
                        password:true
                    }
                }
            }
        },
        receivedRequests:{
            include:{
                sender:{
                    omit:{
                        password:true
                    }
                }
            }
        },
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

userRouter.post("/search",authenticateUser,async (req:authReq,res) => {
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
                omit:{
                    password:true
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

userRouter.post("/update",upload.single("photoSrc"),authenticateUser ,async (req:authReq,res,next) => {
    try {
        if(req.file){
        const { data, error } = await supabase.storage.from('avatars').upload(req.user.username+"-avatar",req.file.buffer,{
            upsert:true,
            contentType:req.file.mimetype
        })
        if(error)
            throw error
        const { data: publicUrl } = supabase.storage
        .from("avatars")
        .getPublicUrl(data.path)
        const avatarUrl = `${publicUrl.publicUrl}?v=${Date.now()}`
        await db.user.update({
            where:{
                username:req.user.username
            },
            data:{
                avatar: avatarUrl,
                about:req.body.about,
                name:req.body.name
            }

        })
        } else if(req.body.remove === "false") {
            await db.user.update({
            where:{
                username:req.user.username
            },
            data:{
                about:req.body.about,
                name:req.body.name
            }
        })
        }
        else {

        await db.user.update({
            where:{
                username:req.user.username
            },
            data:{
                avatar:"",
                about:req.body.about,
                name:req.body.name
            }
        })
        }
        res.json({message:"Profile updated"})
    } catch (e) {
        next(e)
    }
})

userRouter.post("/message-image",messageImageUpload.single("image"),authenticateUser ,async (req:authReq,res,next) => {
    try {
        if (!req.file || !req.file.mimetype.startsWith("image/"))
            return res.status(400).json({message:"A valid image is required"})

        const path = `${req.user.username}/${crypto.randomUUID()}-${req.file.originalname}`
        const { data, error } = await supabase.storage.from("messages").upload(path,req.file.buffer,{
            contentType:req.file.mimetype,
            upsert:false
        })
        if (error)
            throw error

        const { data: publicUrl } = supabase.storage.from("messages").getPublicUrl(data.path)
        res.json({imageSrc:publicUrl.publicUrl})
    } catch (e) {
        next(e)
    }
})


userRouter.get("/:username",authenticateUser , async (req:authReq,res,next) => {
    try{const user = await db.user.findUnique({
        where:{
            username:req.params.username as string,
        },
        omit:{
            password:true
        }
    })
    res.json(user)} catch(e) {
        next(e)
    }
})





export default userRouter