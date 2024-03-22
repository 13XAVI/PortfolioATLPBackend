import { Schema, model } from "mongoose";


interface Likes{
    id?: number;
    commentId?: number;
    userId?: number;

}

const LikeSchema = new Schema<Likes>({
    id: {
        type: Number,
        required: [true, "Id should not be empty!"]
    },

    commentId: {
        type: Number,
        required: [true, "CommentId should not be empty!"]
    },

    userId:{
        type:String,
        required:[true," User Id should not be empty!"]
    },
  
    
}, { timestamps: true});

export default model<Likes>('Likes', LikeSchema);