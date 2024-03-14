import { Router } from "express";
import UserController from "../Controllers/UserController"
const  router = Router()

router.get("/All", UserController.getAllUser);
router.get("/find/:id", UserController.FindOneUser);
router.post("/Create", UserController.createUser);
router.post("/Login", UserController.LoginUser);
router.delete("/Delete/:id", UserController.deleteUser);
router.put("/update/:id", UserController.updateUser);

export default router