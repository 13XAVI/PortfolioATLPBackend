import { Router } from "express";
import BlogController from "../Controllers/BlogController"
const  router = Router()

router.get("/All", BlogController.getAllBlog);
router.get("/find/:id", BlogController.FindOneBlog);
router.post("/create", BlogController.createBlog);
router.delete("/delete/:id", BlogController.deleteBlog);
router.put("/update/:id", BlogController.updateBlog);

export default router