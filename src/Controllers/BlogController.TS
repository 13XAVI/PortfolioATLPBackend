import { Request, Response } from 'express';
import  Blog  from "../Models/Blogs";
import uploads from "../middleware/MulterUpload"
import multer from 'multer';
import uploadImageToCloudinary from '../cloudinary';


export const createBlog = async (req: Request, res: Response) => {
  try {

    uploads.single('imageUrl')(req, res, async (err: any) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Failed to upload the file' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      try {
        const imageUrl = await uploadImageToCloudinary(req.file.path);
        const newBlog = new Blog({
          ...req.body,
          imageUrl: imageUrl
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

    uploads.single('image')(req, res, async (err: any) => {
      if (err instanceof multer.MulterError) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to upload file' });
      } else if (err) {

        console.error(err);
        return res.status(500).json({ error: 'An error occurred' });
      }
  
      try {
        const blogId = req.params.id;
        const updatedBlogData = req.body;
  
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedBlogData, { new: true });
  
      
        // if (req.file) {
        //   updatedBlog.image = req.file.path; 
        //   await updatedBlog.save();
        // }
  
        res.status(200).json({ message: 'Blog updated successfully', updatedBlog });
      } catch (err: any) {
        console.error('Error updating blog:', err);
        res.status(500).json({ error: 'Failed to update the blog' });
      }
    });
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
