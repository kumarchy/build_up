import { Router } from "express";
import {
  createComment,
  fetchAllComment,
  showPostComment,
} from "../controller/commentController.js";

const commentRouter = Router();

commentRouter.post("/", createComment);
commentRouter.get("/", fetchAllComment);
commentRouter.get("/:post_id", showPostComment);
export default commentRouter;