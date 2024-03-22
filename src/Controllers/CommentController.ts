import { Request, Response } from 'express';
import  Comments  from "../Models/Comments";

export const createComment = async (req: Request, res: Response) => {
    try {
        const { blogId, message, userId } = req.body;
        const newComment = await Comments.create({ blogId, message, userId });
        res.status(201).json({ message: 'Comment Created Successfully!', newComment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to Add Comment' });
    }
};

export const getCommentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comment = await Comments.findById(id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
        } else {
            res.json(comment);
        }
    } catch (error) {
        console.error('Error fetching comment by ID:', error);
        res.status(500).json({ error: 'Failed to fetch comment' });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { blogId, message, userId } = req.body;
        const updatedComment = await Comments.findByIdAndUpdate(id, { blogId, message, userId }, { new: true });
        if (!updatedComment) {
            res.status(404).json({ message: 'Comment not found' });
        } else {
            res.status(200).json({ message: 'Comment updated successfully', updatedComment });
        }
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ error: 'Failed to update comment' });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comments.findByIdAndDelete(id);
        if (!deletedComment) {
            res.status(404).json({ message: 'Comment not found' });
        } else {
            res.status(200).json({ message: 'Comment deleted successfully', deletedComment });
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};

export const getAllComments = async (req: Request, res: Response) => {
    try {
        const comments = await Comments.find();
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching all comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

const CommentController = {
    createComment,
    getCommentById,
    updateComment,
    deleteComment,
    getAllComments
};

export default CommentController;
