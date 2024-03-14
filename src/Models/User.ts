import { Schema, model } from "mongoose";

interface IntUser {
    name: string;
    email: string;
    password: string;
    role: string;
    __v?: number; 
    createdAt?: Date; 
    updatedAt?: Date;
}

const Userchema = new Schema<IntUser>({
    name: {
        type: String,
        required: [true, "name should not be empty!"]
    },

    email: {
        type: String,
        required: [true, "email should not be empty!"]
    },

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