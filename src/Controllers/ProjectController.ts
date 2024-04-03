import { Request, Response } from 'express';
import { Projects, IntProject } from '../Models/projects';
import uploads from '../middleware/uploads/MulterUpload';
import uploadImageToCloudinary from '../cloudinary';

export const createProject = async (req: Request, res: Response) => {

    try {
        const existingProject = await Projects.findOne({ projectName: req.body.projectName });
        if (existingProject) {
            return res.status(400).json({ error: 'Project with the same name already exists' });
        }

        uploads.single('file')(req, res, async (err: any) => {
          if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).json({ error: 'Failed to upload the file' });
          }
          
            const fileResult = req.file ? await uploadImageToCloudinary(req.file) : null;
            const project = new Projects({
              ...req.body,
              file: fileResult||null
            });


    
            await project.save();
    
            res.status(201).json({ message: 'Project Created Successfully!', project });
         
        });
      } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Failed to create the Blog' });
      }


};

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Projects.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
      const projectId = req.params.id;
  
      const existingProject = await Projects.findById(projectId);
      if (!existingProject) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      uploads.single('file')(req, res, async (err: any) => {
        if (err) {
          console.error('Error uploading file:', err);
          return res.status(500).json({ error: 'Failed to upload the file' });
        }
        
        try {
          const fileResult = req.file ? await uploadImageToCloudinary(req.file) : null;
          
          existingProject.set({
            ...req.body,
            file: fileResult || existingProject.file 
          });
  
          await existingProject.save();

          res.status(200).json({ message: 'Project Updated Successfully!', project: existingProject });
        } catch (error) {
          console.error('Error updating project:', error);
          res.status(500).json({ error: 'Failed to update the Project' });
        }
      });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Failed to update the Project' });
    }
};

export const GetOneProject = async (req: Request, res: Response) => {
    const projectId = req.params.id;
    try {
        const result = await Projects.findById(projectId);
        res.status(200).json({ message: 'Project rectrieved Successfully!',result });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete the project' });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    const projectId = req.params.id;
    try {
        await Projects.findByIdAndDelete(projectId);
        res.status(200).json({ message: 'Project Deleted Successfully!' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete the project' });
    }
};


const ProjectsController = {
    createProject,
    deleteProject,
    updateProject,
    getAllProjects,
    GetOneProject, 
};

export default ProjectsController
