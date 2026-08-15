import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import type { Socket } from "socket.io"

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

export function authenticateUserOnSocket(socket: Socket, next: (err?: Error) => void) {
    const token = socket.handshake.auth.token

    if (!token) return next(new Error("Unauthorized"))
    const secret = process.env.JWT_SECRET as string
    try {
        const payload = jwt.verify(token, secret)
        socket.data.user = payload
        return next()
    } catch (err) {
        return next(new Error("Forbidden"))
    }
}