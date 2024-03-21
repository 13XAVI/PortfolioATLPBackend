import { Schema,model } from "mongoose";

interface Comments{
    message: string;
    __v?: number; 
    createdAt?: Date; 
    updatedAt?: Date;
}