import { Request, Response } from 'express';
import { User, } from "../Models/User";
import bcrypt, { genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


const secretKey = process.env.SECRETE_KEY as string;

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    const saltRounds = 10; 

    try {
        
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        res.status(201).json({ message: "User Created Successfully!", user: newUser });
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
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

       const  hasUserPass =  await bcrypt.hash(req.body.password,10)
        const passwordMatch = await bcrypt.compare(password,hasUserPass);

        if (!passwordMatch) {
            return res.status(401).send("Password does not match");
        }
        const userToken = jwt.sign({ id: user.id,role:user.role }, secretKey as string, { expiresIn: "7d" });

        const { password: _, __v, createdAt, updatedAt, ...userData } = user.toObject();
        res.status(200).json({ ...userData, token: userToken });
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        res.status(500).send(error);
    }
};



export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Successfully Updated User", user });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await User.find(req.body);
        res.status(200).send(users);
    } catch(err) {
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
