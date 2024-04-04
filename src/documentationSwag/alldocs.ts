
import express from "express";
import { format } from "path";
import { serve, setup } from "swagger-ui-express";

const docrouter = express.Router();

const options = {
  openapi: "3.0.1",
  info: {
    title: "Portfolio backend API",
    version: "1.0.0",
    description: "My Personal Portfolio",
  },
  basePath: "https://portfolioatlpbackend.onrender.com/api/V1/docs/",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    {
      name: "user",
      description: "Handle All APIs For Users.",
    },
    {
      name: "blog",
      description: "Handle All APIs For Blog.",
    },
    {
      name: "blogComment",
      description: "Handle All APIs For BlogComment.",
    },
    {
      name: "project",
      description: "Handle All APIs For Project entities",
    },
    {
      name: "queries",
      description: "Handle All APIs For Queries entities",
    },
  ],
  paths: {
    "/api/V1/User/All": {
      get: {
        tags: ["user"],
        summary: "Get All Users",
        description: "Get all users",
        responses: {
          200: {
            description: "Data retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/User/Create": {
      post: {
        tags: ["user"],
        summary: "Create User",
        description: "Create a new user",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                  role: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "User registered successfully",
          },
          400: {
            description: "User already registered",
          },
          500: {
            description: "User data was not valid",
          },
        },
      },
    },
    "/api/V1/User/Login": {
      post: {
        tags: ["user"],
        summary: "User Login",
        description: "User login",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User was logged in successfully",
          },
          401: {
            description: "Email or password is not valid",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/User/find/{id}": {
      get: {
        tags: ["user"],
        summary: "Get User By ID",
        description: "Get a user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User retrieved successfully",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/User/update/{id}": {
      put: {
        tags: ["user"],
        summary: "Update User",
        description: "Update an existing user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/form-data": {
              schema: {
                type: "object",
                properties: {
                  
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/User/delete/{id}": {
      delete: {
        tags: ["user"],
        summary: "Delete User",
        description: "Delete a user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    // Blog side
    "/api/v1/Blog/All": {
      get: {
        tags: ["blog"],
        summary: "Get All blog",
        description: "Get all blog",
        responses: {
          200: {
            description: "All blog are retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/Blog/create": {
      post: {
        tags: ["blog"],
        summary: "Create blog",
        description: "Create a new blog",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
        
                },
                file:{
                    type:"file",

                },
            
                description: {
                    type: "string",

                },
            
                date: {
                    type: "string",

                }
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Blog created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/Blog/find/{id}": {
      get: {
        tags: ["blog"],
        summary: "Read blog By ID",
        description: "Get a blog by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Blog retrieved successfully",
          },
          404: {
            description: "blog not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/Blog/update/{id}": {
      put: {
        tags: ["blog"],
        summary: "Update blog",
        description: "Update an existing blog",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
        
                },
                file:{
                    type:"file",

                },
            
                description: {
                    type: "string",

                },
            
                date: {
                    type: "string",

                }
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Blog updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Blog not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/Blog/delete/{id}": {
      delete: {
        tags: ["blog"],
        summary: "Delete blog",
        description: "Delete a blog by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Blog deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Blog not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/comments/All": {
      get: {
        tags: ["blogComment"],
        summary: "Get All comment",
        description: "Get all commets",
        responses: {
          200: {
            description: "Data retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/comment/create?blogId={blogId}&userId={userId}": {
      post: {
        tags: ["blogComment"],
        summary: "Create blogComment",
        description: "Blog ID to create a new Comment",
        parameters: [
          {
            name: "blogId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            
          },
          {
            name: "userId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  }
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Comment added successfuly",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/comments/delete/{id}": {
      delete: {
        tags: ["blogComment"],
        summary: "Delete comment",
        description: "Delete a comment by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Comment deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Comment not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },


    "/api/V1/Project/GetallProject": {
      get: {
        tags: ["project"],
        summary: "Get All Projects",
        description: "Get all Project",
        responses: {
          200: {
            description: "All Project are retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/Project/CreateProject": {
      post: {
        tags: ["project"],
        summary: "Create Project",
        description: "Create a new Project",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  projectName: {
                    type: "string",
                  },
                  githubLink: {
                    type: "string",
                  },
                  hostedLink: {
                    type: "string",
                  },
                  file: {
                    type: "string",
                    format: "binary",
                  },
                  description: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Project created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/Project/GetOneProject/{id}": {
      get: {
        tags: ["project"],
        summary: "Read Project By ID",
        description: "Get a Project by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Project retrieved successfully",
          },
          404: {
            description: "Project not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },},
      "/api/V1/Project/UpdateProject/{id}": {
      put: {
        tags: ["project"],
        summary: "Update Project",
        description: "Update an existing Project",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  projectName: {
                    type: "string",
                  },
                  githubLink: {
                    type: "string",
                  },
                  hostedLink: {
                    type: "string",
                  },
                  file: {
                    type: "string",
                    format: "binary",
                  },
                  description: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Project updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Project not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },},
      "/api/V1/Project/deleteProject/{id}": {
      delete: {
        tags: ["project"],
        summary: "Delete Project",
        description: "Delete a Project by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Project deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Project not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/Querry/GetAllqueries": {
      get: {
        tags: ["queries"],
        summary: "Get All queriess",
        description: "Get all queries",
        responses: {
          200: {
            description: "All queries are retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },},
      "/api/V1/Querry/Createquery":{
      post: {
        tags: ["queries"],
        summary: "Create Skill",
        description: "Create a new queries",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  
                  email: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Message sent successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/Querry/GetOnequery/{id}": {
      get: {
        tags: ["queries"],
        summary: "Read Query By ID",
        description: "Get a Query by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Query retrieved successfully",
          },
          404: {
            description: "queries not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },},
      "/api/V1/Querry/update/{id}": {
      put: {
        tags: ["queries"],
        summary: "Update Query",
        description: "Update an existing Query",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  names: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  subject: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Query updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "query not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/Querry/delete/{id}": {
      delete: {
        tags: ["queries"],
        summary: "Delete query",
        description: "Delete a query by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "query deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Query not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
        name: "Authorization",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
