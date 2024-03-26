import { Router } from "express";
import BlogController from "../Controllers/BlogController"
import UserController from '../Controllers/UserController';
import CommentController from '../Controllers/CommentController';
import LikeController from '../Controllers/LikesController';
import middleware from "../Authorize/auth";
import { isAdmin,isUser } from "../middleware/Auth/isAuthorized";
const  router = Router()


router.get("/User/All",middleware,isAdmin, UserController.getAllUser);
router.get("/User/find/:id", middleware,isAdmin,UserController.FindOneUser);
router.post("/User/Create",middleware,isAdmin, UserController.createUser);
router.post("/User/Login", UserController.LoginUser);
router.delete("/User/Delete/:id", middleware,isAdmin,UserController.deleteUser);
router.put("/User/update/:id",middleware,isAdmin, UserController.updateUser);

router.get("/Blog/All",middleware,isUser||isAdmin, BlogController.getAllBlog);
router.get("/Blog/find/:id",middleware,isUser||isAdmin, BlogController.FindOneBlog);
router.post("/Blog/create", middleware,isAdmin,BlogController.createBlog);
router.delete("/Blog/delete/:id",middleware,isAdmin, BlogController.deleteBlog);
router.put("/Blog/update/:id", middleware,isAdmin,BlogController.updateBlog);


router.post('/comment/create',middleware,isAdmin, CommentController.createComment);
router.get('/comment/getOne/:id',middleware,isAdmin, CommentController.getCommentById);
router.put('/comment/update/:id', middleware,isAdmin, CommentController.updateComment);
router.delete('/comment/delete/:id',middleware,isUser, CommentController.deleteComment);
router.get('/comments/All', middleware,isAdmin,CommentController.getAllComments);

router.post('/like/create',middleware,isUser, LikeController.createLike);
router.get('/like/get/:id', middleware,isAdmin,LikeController.getLikeById);
router.delete('/like/delete/:id',middleware,isUser||isAdmin, LikeController.deleteLike);
router.get('/likes/all',middleware,isAdmin, LikeController.getAllLikes);
router.get('/likes/Update/:id',middleware,isAdmin, LikeController.updateLike);


export default router