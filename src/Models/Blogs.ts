import { Schema, model,Document, Types} from "mongoose";

 interface IntBlog extends Document {
    title: string,
    description: string,
    date: Date
    file:string
    likes: Array<any>; 
    comments: Array<any>; 
}

const Blogchema = new Schema<IntBlog>({
    
    title: {
        type: String,
        required: [true, "Title should not be empty!"],
        unique:true, 
    },
    file:{
        type:String,
        required:false
    },

    description: {
        type: String,
        required: [true, "Body should not be empty!"]
    },

    date: {
        type: Date,
        default: Date.now()
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }], 
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

    
}, { timestamps: true});

export default model<IntBlog>('Blog', Blogchema);