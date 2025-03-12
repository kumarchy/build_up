import prisma from "../db/db.config.js";

// Create or update like/dislike
export const createLike = async (req, resp) => {
  try {
    const { post_id, user_id, reaction } = req.body; // Expecting 'LIKE' or 'DISLIKE'

    // Check if the user already reacted to this post
    const existingReaction = await prisma.like.findFirst({
      where: {
        post_id: Number(post_id),
        user_id: Number(user_id),
      },
    });

    let likeChange = 0;
    let dislikeChange = 0;

    if (existingReaction) {
      if (existingReaction.reaction === reaction) {
        // User is removing their reaction
        await prisma.like.delete({
          where: { id: existingReaction.id },
        });

        if (reaction === "LIKE") likeChange = -1;
        else dislikeChange = -1;
      } else {
        // User is changing their reaction
        await prisma.like.update({
          where: { id: existingReaction.id },
          data: { reaction },
        });

        if (reaction === "LIKE") {
          likeChange = 1;
          dislikeChange = -1;
        } else {
          likeChange = -1;
          dislikeChange = 1;
        }
      }
    } else {
      // User is reacting for the first time
      await prisma.like.create({
        data: {
          post_id: Number(post_id),
          user_id: Number(user_id),
          reaction,
        },
      });

      if (reaction === "LIKE") likeChange = 1;
      else dislikeChange = 1;
    }

    // ✅ Ensure count never goes below zero
    const post = await prisma.post.findUnique({
      where: { id: Number(post_id) },
      select: { like_count: true, dislike_count: true },
    });

    await prisma.post.update({
      where: { id: Number(post_id) },
      data: {
        like_count: Math.max(0, post.like_count + likeChange), // Prevent negative values
        dislike_count: Math.max(0, post.dislike_count + dislikeChange),
      },
    });

    resp.json({ status: 200, message: "Reaction updated successfully" });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Something went wrong", error });
  }
};




// Show likes and dislikes for a post
export const showPostLike = async (req, resp) => {
  try {
    const postId = Number(req.params.post_id);

    const likes = await prisma.like.findMany({
      where: { post_id: postId },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    // Count likes and dislikes
    const likeCount = await prisma.like.count({
      where: { post_id: postId, reaction: "LIKE" },
    });

    const dislikeCount = await prisma.like.count({
      where: { post_id: postId, reaction: "DISLIKE" },
    });

    resp.json({
      status: 200,
      data: likes,
      like_count: likeCount,
      dislike_count: dislikeCount,
    });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Something went wrong", error });
  }
};
