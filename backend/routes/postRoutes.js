import { Router } from "express";
import {
  createPost,
  fetchAllPost,
  deletePost,
  showPost,
  searchPost,
} from "../controller/postController.js";

const postRouter = Router();

postRouter.post("/", createPost);
postRouter.get("/", fetchAllPost);
postRouter.get("/:user_id", showPost);
postRouter.delete("/:id", deletePost);
postRouter.get("/search", searchPost);

export default postRouter;