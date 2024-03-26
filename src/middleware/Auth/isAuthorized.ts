import  dotenv from "dotenv"
import { FORBIDDEN } from "http-status";
import { NextFunction,Response,Request } from "express";
import { dot } from "node:test/reporters";
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
    console.log("User Data:", req.userData);
    
    if (req.userData && req.userData.role === "admin") {
        next();
    } else {
        res.status(FORBIDDEN).json({
            message: "Authentication failed. User is not an admin."
        });
    }
};

export const isUser = (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log("User Data:", req.userData);
    
    if (req.userData && req.userData.role === "admin") {
        next(); 
    } else {
        res.status(FORBIDDEN).json({
            message: "Authentication failed. User is not an admin."
        });
    }
};


const  isAuthorized = {
    isAdmin,isUser
}
export default isAuthorized

    