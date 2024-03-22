import { Router } from "express";
import BlogController from "../Controllers/BlogController"
import UserController from '../Controllers/UserController';
import CommentController from '../Controllers/CommentController';
import LikeController from '../Controllers/LikesController';
const  router = Router()


router.get("/All", UserController.getAllUser);
router.get("/find/:id", UserController.FindOneUser);
router.post("/Create", UserController.createUser);
router.post("/Login", UserController.LoginUser);
router.delete("/Delete/:id", UserController.deleteUser);
router.put("/update/:id", UserController.updateUser);

router.get("/All", BlogController.getAllBlog);
router.get("/find/:id", BlogController.FindOneBlog);
router.post("/create", BlogController.createBlog);
router.delete("/delete/:id", BlogController.deleteBlog);
router.put("/update/:id", BlogController.updateBlog);


router.post('/comment', CommentController.createComment);
router.get('/comment/:id', CommentController.getCommentById);
router.put('/comment/:id', CommentController.updateComment);
router.delete('/comment/:id', CommentController.deleteComment);
router.get('/comments', CommentController.getAllComments);

router.post('/like', LikeController.createLike);
router.get('/like/:id', LikeController.getLikeById);
router.delete('/like/:id', LikeController.deleteLike);
router.get('/likes', LikeController.getAllLikes);


export default router