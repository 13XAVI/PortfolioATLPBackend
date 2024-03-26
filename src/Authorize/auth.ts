import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    userData?: { [key: string]: any }; 
}

const middleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        let token = null
         token = authHeader && authHeader.split(" ")[1];
        if (!authHeader) {
            throw new Error('Auth header not found');
        }

        if (!token) {
            throw new Error('Token not found in header');
        }

        const decode = jwt.verify(token, process.env.SECRETE_KEY as string) as { [key: string]: any };
        console.log(decode,"daata");

        req.userData = decode;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: {
                error :error,
                message:"Auth  failed "
            }
        });
    }
};

export default middleware;
