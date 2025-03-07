import e from "express";
import { Router } from "express";
import { createLike, showPostLike } from "../controller/likeController.js";

const likeRouter = Router();

likeRouter.post("/",createLike);
likeRouter.get("/:post_id",showPostLike);

export default likeRouter;