import { Request, Response } from 'express';
import  Blog  from "../Models/Blogs";
import uploads from "../middleware/uploads/MulterUpload"
import multer from 'multer';
import uploadImageToCloudinary from '../cloudinary';
import Like from '../Models/Likes';


export const createBlog = async (req: Request, res: Response) => {
  try {
    const existingBlog = await Blog.findOne( req.body.title );
        if (existingBlog) {
            return res.status(400).json({ error: 'Blog with the same title already exists' });
        }
    uploads.single('file')(req, res, async (err: any) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Failed to upload the file' });
      }

        const fileResult = req.file ? await uploadImageToCloudinary(req.file) : null;
        const newBlog = new Blog({
          ...req.body,
          file: fileResult||null
        });

        await newBlog.save();

        res.status(201).json({ message: 'Blog Created Successfully!', newBlog });
     
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Failed to create the Blog' });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
      const deletedBlog = await Blog.deleteOne({ _id: req.params.id });
      if (deletedBlog.deletedCount === 0) {
          return res.status(404).json({ error: 'Blog not found' });
      }
      res.status(200).send("Successfully Deleted Blog");
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateBlog = async (req: Request, res: Response) => {
  try {
    uploads.single('file')(req, res, async (err: any) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Failed to upload the file' });
      }

      try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }

        blog.title = req.body.title || blog.title;
        blog.description = req.body.content || blog.description;

        if (req.file) {
          const fileResult = await uploadImageToCloudinary(req.file);
          blog.file = fileResult;
        }

        const updatedBlog = await blog.save();

        res.status(200).json({ message: 'Blog Updated Successfully!', updatedBlog });
      } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ error: 'Failed to update the blog' });
      }
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Failed to update the Blog' });
  }
};

export const getAllBlog = async (req: Request, res: Response) => {
  try {
      const blogs = await Blog.find(req.body).populate('comments');
      const blogsWithLikeCount = await Promise.all(
          blogs.map(async (blog) => {
              const likeCount = await Like.countDocuments({ blogId: blog._id });
              return { ...blog.toObject(), likeCount };
          })
      );
      res.status(200).json(blogsWithLikeCount);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const FindOneBlog = async (req: Request, res: Response) => {
  try {
      const blog = await Blog.findOne({ _id: req.params.id }).populate('comments');
      if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
      }
      const likeCount = await Like.countDocuments({ blogId: blog._id });
      res.status(200).json({ ...blog.toObject(), likeCount });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const BlogControllers = {
    createBlog,
    deleteBlog,
    updateBlog,
    getAllBlog,
    FindOneBlog
};

export default BlogControllers
