import prisma from "../db/db.config.js";

export const createLike = async (req, res) => {
  const { post_id, userId, reaction } = req.body;

  if (!["LIKE", "DISLIKE"].includes(reaction)) {
    return res.status(400).json({ error: "Invalid reaction type" });
  }

  try {
    // Check if user already reacted to this post
    const existingReaction = await prisma.like.findFirst({
      where: {
        user_id: parseInt(userId),
        post_id: parseInt(post_id),
      },
    });

    if (existingReaction) {
      // If clicking the same reaction again, remove it (toggle)
      if (existingReaction.reaction === reaction) {
        await prisma.like.delete({
          where: {
            id: existingReaction.id,
          },
        });
      } 
      // If clicking different reaction, update it
      else {
        await prisma.like.update({
          where: {
            id: existingReaction.id,
          },
          data: {
            reaction: reaction,
          },
        });
      }
    } else {
      // If no existing reaction, create new one
      await prisma.like.create({
        data: {
          reaction: reaction,
          user_id: parseInt(userId),
          post_id: parseInt(post_id),
        },
      });
    }

    // Get updated counts after the operation
    const likeCount = await prisma.like.count({
      where: {
        post_id: parseInt(post_id),
        reaction: "LIKE",
      },
    });

    const dislikeCount = await prisma.like.count({
      where: {
        post_id: parseInt(post_id),
        reaction: "DISLIKE",
      },
    });

    return res.json({
      success: true,
      data: {
        counts: {
          likes: likeCount,
          dislikes: dislikeCount,
        },
      },
    });

  } catch (error) {
    console.error("Error in createLike:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

export const showPostLike = async (req, res) => {
  try {
    const postId = parseInt(req.params.post_id);

    // Verify post exists
    const postExists = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!postExists) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Get all reactions for this post with user details
    const reactions = await prisma.like.findMany({
      where: { post_id: postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Count likes and dislikes
    const likeCount = await prisma.like.count({
      where: {
        post_id: postId,
        reaction: "LIKE",
      },
    });

    const dislikeCount = await prisma.like.count({
      where: {
        post_id: postId,
        reaction: "DISLIKE",
      },
    });

    return res.json({
      success: true,
      data: {
        reactions,
        counts: {
          likes: likeCount,
          dislikes: dislikeCount,
        },
      },
    });

  } catch (error) {
    console.error("Error in showPostLike:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};