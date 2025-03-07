import e from "express";
import prisma from "../db/db.config.js";

// create a comment
export const createComment = async (req, resp) => {
  const { user_id, post_id, comment } = req.body;

  await prisma.post.update({
    where:{
      id:Number(post_id)
    },
    data:{
      comment_count:{
        increment:1
      }
    }
  })
  
  const newComment = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment: comment,
    },
  });

  return resp.json({
    status: 200,
    data: newComment,
    message: "comment created Successfully",
  });
};

// // fetch all comments
export const fetchAllComment = async(req, resp)=>{
  const comment = await prisma.post.findMany();
  return resp.json({status:200, data:comment}
  )
}

// show perticular post comment
export const showPostComment = async (req, resp) => {
  const postId = Number(req.params.post_id);

  try {
    const comments = await prisma.comment.findMany({
      where: {
        post_id: postId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return resp.json({ status: 200, data: comments });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Something went wrong", error });
  }
};