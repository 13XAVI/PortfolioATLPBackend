import { Request, Response } from 'express';
import   Like  from "../Models/Likes"; 


export const createLike = async (req: Request, res: Response) => {
    try {
        const { commentId, userId } = req.body;
        const newLike = await Like.create({ commentId, userId });
        res.status(201).json({ message: 'Like Created Successfully!', newLike });
    } catch (error) {
        console.error('Error creating like:', error);
        res.status(500).json({ error: 'Failed to create like' });
    }
};


export const deleteLike = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedLike = await Like.findByIdAndDelete(id);
        if (!deletedLike) {
            res.status(404).json({ message: 'Like not found' });
        } else {
            res.status(200).json({ message: 'Like deleted successfully', deletedLike });
        }
    } catch (error) {
        console.error('Error deleting like:', error);
        res.status(500).json({ error: 'Failed to delete like' });
    }
};


export const getAllLikes = async (req: Request, res: Response) => {
    try {
        const likes = await Like.find();
        res.status(200).json(likes);
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ error: 'Failed to fetch likes' });
    }
};

export const getLikeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const like = await Like.findById(id);
        if (!like) {
            res.status(404).json({ message: 'Like not found' });
        } else {
            res.status(200).json(like);
        }
    } catch (error) {
        console.error('Error fetching like by ID:', error);
        res.status(500).json({ error: 'Failed to fetch like' });
    }
};


export const updateLike = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { commentId, userId } = req.body;
        const updatedLike = await Like.findByIdAndUpdate(id, { commentId, userId }, { new: true });
        if (!updatedLike) {
            res.status(404).json({ message: 'Like not found' });
        } else {
            res.status(200).json({ message: 'Like updated successfully', updatedLike });
        }
    } catch (error) {
        console.error('Error updating like:', error);
        res.status(500).json({ error: 'Failed to update like' });
    }
};


const LikeController = {
    createLike,
    deleteLike,
    updateLike,
    getAllLikes,
    getLikeById
};

export default LikeController

