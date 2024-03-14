import { Request, Response } from 'express';
import { User, } from "../Models/User";

import CryptoJs from "crypto-js"
import jwt from 'jsonwebtoken'



export const createUser = async (req: Request, res: Response) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password,process.env.SECRETE_KEY as string).toString(),
        role:req.body.role
    });
    try {
        await newUser.save();
        res.status(201).json({ message: "User Created Successfully!",user:newUser });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: "Failed to create the user" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    let user = User.deleteOne(
        { _id: req.params.id }, (err: any) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).send("Successfully Deleted User");
            }
          }
    ) 
};



export const LoginUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(401).send({ msg: "Unauthorized user" });
        }

        const decryptedPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY as string).toString(CryptoJs.enc.Utf8);
        
        if (decryptedPassword !== req.body.password) {
            return res.status(401).send("Password does not match");
        }

        const userToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, { expiresIn: "7d" });

        const { password, __v, createdAt, updatedAt, ...userData } = user.toObject(); // Convert user document to plain JavaScript object
        res.status(200).json({ ...userData, token: userToken });
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        res.status(500).send(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    let user = User.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err:any,user:any)=>{
            if(err){
                res.status(500).send(err)
            }else{
                res.status(201).send({message:"Successfully Updated User",user})
            }
        }
    ) 
};

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await User.find(req.body);
        res.status(200).send(users);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};


export const FindOneUser = async (req: Request, res: Response) => {
    let user = User.findOne(
        { _id: req.params.id }).then((err) => {
            if (err) {
                res.status(500).send(err)
            } else {
              res.status(200).send(user);
            }
          }
    ) 
};
const UserController = {
    createUser,
    deleteUser,
    updateUser,
    getAllUser,
    FindOneUser,
    LoginUser
};

export default UserController
