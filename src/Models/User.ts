import { Schema, model } from "mongoose";

interface IntUser {
    file:string
    name: string;
    email: string;
    password: string;
    role: string;
    __v?: number; 
    createdAt?: Date; 
    updatedAt?: Date;
}

const Userchema = new Schema<IntUser>({
    file:{
        type:String
    },
    name: {
        type: String,
        required: [true, "name should not be empty!"]
    },

    email: { type: String, required: [true, "email should not be empty!"], unique: true },


    password:{
        type:String,
        required:[true,"Enter Password"]
    },
    role:{
        type:String,
        required:[true,"Enter Role"]
    }
    
}, { timestamps: true});

export const User = model<IntUser>('User', Userchema);