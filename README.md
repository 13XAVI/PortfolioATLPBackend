# My Brand Readme

## Introduction
Welcome to the documentation for My Brand API. My Brand is a platform that provides various features related to blogging, user management, commenting, liking, querying, and project management.

## API Endpoints
### User Management
- **GET /api/V1/User/All**: Retrieves all users. (Admin access required)
- **GET /api/V1/User/find/:id**: Retrieves a specific user by ID. (Admin access required)
- **POST /api/V1/User/Create**: Creates a new user.
- **POST /api/V1/User/Login**: Logs in a user.
- **DELETE /api/V1/User/Delete/:id**: Deletes a user by ID. (Admin access required)
- **PUT /api/V1/User/update/:id**: Updates a user by ID. (Admin access required)

### Blog Management
- **GET /api/V1/Blog/All**: Retrieves all blogs. (User or Admin access required)
- **GET /api/V1/Blog/find/:id**: Retrieves a specific blog by ID. (User or Admin access required)
- **POST /api/V1/Blog/create**: Creates a new blog. (Admin access required)
- **DELETE /api/V1/Blog/delete/:id**: Deletes a blog by ID. (Admin access required)
- **PUT /api/V1/Blog/update/:id**: Updates a blog by ID. (Admin access required)

### Comment Management
- **POST /api/V1/comment/create**: Creates a new comment. (User access required)
- **GET /api/V1/comment/getOne/:id**: Retrieves a specific comment by ID. (Admin access required)
- **PUT /api/V1/comment/update/:id**: Updates a comment by ID. (Admin access required)
- **DELETE /api/V1/comment/delete/:id**: Deletes a comment by ID. (User access required)
- **GET /api/V1/comments/All**: Retrieves all comments. (Admin access required)

### Like Management
- **POST /api/V1/like/create**: Creates a new like. (User access required)
- **GET /api/V1/like/get/:id**: Retrieves a specific like by ID. (Admin access required)
- **DELETE /api/V1/like/delete/:id**: Deletes a like by ID. (User or Admin access required)
- **GET /api/V1/likes/all**: Retrieves all likes. (Admin access required)
- **GET /api/V1/likes/Update/:id**: Updates a like by ID. (Admin access required)

### Query Management
- **GET /api/V1/Querry/GetAllqueries**: Retrieves all queries. (Admin access required)
- **GET /api/V1/Querry/GetOnequery/:id**: Retrieves a specific query by ID. (Admin access required)
- **POST /api/V1/Querry/Createquery**: Creates a new query. (User access required)
- **DELETE /api/V1/Querry/delete/:id**: Deletes a query by ID. (Admin access required)
- **PUT /api/V1/Querry/update/:id**: Updates a query by ID. (Admin access required)

### Project Management
- **GET /api/V1/Project/GetallProject**: Retrieves all projects. (User or Admin access required)
- **GET /api/V1/Project/GetOneProject/:id**: Retrieves a specific project by ID. (User or Admin access required)
- **POST /api/V1/Project/CreateProject**: Creates a new project. (Admin access required)
- **DELETE /api/V1/Project/deleteProject/:id**: Deletes a project by ID. (Admin access required)
- **PUT /api/V1/Project/UpdateProject/:id**: Updates a project by ID. (Admin access required)

### Documentation
- **GET /api/V1/docs**: Access the API documentation.

## Controllers
- **BlogController**: Manages blog-related operations.
- **UserController**: Manages user-related operations.
- **CommentController**: Manages comment-related operations.
- **LikeController**: Manages like-related operations.
- **QuerryController**: Manages query-related operations.
- **ProjectsController**: Manages project-related operations.

## Middleware
- **middleware**: Authorization middleware.
- **isAdmin**: Middleware to check if user is an admin.
- **isUser**: Middleware to check if user is authenticated.
- **allDocumentations**: Swagger documentation middleware.

## Usage
Must you have Node.js and npm installed. Clone the repository, install dependencies, and run the server.

```bash
git clone https://github.com/13XAVI/PortfolioATLPBackend.git
cd PortfolioATLPBackend
npm install
npm start
```
## Test Run
- **Testing APIs**: Run some basic tests
``` npm test```
- **Test Coverage**: Coverave Test millestone.
``` npm run test:ci```

