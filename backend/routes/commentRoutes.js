import { Router } from "express";
import {
  createComment,
  fetchAllComment,
} from "../controller/commentController.js";

const commentRouter = Router();

commentRouter.post("/", createComment);
commentRouter.get("/", fetchAllComment);

export default commentRouter;