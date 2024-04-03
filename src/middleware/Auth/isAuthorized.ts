import dotenv from 'dotenv'
import { NextFunction,Response,Request } from "express";
import jwt from 'jsonwebtoken'
dotenv.config()
export interface CustomRequest extends Request {
    userData?: {
        userId: string;
        role: string;
        isAdmin: "admin";
        isUser:"user";
    };
}

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {

    
    if (req.userData && req.userData.role === "admin") {
        next();
    } else {
        res.status(403).json({
            message: "Authentication failed. User is not an admin."
        });
    }
};

export const isUser = (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log("User Data:", req.userData);
    
    if (req.userData && req.userData.role === "user") {
        next(); 
    } else {
        res.status(403).json({
            message: "Authentication failed. User is not a user."
        });
    }
};


const  isAuthorized = {
    isAdmin,isUser
}
export default isAuthorized

    