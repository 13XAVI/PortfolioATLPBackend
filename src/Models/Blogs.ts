import { Schema, model } from "mongoose";

interface IntBlog {
    title: string,
    description: string,
    date: Date
    image:string
}

const Blogchema = new Schema<IntBlog>({
    title: {
        type: String,
        required: [true, "Title should not be empty!"]
    },
    image:{
        type:String,
        required:[true,"Image file Is required"]
    },

    description: {
        type: String,
        required: [true, "Body should not be empty!"]
    },

    date: {
        type: Date,
        default: Date.now()
    }
    
}, { timestamps: true});

export const Blog = model<IntBlog>('Blog', Blogchema);