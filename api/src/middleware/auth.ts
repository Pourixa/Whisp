import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export interface authReq extends Request {
    user?:any
}

export function authenticateUser(req: authReq, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]

    if (!token) return res.status(401).json({ message: "Unauthorized" })
    const secret = process.env.JWT_SECRET as string
    try {
        const payload = jwt.verify(token, secret)
        req.user = payload
        return next()
    } catch (err) {
        return res.status(403).json({ message: "Forbidden" })
    }
}