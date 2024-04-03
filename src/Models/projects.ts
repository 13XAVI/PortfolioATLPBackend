
import { Schema, model } from "mongoose";

export interface IntProject {
    projectName: string;
    githubLink: string;
    hostedLink:string;
    file:string;
    description:string
    createdAt?: Date; 
    updatedAt?: Date;
}

const ProjectSchema = new Schema<IntProject>({
projectName: {
    type: String,
    required: [true, "Project name should not be empty!"]
  },
  githubLink: {
    type: String,
    required: [true, "githubLink should not be empty!"]
  },
  hostedLink: {
    type: String,
    required: [false, "hostedLink should not be empty!"]
  },
  file: {
    type: String,
    required: [false, "file should not be empty!"]
  },
  description: {
    type: String,
    required: [true, "description should not be empty!"]
  }
}, { timestamps: true});

export const Projects = model<IntProject>('Projects', ProjectSchema);