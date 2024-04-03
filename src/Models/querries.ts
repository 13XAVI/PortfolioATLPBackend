import { Schema, model } from "mongoose";

interface IntQuery {
    email: string;
    message: string;
    createdAt?: Date; 
    updatedAt?: Date;
}

const Querychema = new Schema<IntQuery>({
    email: {
        type: String,
        required: [true, "name should not be empty!"]
    },

    message: {
        type: String,
        required: [true, "email should not be empty!"]
    },

    
}, { timestamps: true});

export const Queries = model<IntQuery>('Queries', Querychema);