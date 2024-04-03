import { Router } from "express";
import UserController from '../Controllers/UserController';

import CommentController from '../Controllers/CommentController';
import LikeController from '../Controllers/LikesController';
import middleware from "../Authorize/auth";
import { isAdmin,isUser } from "../middleware/Auth/isAuthorized";
import allDocumentations from "../documentationSwag/alldocs";
import QuerryController from "../Controllers/Querries";
import ProjectsController from "../Controllers/ProjectController";
import BlogControllers from "../Controllers/blogController";

const  router = Router()


router.get("/User/All",middleware,isAdmin, UserController.getAllUser);
router.get("/User/find/:id", middleware,isAdmin,UserController.FindOneUser);
router.post("/User/Create", UserController.createUser);
router.post("/User/Login", UserController.LoginUser);
router.delete("/User/Delete/:id", middleware,isAdmin,UserController.deleteUser);
router.put("/User/update/:id",middleware,isAdmin, UserController.updateUser);

router.get("/Blog/All",middleware,isUser||isAdmin, BlogControllers.getAllBlog);
router.get("/Blog/find/:id",middleware,isUser||isAdmin, BlogControllers.FindOneBlog);
router.post("/Blog/create", middleware,isAdmin,BlogControllers.createBlog);
router.delete("/Blog/delete/:id",middleware,isAdmin, BlogControllers.deleteBlog);
router.put("/Blog/update/:id", middleware,isAdmin,BlogControllers.updateBlog);


router.post('/comment/create',middleware,isUser, CommentController.createComment);
router.get('/comment/getOne/:id',middleware,isAdmin, CommentController.getCommentById);
router.put('/comment/update/:id', middleware,isAdmin, CommentController.updateComment);
router.delete('/comment/delete/:id',middleware,isUser, CommentController.deleteComment);
router.get('/comments/All', middleware,isAdmin,CommentController.getAllComments);

router.post('/like/create',middleware,isUser, LikeController.createLike);
router.get('/like/get/:id', middleware,isAdmin,LikeController.getLikeById);
router.delete('/like/delete/:id',middleware,isUser||isAdmin, LikeController.deleteLike);
router.get('/likes/all',middleware,isAdmin, LikeController.getAllLikes);
router.get('/likes/Update/:id',middleware,isAdmin, LikeController.updateLike);


router.get("/Querry/GetAllqueries",middleware,isAdmin, QuerryController.getAllQuerry);
router.get("/Querry/GetOnequery/:id", middleware,isAdmin,QuerryController.FindOneQuerry);
router.post("/Querry/Createquery",middleware,isUser, QuerryController.createQuerry);
router.delete("/Querry/delete/:id", middleware,isAdmin,QuerryController.deleteQuerry);
router.put("/Querry/update/:id",middleware,isAdmin, QuerryController.updateQuerry);


router.get("/Project/GetallProject",middleware,isAdmin||isUser, ProjectsController.getAllProjects);
router.get("/Project/GetOneProject/:id",isAdmin||isUser,ProjectsController.GetOneProject);
router.post("/Project/CreateProject",middleware,isAdmin, ProjectsController.createProject);
router.delete("/Project/deleteProject/:id", middleware,isAdmin,ProjectsController.deleteProject);
router.put("/Project/UpdateProject/:id",middleware,isAdmin, ProjectsController.updateProject);

router.use("/docs",allDocumentations );

export default router