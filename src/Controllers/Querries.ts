import { Request, Response } from 'express';
import bcrypt, { genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Queries } from '../Models/querries';
dotenv.config()


export const createQuerry = async (req: Request, res: Response) => {
    const {  email,message } = req.body;


    try {
        const newquerry = new Queries({
            
            email,
            message,
        });

        await newquerry.save();
        res.status(201).json({ message: "Queries Created Successfully!", Queries: newquerry });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: "Failed to create the Queries" });
    }
};

export const deleteQuerry = async (req: Request, res: Response) => {
    let querry = Queries.deleteOne(
        { _id: req.params.id }     
    ) 
    if (!querry) {
        res.status(500).send({message:"Queries Not Found"});
      } else {
        res.status(200).send({message :"Queries deleted successfully"});
      }
};




export const updateQuerry = async (req: Request, res: Response) => {
    try {
        const querry = await Queries.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!querry) {
            return res.status(404).json({ message: "Queries not found" });
        }
        return res.status(200).json({ message: "Successfully Updated Queries", querry });
    } catch (error) {
        console.error("Error updating Queries:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getAllQuerry = async (req: Request, res: Response) => {
    try {
        const querry = await Queries.find(req.body);
        res.status(200).send(querry);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
};


export const FindOneQuerry = async (req: Request, res: Response) => {
    let querry = Queries.findOne(
        { _id: req.params.id }).then((err) => {
            if (!querry) {
                res.status(404).send("Queries Not Found")
            } else {
              res.status(200).send(querry);
            }
          }
    ) 
};
const QuerryController = {
    createQuerry,
    deleteQuerry,
    updateQuerry,
    getAllQuerry,
    FindOneQuerry,
  
};

export default QuerryController
