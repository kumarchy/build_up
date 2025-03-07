import { Router } from "express";
import { createUser, loginUser } from "../controller/userController.js";

const userRouter = Router();

// Signup
userRouter.post("/signup", createUser);

// Login
userRouter.post("/signin", loginUser);

export default userRouter;