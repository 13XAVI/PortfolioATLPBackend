import { Schema, model } from "mongoose";

interface IntBlog {
    title: string,
    description: string,
    date: Date
    file:string
}

const Blogchema = new Schema<IntBlog>({
    title: {
        type: String,
        required: [true, "Title should not be empty!"]
    },
    file:{
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

export default model<IntBlog>('Blog', Blogchema);