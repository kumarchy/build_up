import { Router } from "express";
import userRouter from "./userRoutes.js";
import postRouter from "./postRoutes.js";
import commentRouter from "./commentRoutes.js";
import likeRouter from "./likeRoutes.js";

const router = Router();

router.use("/api/user",userRouter);
router.use("/api/post",postRouter);
router.use("/api/comment",commentRouter);
router.use("/api/like",likeRouter);
export default router;