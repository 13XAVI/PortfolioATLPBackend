import { Schema, model, Document } from "mongoose";

interface Comments {
    id: number;
    blogId: number;
    message: string;
    userId: number;
    __v?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const CommentSchema = new Schema<Comments>({
    id: {
        type: Number,
        required: [true, "id should not be empty!"]
    },
    blogId:{
        type:Number,
        required:[true,"BlogId Should not be empty"]
    },
    message: {
        type: String,
        required: [true, "message should not be empty!"]
    },
    userId:{
        type:Number,
        required:[true,"user Id should not be empty!"]
    }
}, { timestamps: true });

export default model<Comments>('Comment', CommentSchema);
