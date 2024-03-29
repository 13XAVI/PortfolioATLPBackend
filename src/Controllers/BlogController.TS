import { Request, Response } from 'express';
import  Blog  from "../Models/Blogs";
import uploads from "../middleware/uploads/MulterUpload"
import multer from 'multer';
import uploadImageToCloudinary from '../cloudinary';


export const createBlog = async (req: Request, res: Response) => {
  try {

    uploads.single('file')(req, res, async (err: any) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Failed to upload the file' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      try {
       
        const fileResult = await uploadImageToCloudinary(req.file);
        const newBlog = new Blog({
          ...req.body,
          file: fileResult
        });

        await newBlog.save();

        res.status(201).json({ message: 'Blog Created Successfully!', newBlog });
      } catch (uploadError) {
        console.error('Error uploading image to Cloudinary:', uploadError);
        res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
      }
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Failed to create the Blog' });
  }
};




export const deleteBlog = async (req: Request, res: Response) => {
    let blog = Blog.deleteOne(
        { _id: req.params.id }, (err: any) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).send("Successfully Deleted Blog");
            }
          }
    ) 
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    // Handle file upload if any
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
        const Blogs = await Blog.find(req.body);
        res.status(200).send(Blogs);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};


export const FindOneBlog = async (req: Request, res: Response) => {
    let blog = Blog.findOne(
        { _id: req.params.id }).then((data) => {
            if (!data) {
                res.status(500).send({msg:data})
            } else {
              res.status(200).send(blog);
            }
          }
    ) 
};
const BlogController = {
    createBlog,
    deleteBlog,
    updateBlog,
    getAllBlog,
    FindOneBlog
};

export default BlogController
