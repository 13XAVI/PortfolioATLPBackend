import { Request, Response } from 'express';
import { Blog } from "../Models/Blogs";
import multer from "multer"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Myploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const uploads = multer({ storage: storage });
  
  export const createBlog = async (req: Request, res: Response) => {
    uploads.single('image')(req, res, async (err: any) => {
      if (err instanceof multer.MulterError) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to upload file' });
      } else if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred', err });
      }
  
      const newBlog = new Blog(req.body);
      try {
        await newBlog.save();
        res.status(201).json({ message: 'Blog Created Successfully!', newBlog });
      } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create the Blog' });
      }
    });
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
