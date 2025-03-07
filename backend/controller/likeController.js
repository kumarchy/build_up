import prisma from "../db/db.config.js";
// create like
export const createLike = async(req, resp)=>{
  const {post_id, user_id, like } = req.body;

  await prisma.post.update({
    where:{
      id:Number(post_id)
    },
    data:{
      like_count:{
        increment:like ? 1 :-1
      }
    }
  })

  const newLike = await prisma.like.create({
    data:{
      post_id:Number(post_id),
      user_id:Number(user_id),
      like:like
    }
  })

  resp.json({status:200, data:newLike, message:"likes created successfully"})
}

// show like on perticular post
export const showPostLike = async (req, resp) => {
  const postId = Number(req.params.post_id);

  try {
    const likes = await prisma.like.findMany({
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

    return resp.json({ status: 200, data: likes });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Something went wrong", error });
  }
};